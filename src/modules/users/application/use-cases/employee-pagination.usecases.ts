import { useState } from "react";

export const useEmployeePagination = (
  page: number,
  setPage: (page: string) => void,
  totalPages: number | undefined
) => {
  const [currentPage, setCurrentPage] = useState(page);

  const goToPage = (newPage: string) => {
    setCurrentPage(Number(newPage));
    setPage(newPage);
  };

  return {
    currentPage,
    totalPages: totalPages!,
    goToPage,
  };
};
