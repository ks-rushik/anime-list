"use client";
import { Badge, Input, Select, Table, TableTd, TableTr } from "@mantine/core";
import { MdDeleteOutline } from "react-icons/md";
import React, { FC, useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { apiData } from "@/app/anime/page";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

export type IData = {
  data: any[];
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
  const [currentPage, setCurrentPage] = useState(
    alldata.pagination.current_page
  ); // this is used for set current page...

  const nextpage = alldata.pagination.has_next_page;

  const handlePageChange = async (newPage: number) => {
    const res = await apiData(Number(row) || 5, type, title, newPage);
    setAllData(res);
    setCurrentPage(newPage);
  };

  const startItem =
    (currentPage - 1) * (allData.pagination.items.per_page || 5) + 1;
  const endItem = startItem + (allData.pagination.items.count || 0) - 1;
  const totalPages = allData.pagination.last_visible_page;

  const handleDeleteType = () => {
    setType("");
    setAllData(alldata);
  };

  const handleDeleteTitle = () => {
    setTitle("");
    setAllData(alldata);
  };

  const rows = allData.data?.map((item) => (
    <TableTr key={item.mal_id}>
      <TableTd>{item.title}</TableTd>
      <TableTd>{item.rank}</TableTd>
      <TableTd>{item.type}</TableTd>
      <TableTd>
        {item.status === "Finished Airing" ? (
          <Badge color="green">Complete</Badge>
        ) : (
          <Badge color="blue">{item.status}</Badge>
        )}
      </TableTd>
    </TableTr>
  ));

  const handleRow = async (value: string | null) => {
    setRow(value);
    const res = await apiData(Number(value), type);
    setAllData(res);
  };

  const handleAllDelete = () => {
    setType("");
    setTitle("");
    setAllData(alldata);
  };

  const handleType = async (value: string | null) => {
    setType(value);
    const res = await apiData(Number(row) | 5, value);
    setAllData(res);
  };

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const res = await apiData(Number(row) | 5, type, title);
    setAllData(res);
  };

  return (
    <div className="mx-10">
      <div className="flex items-center">
        <Select
          classNames={{ root: "w-1/4 p-10" }}
          onChange={(value) => handleType(value)}
          value={type}
          data={[
            { label: "All", value: "" },
            { label: "Tv", value: "tv" },
            { label: "Movie", value: "movie" },
            { label: "Ova", value: "ova" },
            { label: "Special", value: "special" },
            { label: "Ona", value: "ona" },
            { label: "Music", value: "music" },
            { label: "Cm", value: "cm" },
            { label: "Pv", value: "pv" },
            { label: "Tv special", value: "tv_special" },
          ]}
        />
        <Input
          classNames={{ wrapper: "w-1/2 p-4" }}
          value={title}
          onChange={(e) => handleSearchInput(e)}
        />
      </div>

      <div className="m-6 flex flex-row text-center items-center gap-4">
        <div className="flex flex-row items-center">
          <p className="bold text-sm pr-2">Type :</p>
          <span>{type}</span>
          {type && (
            <MdClear
              className="bg-gray-400 rounded-full ml-2"
              onClick={handleDeleteType}
            />
          )}
        </div>
        <div className="">
          <div className="flex flex-row items-center">
            <p>Title :</p>
            <span>{title}</span>
            {title && (
              <MdClear
                className="bg-gray-400 rounded-full ml-2"
                onClick={handleDeleteTitle}
              />
            )}
          </div>
        </div>

        <div>
          <MdDeleteOutline size={22} onClick={handleAllDelete} />
        </div>
      </div>

      <div>
        <Table classNames={{ thead: "text-gray-600 text-base bg-gray-200" }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Rank</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        <div className="p-6 flex flex-row justify-end gap-6 items-center">
          <Select
            data={["5", "10", "15", "20"]}
            onChange={(value) => handleRow(value)}
            defaultValue={"5"}
          />
          <div>
            {startItem} - {endItem} of {totalPages}
          </div>
          <div className="flex flex-row">
            <button
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <FaChevronLeft
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </button>
            <button disabled={!nextpage}>
              <FaChevronRight
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeList;
