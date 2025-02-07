import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import Button from "../Button";
import usePagination from "./hooks/usePagination";

type PaginationProps<T> = ComponentProps<"nav"> & {
  allItems: T[];
  currentPageItemsHandler: (productsOnPage: T[]) => void;
  pageSize?: number;
  initialPage?: number;
  siblingCount?: number;
};

const DEFAULT_PAGE_SIZE = 9;
const DEFAULT_PAGE = 1;
const DEFAULT_SIBLING_COUNT = 1;

const Pagination = <T,>({
  className,
  allItems,
  pageSize,
  initialPage,
  currentPageItemsHandler,
  siblingCount = DEFAULT_SIBLING_COUNT,
  ...restProps
}: PaginationProps<T>) => {
  const { currentPage, totalPages, nextPage, prevPage, jumpToPage } =
    usePagination(
      allItems,
      pageSize ? pageSize : DEFAULT_PAGE_SIZE,
      currentPageItemsHandler,
      initialPage ? initialPage : DEFAULT_PAGE
    );

  const paginationRange = getPaginationRange(
    currentPage,
    totalPages,
    siblingCount
  );

  if (totalPages === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center justify-center", className)}
      {...restProps}
    >
      <ul className="flex items-center gap-1 h-10 text-base">
        <li>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 rounded-lg"
            onClick={prevPage}
            disabled={currentPage <= 1}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="size-4" />
          </Button>
        </li>

        {paginationRange.map((page, index) => {
          if (page === "...") {
            return (
              <li
                key={`ellipsis-${index}`}
                className="h-10 w-10 flex items-center justify-center"
              >
                <span className="text-foreground/50">...</span>
              </li>
            );
          }

          return (
            <li key={page}>
              <Button
                variant="outline"
                className={cn(
                  "h-10 w-10 p-0 rounded-lg",
                  currentPage === page && "bg-accent border-accent"
                )}
                onClick={() => jumpToPage(page as number)}
              >
                {page}
              </Button>
            </li>
          );
        })}

        <li>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 rounded-lg"
            onClick={nextPage}
            disabled={currentPage >= totalPages}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="size-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = DEFAULT_SIBLING_COUNT
): Array<number | "..."> {
  const range: Array<number | "..."> = [];
  const totalNumbers = siblingCount * 2 + 5; // first + last + current + 2*siblings + 2*ellipsis

  if (totalPages <= totalNumbers) {
    return rangeGenerator(1, totalPages);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  // First page
  range.push(1);

  // Left ellipsis or pages
  if (showLeftEllipsis) {
    range.push("...");
  } else {
    range.push(...rangeGenerator(2, leftSibling));
  }

  // Middle section
  range.push(...rangeGenerator(leftSibling, rightSibling));

  // Right ellipsis or pages
  if (showRightEllipsis) {
    range.push("...");
  } else {
    range.push(...rangeGenerator(rightSibling + 1, totalPages - 1));
  }

  // Last page
  range.push(totalPages);

  return range.filter((item, index, self) => self.indexOf(item) === index);
}

function rangeGenerator(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}
