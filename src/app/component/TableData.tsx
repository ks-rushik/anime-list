import React, { FC, useEffect, useState } from "react";
import { Badge } from "@mantine/core";

import { IData } from "@/app/component/AnimeList";
import BaseTable, { ISort } from "@/app/component/ui/BaseTable";

export type ITableProps = {
  allData: IData;

  loading: boolean;
  OnTable: (
    row: string | null,
    currentPage: number,
    sortingOrder: ISort
  ) => void;
};

const TableData: FC<ITableProps> = (props) => {
  const { loading, allData, OnTable } = props;

  const [row, setRow] = useState<string | null>(""); // this is rows like 5 ,10 , 15 ,...
  const [currentPage, setCurrentPage] = useState(
    allData.pagination.current_page
  ); // this is used for set current page...
  const [sortingOrder, setSortingOrder] = useState<ISort>({
    column: "",
    sort: "",
  });

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRow = async (value: string | null) => {
    setRow(value);
  };

  useEffect(() => {
    OnTable(row, currentPage, sortingOrder);
  }, [row, currentPage, sortingOrder]);

  return (
    <>
      <BaseTable
        loading={loading}
        data={allData}
        pagination={{
          handleRow,
          handlePageChange,
          currentPage,
        }}
        columns={[
          {
            label: "Title",
            render: (item) => item.title,
            sortable: {
              upFunc: () => {
                setSortingOrder({ column: "Title", sort: "asc" });
              },
              downFunc: () => {
                setSortingOrder({ column: "Title", sort: "desc" });
              },
              sortingOrder: sortingOrder,
            },
          },
          {
            label: "Rank",
            render: (item) => item.rank,
            sortable: {
              upFunc: () => {
                setSortingOrder({ column: "Rank", sort: "asc" });
              },
              downFunc: () => {
                setSortingOrder({ column: "Rank", sort: "desc" });
              },
              sortingOrder: sortingOrder,
            },
          },
          {
            label: "Type",
            render: (item) => item.type,
          },
          {
            label: "Status",
            render: (item) => <Badge>{item.status}</Badge>,
          },
        ]}
      />
    </>
  );
};

export default TableData;
