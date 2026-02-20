"use client";

import React, { useState } from "react";
import {
  useGetDirectorList,
} from "@/modules/users/application/use-cases";
import { useSearchQuery, useUrlFilter } from "@/shared/hooks";
import { CustomPagination } from "@/widgets";
import { CreateDirectorModal } from "./CreateDirectorModal";
import { DirectorDetail } from "./DirectorDetail";
import { DirectorFilters } from "./DirectorFilters";
import { DirectorQuery } from "./DirectorQuery";
import { DirectorCards } from "../components/DirectorCards";
import { DirectorHeaderTitle } from "../components/DirectorHeaderTitle";

interface DirectorListProps {
  centerId: string;
  hideHeader?: boolean;
}

export const DirectorList = ({ centerId, hideHeader }: DirectorListProps) => {
  const { selectedStatus, selectedPage, setPathParams } = useUrlFilter([
    "status",
    "page",
  ]);
  const { inputValue, setInputValue, debouncedQuery } = useSearchQuery({
    searchKey: "query",
    deleteKeys: ["page"],
  });

  const {
    data: directorData,
    isLoading,
    isError,
  } = useGetDirectorList({
    centerId,
    page: Number(selectedPage) || 1,
    limit: 9,
    search: debouncedQuery || undefined,
    status:
      selectedStatus && selectedStatus !== "all" ? selectedStatus : undefined,
  });

  const currentPage = Number(selectedPage) || 1;
  const totalPages = directorData?.totalPages ?? 1;
  const goToPage = (page: string) => setPathParams("page", page);

  const [selectedDirectorId, setSelectedDirectorId] = useState<string | null>(
    null
  );
  const [openDetail, setOpenDetail] = useState(false);

  return (
    <div className="space-y-6 mt-6">
      {!hideHeader && (
        <DirectorHeaderTitle total={directorData?.total} />
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <DirectorQuery
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <DirectorFilters
              selectedStatus={selectedStatus}
              setPathParams={setPathParams}
            />
            <CreateDirectorModal centerId={centerId} />
          </div>
        </div>
      </div>

      <DirectorCards
        directors={directorData?.directors ?? []}
        isLoading={isLoading}
        isError={isError}
        onOpen={setOpenDetail}
        selectedDirector={setSelectedDirectorId}
      />
      <CustomPagination
        page={currentPage}
        totalPages={totalPages}
        handlePageChange={goToPage}
      />
      <DirectorDetail
        open={openDetail}
        selectedDirectorId={selectedDirectorId}
        onOpenChange={setOpenDetail}
      />
    </div>
  );
};
