"use client";
import React, { FC, useEffect, useState } from "react";
import { apiData } from "@/app/anime/page";

import TableData from "@/app/component/TableData";
import PaginationData from "@/app/component/Pagination";
import HeaderPage from "@/app/component/HeaderPage";
import { useDebouncedValue } from "@mantine/hooks";

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
  const [type, setType] = useState<string | null>(""); // this is type of like tv and other ...
  const [row, setRow] = useState<string | null>(""); // this is rows like 5 ,10 , 15 ,...
  const [title, setTitle] = useState(""); // this is search field (input field)...
  const [status, setStatus] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [debounced] = useDebouncedValue(title, 1000);

  const [currentPage, setCurrentPage] = useState(
    alldata.pagination.current_page
  ); // this is used for set current page...

  useEffect(() => {
    const debouncefunc = async () => {
      const res = await apiData(Number(row) | 5, type, title);
      setAllData(res);
    };
    debouncefunc();
  }, [debounced]);

  const handlePageChange = async (newPage: number) => {
    const res = await apiData(Number(row) || 5, type, title, newPage);
    setAllData(res);
    setCurrentPage(newPage);
  };

  const handleDeleteType = () => {
    setType("");
    setAllData(alldata);
  };

  const handleDeleteTitle = () => {
    setTitle("");
    setAllData(alldata);
  };

  const handleDeleteStatus = () => {
    setStatus("");
    setAllData(alldata);
  };

  const handleRow = async (value: string | null) => {
    setRow(value);
    const res = await apiData(Number(value), type);
    setAllData(res);
  };

  const handleAllDelete = () => {
    setType("");
    setTitle("");
    setStatus("");
    setAllData(alldata);
  };

  const handleType = async (value: string | null) => {
    setType(value);
    setLoading(true);
    const res = await apiData(Number(row) | 5, value);
    setLoading(false);
    setAllData(res);
  };

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setLoading(true);
    setLoading(false);
  };

  const handleStatus = async (value: string | null) => {
    setStatus(value);
    setLoading(true);
    const res = await apiData(
      Number(row) | 5,
      type,
      title,
      null,
      "",
      "",
      value
    );
    setLoading(false);
    setAllData(res);
  };

  return (
    <div className="mx-10">
      <HeaderPage
        handleType={handleType}
        handleStatus={handleStatus}
        type={type}
        title={title}
        allData={allData}
        handleSearchInput={handleSearchInput}
        status={status}
        handleDeleteTitle={handleDeleteTitle}
        handleDeleteType={handleDeleteType}
        handleDeleteStatus={handleDeleteStatus}
        handleAllDelete={handleAllDelete}
      />
      <TableData
        allData={allData}
        loading={loading}
        setAllData={setAllData}
        row={row}
        type={type}
        title={title}
      />

      <PaginationData
        handleRow={handleRow}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        allData={allData}
      />
    </div>
  );
};

export default AnimeList;
