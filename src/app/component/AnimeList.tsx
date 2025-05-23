"use client";
import {
  Badge,
  Input,
  Pagination,
  Select,
  Table,
  TableTd,
  TableTr,
} from "@mantine/core";
import { MdDeleteOutline } from "react-icons/md";
import React, { FC, useState } from "react";
import { MdClear } from "react-icons/md";
import { apiData } from "@/app/anime/page";

import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import OrderingWrapper from "@/app/component/OrderingWrapper";

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
  const [status, setStatus] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState(
    alldata.pagination.current_page
  ); // this is used for set current page...
  const [titleOrder, setTitleOrder] = useState<{
    sort: string | null;
    orderBy: string | null;
  }>({ sort: "", orderBy: "" }); //this is title order state for disabled up and down button
  const [rankOrder, setRankOrder] = useState<{
    sort: string | null;
    orderBy: string | null;
  }>({ sort: "", orderBy: "" }); // this is rank order state for disabled up and down button

  const handlePageChange = async (newPage: number) => {
    const res = await apiData(Number(row) || 5, type, title, newPage);
    setAllData(res);
    setCurrentPage(newPage);
  };

  const startItem = (currentPage - 1) * allData.pagination.items.count;

  const endItem = startItem + (allData.pagination.items.per_page || 0) - 1;

  const totalItem = allData.pagination.items.total;
  const totalPages = allData.pagination.last_visible_page;

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

  console.log(allData.data, "this is data");
  const nodata = allData.data.length === 0;
  console.log(nodata);

  const rows = nodata ? (
    <TableTr>
      <TableTd colSpan={4}>
        <div className="text-base text-gray-700 flex items-center justify-center w-full py-10">
          No data found
        </div>
      </TableTd>
    </TableTr>
  ) : (
    allData.data?.map((item) => (
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
    ))
  );

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
    const res = await apiData(Number(row) | 5, value);
    setAllData(res);
  };

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const res = await apiData(Number(row) | 5, type, title);
    setAllData(res);
  };

  const fetchWithOrder = async (
    orderBy: string | null,
    sort: string | null
  ) => {
    setRankOrder({ sort, orderBy });

    setTitleOrder({ sort, orderBy });
    const res = await apiData(
      Number(row) | 5,
      type,
      title,
      null,
      orderBy,
      sort
    );
    setAllData(res);
  };

  const handleStatus = async (value: string | null) => {
    setStatus(value);
    const res = await apiData(
      Number(row) | 5,
      type,
      title,
      null,
      "",
      "",
      value
    );
    setAllData(res);
  };

  return (
    <div className="mx-10">
      <div className="flex items-center py-10 gap-4">
        <Select
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
        <Input value={title} onChange={(e) => handleSearchInput(e)} />
        <Select
          value={status}
          onChange={(value) => handleStatus(value)}
          data={[
            { label: "All", value: "" },
            { label: "Airing", value: "airing" },
            { label: "Completed", value: "complete" },
            { label: "Upcoming", value: "upcoming" },
          ]}
        />
      </div>

      <div>
        <span className="text-black font-bold">{totalItem}</span>
        <span className="text-gray-700 text-base pl-2">results found</span>
      </div>

      <div className="my-6 flex flex-row text-center items-center gap-12">
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

        <div className="flex flex-row items-center">
          <p className="bold text-sm pr-2">Status :</p>
          <span>{status}</span>
          {status && (
            <MdClear
              className="bg-gray-400 rounded-full ml-2"
              onClick={handleDeleteStatus}
            />
          )}
        </div>
        {type && status && title && (
          <div>
            <MdDeleteOutline size={22} onClick={handleAllDelete} />
          </div>
        )}
      </div>

      <div>
        <Table classNames={{ thead: "text-gray-600 text-base bg-gray-200" }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <OrderingWrapper title="Title">
                  <button
                    className="disabled:opacity-30"
                    disabled={
                      titleOrder.orderBy === "title" && rankOrder.sort === "asc"
                    }
                  >
                    <FaArrowUp onClick={() => fetchWithOrder("title", "asc")} />
                  </button>
                  <button
                    className="disabled:opacity-30"
                    disabled={
                      titleOrder.orderBy === "title" &&
                      titleOrder.sort === "desc"
                    }
                  >
                    <FaArrowDown
                      onClick={() => fetchWithOrder("title", "desc")}
                    />
                  </button>
                </OrderingWrapper>
              </Table.Th>
              <Table.Th>
                <OrderingWrapper title="Rank">
                  <button
                    className="disabled:opacity-30"
                    disabled={
                      rankOrder.orderBy === "rank" && rankOrder.sort === "asc"
                    }
                  >
                    <FaArrowUp onClick={() => fetchWithOrder("rank", "asc")} />
                  </button>
                  <button
                    className="disabled:opacity-30"
                    disabled={
                      rankOrder.orderBy === "rank" && rankOrder.sort === "desc"
                    }
                  >
                    <FaArrowDown
                      onClick={() => fetchWithOrder("rank", "desc")}
                    />
                  </button>
                </OrderingWrapper>
              </Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>

        <div className="py-12 flex flex-row justify-end gap-6 items-center-safe">
          <Select
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
      </div>
    </div>
  );
};

export default AnimeList;
