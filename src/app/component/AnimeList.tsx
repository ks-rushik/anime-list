"use client";
import React, { useEffect, useState } from "react";

import TableData from "@/app/component/TableData";
import { IFilter } from "@/app/component/FilterFields";
import FilterFields from "@/app/component/FilterFields";
import { useQuery } from "@tanstack/react-query";
import { apiData } from "@/app/anime/page";
import { ISort } from "@/app/component/ui/BaseTable";

export type IData = {
  data: {
    mal_id: string;
    title: string;
    rank: string;
    type: string;
    status: string;
  }[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
    last_visible_page: number;
  };
};

const AnimeList = () => {
  const [filterValues, setFilterValues] = useState<IFilter>({
    type: "",
    title: "",
    status: "",
  });
  const [rowValue, setRowValue] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState<number | undefined>();
  const [sortOrder, setSortOrder] = useState<ISort>({ column: "", sort: "" });
  const [allData, setAllData] = useState<IData | null>(null);

  const { data, isLoading } = useQuery<IData>({
    queryKey: ["anime", rowValue, filterValues, currentPage, sortOrder],
    queryFn: async () =>
      await apiData(
        Number(rowValue) | 5,
        filterValues.type,
        filterValues.title,
        currentPage,
        sortOrder.column,
        sortOrder.sort,
        filterValues.status
      ),
  });

  useEffect(() => {
    if (data) {
      setAllData(data);
    }
  }, [data]);

  const handleFilterValues = (values: IFilter) => {
    setFilterValues(values);
  };

  const handleTableData = (
    row: string | null,
    currentPage: number,
    sortingOrder: ISort
  ) => {
    setRowValue(row);
    setCurrentPage(currentPage);
    setSortOrder(sortingOrder);
  };

  if (!allData) {
    return <div className="text-center mt-20">Loading anime list...</div>;
  }

  const totalItem = allData.pagination.items.total;

  return (
    <div className="mx-10">
      <FilterFields totalItem={totalItem} OnFilter={handleFilterValues} />
      <TableData
        allData={allData}
        loading={isLoading}
        OnTable={handleTableData}
      />
    </div>
  );
};

export default AnimeList;
