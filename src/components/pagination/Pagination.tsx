import { ChevronLeft, ChevronRight } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "../../utils/cn";
import Button, { ButtonProps } from "../Button";
import usePagination from "./hooks/usePagination";

type PaginationProps<T> = ComponentProps<"nav"> & {
  allItems: T[];
  currentPageItemsHandler: (productsOnPage: T[]) => void;
  pageSize?: number;
  initialPage?: number;
};

const DEFAULT_PAGE_SIZE = 9;
const DEFAULT_PAGE = 1;

const Pagination = <T,>({
  className,
  allItems,
  pageSize,
  initialPage,
  currentPageItemsHandler,
  ...restProps
}: PaginationProps<T>) => {
  const { currentPage, totalPages, nextPage, prevPage, jumpToPage } =
    usePagination(
      allItems,
      pageSize ? pageSize : DEFAULT_PAGE_SIZE,
      currentPageItemsHandler,
      initialPage ? initialPage : DEFAULT_PAGE
    );

  return (
    <nav
      aria-label="Page navigation example"
      className={cn("", className)}
      {...restProps}
    >
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <Button
            variant={"outline"}
            className="h-10 rounded-r-none rounded-e-lg"
            onClick={prevPage}
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="size-6" />
          </Button>
        </li>

        {Array.from({ length: totalPages }).map((_page, i) => (
          <PaginationButton
            pageNumber={i + 1}
            onClick={() => jumpToPage(i + 1)}
            className={currentPage === i + 1 ? "bg-secondary" : ""}
          />
        ))}

        <li>
          <Button
            variant={"outline"}
            className="h-10 rounded-l-none rounded-e-lg"
            onClick={nextPage}
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="size-6" />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

type PaginationButtonProps = ButtonProps & {
  pageNumber: number;
};

const PaginationButton = ({
  pageNumber,
  className,
  ...restProps
}: PaginationButtonProps) => {
  return (
    <li>
      <Button
        variant={"outline"}
        className={cn("h-10 rounded-none", className)}
        {...restProps}
      >
        {pageNumber}
      </Button>
    </li>
  );
};
