import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";

type CustomPaginationProps = {
  page: number;
  totalPages: number;
  handlePageChange: (page: string) => void;
};

export const CustomPagination = ({
  page,
  totalPages,
  handlePageChange,
}: CustomPaginationProps) => {
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) {
      return [1, 2, 3, "ellipsis", totalPages] as const;
    }
    if (page >= totalPages - 2) {
      return [
        1,
        "ellipsis",
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ] as const;
    }
    return [
      1,
      "ellipsis",
      page - 1,
      page,
      page + 1,
      "ellipsis",
      totalPages,
    ] as const;
  };

  const pages = getPages();

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem key="prev">
          <PaginationPrevious
            aria-disabled={page === 1}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) handlePageChange(String(page - 1));
            }}
          />
        </PaginationItem>

        {pages.map((p, idx) => {
          if (p === "ellipsis") {
            const isLeft = idx === 1;
            const isRight = idx === pages.length - 2;
            const ellipsisKey = `ellipsis-${
              isLeft ? "left" : isRight ? "right" : idx
            }`;
            return (
              <PaginationItem key={ellipsisKey}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const num = p as number;
          return (
            <PaginationItem key={`page-${num}`}>
              <PaginationLink
                isActive={page === num}
                onClick={(e) => {
                  e.preventDefault();
                  if (num !== page) handlePageChange(String(num));
                }}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem key="next">
          <PaginationNext
            aria-disabled={page === totalPages}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) handlePageChange(String(page + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
