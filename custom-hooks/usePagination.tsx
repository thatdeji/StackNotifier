import { PAGINATION_LIMIT } from "@/utils/constants";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const usePagination = (
  count: number,
  handlePageChange: (page: number) => void,
  page: number
) => {
  const totalPages = Math.ceil(count / PAGINATION_LIMIT);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(Math.max(page - 1, 1))}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                isActive={pageNum === page}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default usePagination;
