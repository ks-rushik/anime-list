import React, { FC, useEffect, useState } from "react";
import { Badge } from "@mantine/core";

import { apiData } from "@/app/anime/page";
import { IData } from "@/app/component/AnimeList";
import { IFilter } from "@/app/component/FilterFields";
import BaseTable, { ISort } from "@/app/component/ui/BaseTable";

export type ITableProps = {
  allData: IData;
  type: string | null;
  title: string | undefined;
  loading: boolean;
  OnRow: (row: string | null, currentPage: number) => void;
  filterValues: IFilter;
};

const TableData: FC<ITableProps> = (props) => {
  const { type, title, loading, allData, OnRow, filterValues } = props;
  console.log(allData, "this is allData");

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
  const fetchWithOrder = async (
    orderBy: string | null,
    sort: string | null
  ) => {
    const res = await apiData(
      Number(row) | 5,
      type,
      title,
      null,
      orderBy,
      sort
    );
    // setAllData(res);
  };

  useEffect(() => {
    OnRow(row, currentPage);
  }, [row]);

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
                fetchWithOrder("title", "asc");
                setSortingOrder({ column: "Title", sort: "asc" });
              },
              downFunc: () => {
                fetchWithOrder("title", "desc");
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
                fetchWithOrder("rank", "asc");
                setSortingOrder({ column: "Rank", sort: "asc" });
              },
              downFunc: () => {
                fetchWithOrder("rank", "desc");
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
