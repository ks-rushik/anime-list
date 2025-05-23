import React, { FC } from "react";
import BaseSelect from "@/app/component/ui/BaseSelect";
import { Pagination } from "@mantine/core";
import { IData } from "@/app/component/AnimeList";

export type IPaginationProps = {
  handleRow: (value: string | null) => Promise<void>;
  handlePageChange: (newPage: number) => Promise<void>;
  currentPage: number;
  allData: IData;
};

const PaginationData: FC<IPaginationProps> = (props) => {
  const { handleRow, currentPage, allData, handlePageChange } = props;
  const startItem = (currentPage - 1) * allData.pagination.items.count;

  const endItem = startItem + (allData.pagination.items.per_page || 0) - 1;

  const totalPages = allData.pagination.last_visible_page;
  return (
    <div className="py-12 flex flex-row justify-end gap-6 items-center-safe">
      <BaseSelect
        data={["5", "10", "15", "20"]}
        onChange={(value) => handleRow(value)}
        defaultValue={"5"}
      />
      <div>
        {startItem} - {endItem} of {totalPages}
      </div>
      <Pagination
        total={totalPages}
        value={currentPage}
        onChange={handlePageChange}
        radius={"xl"}
      />
    </div>
  );
};

export default PaginationData;
