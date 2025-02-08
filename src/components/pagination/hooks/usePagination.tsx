import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type PaginationResult = {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  jumpToPage: (page: number) => void;
};

function usePagination<T>(
  items: T[],
  pageSize: number,
  currentPageItemsHandler: (productsOnPage: T[]) => void,
  initialPage: number = 1
): PaginationResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParms = searchParams.get("page");
  const initialPageFromURL = pageParms ? parseInt(pageParms, 10) : initialPage;

  const [currentPage, setCurrentPage] = useState(() => {
    const sanitizedPageSize = Math.max(1, pageSize);
    const totalPages = Math.ceil(items.length / sanitizedPageSize);

    if (totalPages === 0) return 0;
    return Math.min(Math.max(1, initialPageFromURL), totalPages);
  });

  // Calculate derived values
  const sanitizedPageSize = Math.max(1, pageSize);
  const totalPages = useMemo(
    () => Math.ceil(items.length / sanitizedPageSize),
    [items.length, sanitizedPageSize]
  );

  // Adjust current page when items or page size changes
  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0);
      return;
    }

    setCurrentPage((current) => {
      if (current === 0) return 1; // Handle case when items change from empty to non-empty
      return Math.min(current, totalPages);
    });
  }, [totalPages, items, sanitizedPageSize]);

  // update url page param
  const updateURLPageParam = useCallback(
    (page: number) => {
      const newpageParams = new URLSearchParams(searchParams);
      newpageParams.set("page", page.toString());
      setSearchParams(newpageParams);
    },
    [searchParams, setSearchParams]
  );

  // Navigation handlers
  const nextPage = useCallback(() => {
    setCurrentPage((current) => {
      const newPage = current >= totalPages ? current : current + 1;
      updateURLPageParam(newPage);
      return newPage;
    });
  }, [totalPages, updateURLPageParam]);

  const prevPage = useCallback(() => {
    setCurrentPage((current) => {
      const newPage = current <= 1 ? current : current - 1;
      updateURLPageParam(newPage);
      return newPage;
    });
  }, [updateURLPageParam]);

  const jumpToPage = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, totalPages));
      updateURLPageParam(newPage);
      setCurrentPage(totalPages === 0 ? 0 : newPage);
    },
    [updateURLPageParam, totalPages]
  );

  useEffect(() => {
    if (totalPages === 0) currentPageItemsHandler([]);
    const start = (currentPage - 1) * sanitizedPageSize;
    currentPageItemsHandler(items.slice(start, start + sanitizedPageSize));
  }, [
    currentPageItemsHandler,
    currentPage,
    items,
    sanitizedPageSize,
    totalPages,
  ]);

  return {
    currentPage: totalPages === 0 ? 0 : currentPage,
    totalPages,
    nextPage,
    prevPage,
    jumpToPage,
  };
}

export default usePagination;
