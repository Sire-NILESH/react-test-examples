import { useCallback, useEffect, useMemo, useState } from "react";

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
  // Sanitize input parameters and initialize state
  const [currentPage, setCurrentPage] = useState(() => {
    const sanitizedPageSize = Math.max(1, pageSize);
    const totalPages = Math.ceil(items.length / sanitizedPageSize);

    if (totalPages === 0) return 0;
    return Math.min(Math.max(1, initialPage), totalPages);
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

  // Navigation handlers
  const nextPage = useCallback(() => {
    setCurrentPage((current) =>
      current >= totalPages ? current : current + 1
    );
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((current) => (current <= 1 ? current : current - 1));
  }, []);

  const jumpToPage = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(totalPages === 0 ? 0 : newPage);
    },
    [totalPages]
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
