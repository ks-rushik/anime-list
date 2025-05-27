"use client";
import React, { FC, useState } from "react";

import TableData from "@/app/component/TableData";
import FilterFields, { IFilter } from "@/app/component/FilterFields";

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

export type IAnimeListProps = {
  alldata: IData;
};

const AnimeList: FC<IAnimeListProps> = (props) => {
  const { alldata } = props;
  const [allData, setAllData] = useState(alldata);
  const [filterValues, setFilterValues] = useState<IFilter>({
    type: "",
    title: "",
  });
  const [rowValue, setRowValue] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const handleFilterValues = (values: IFilter) => {
    setFilterValues(values);
  };

  const handleRow = (row: string | null) => {
    setRowValue(row);
  };

  return (
    <div className="mx-10">
      <FilterFields
        alldata={alldata}
        setAllData={setAllData}
        setLoading={setLoading}
        row={rowValue}
        OnFilter={handleFilterValues}
      />
      <TableData
        allData={allData}
        loading={loading}
        setAllData={setAllData}
        type={filterValues.type}
        title={filterValues.title}
        OnRow={handleRow}
        filterValues={filterValues}
      />
    </div>
  );
};

export default AnimeList;
