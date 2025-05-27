import React, { FC, useEffect, useState } from "react";
import {
  Badge,
  Loader,
  Pagination,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import OrderingWrapper from "@/app/component/OrderingWrapper";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { apiData } from "@/app/anime/page";
import { IData } from "@/app/component/AnimeList";
import BaseSelect from "@/app/component/ui/BaseSelect";
import { IFilter } from "@/app/component/HeaderPage";
import BaseTable from "@/app/component/ui/BaseTable";

export type ITableProps = {
  setAllData: (value: React.SetStateAction<IData>) => void;
  allData: IData;
  type: string | null;
  title: string | undefined;
  loading: boolean;
  OnRow: (row: string | null) => void;
  filterValues: IFilter;
};

const TableData: FC<ITableProps> = (props) => {
  const { setAllData, type, title, loading, allData, OnRow, filterValues } =
    props;
  const [row, setRow] = useState<string | null>(""); // this is rows like 5 ,10 , 15 ,...
  const [currentPage, setCurrentPage] = useState(
    allData.pagination.current_page
  ); // this is used for set current page...

  const handlePageChange = async (newPage: number) => {
    const res = await apiData(
      Number(row) || 5,
      filterValues.type,
      filterValues.title,
      newPage
    );
    setAllData(res);
    setCurrentPage(newPage);
  };

  const handleRow = async (value: string | null) => {
    setRow(value);
    const res = await apiData(Number(value), filterValues.type);
    setAllData(res);
  };

  const [titleOrder, setTitleOrder] = useState<{
    sort: string | null;
    orderBy: string | null;
  }>({ sort: "", orderBy: "" }); //this is title order state for disabled up and down button

  const [rankOrder, setRankOrder] = useState<{
    sort: string | null;
    orderBy: string | null;
  }>({ sort: "", orderBy: "" }); // this is rank order state for disabled up and down button

  const startItem = (currentPage - 1) * allData.pagination.items.count;

  const endItem = startItem + (allData.pagination.items.per_page || 0) - 1;

  const totalPages = allData.pagination.last_visible_page;

  useEffect(() => {
    OnRow(row);
  }, [row]);

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
  const nodata = allData.data.length === 0;

  const rows = nodata ? (
    <TableTr>
      <TableTd colSpan={4}>
        <div className="text-base text-gray-700 flex items-center justify-center py-10">
          No data found
        </div>
      </TableTd>
    </TableTr>
  ) : loading ? (
    <TableTr>
      <TableTd colSpan={4}>
        <div className="flex items-center justify-center py-10">
          <Loader color="blue" type="dots" />
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

  return (
    <>
      {/* <Table classNames={{ thead: "text-gray-600 text-base bg-gray-200" }}>
        <TableThead>
          <TableTr>
            <TableTh>
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
                    titleOrder.orderBy === "title" && titleOrder.sort === "desc"
                  }
                >
                  <FaArrowDown
                    onClick={() => fetchWithOrder("title", "desc")}
                  />
                </button>
              </OrderingWrapper>
            </TableTh>
            <TableTh>
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
                  <FaArrowDown onClick={() => fetchWithOrder("rank", "desc")} />
                </button>
              </OrderingWrapper>
            </TableTh>
            <TableTh>Type</TableTh>
            <TableTh>Status</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>

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
      </div> */}

      <BaseTable
        data={allData}
        columns={[
          {
            label: "Title",
            render: (item) => item.title,
          
          },
          {
            label: "Rank",
            render: (item) => item.rank,
          },
          { label: "Type", render: (item) => item.type },
          { label: "Status", render: (item) => <Badge>{item.status}</Badge> },
        ]}
        pagination={{
          handlePageChange,
          handleRow,
          currentPage,
        }}
      />
    </>
  );
};

export default TableData;
