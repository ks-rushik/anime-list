import React, { FC, useState } from "react";
import {
  Badge,
  Loader,
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

export type ITableProps = {
  setAllData: (value: React.SetStateAction<IData>) => void;
  allData: IData;
  row: string | null;
  type: string | null;
  title: string | undefined;
  loading: boolean;
};

const TableData: FC<ITableProps> = (props) => {
  const { setAllData, row, type, title, loading, allData } = props;
  const [titleOrder, setTitleOrder] = useState<{
    sort: string | null;
    orderBy: string | null;
  }>({ sort: "", orderBy: "" }); //this is title order state for disabled up and down button

  const [rankOrder, setRankOrder] = useState<{
    sort: string | null;
    orderBy: string | null;
  }>({ sort: "", orderBy: "" }); // this is rank order state for disabled up and down button

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
      <Table classNames={{ thead: "text-gray-600 text-base bg-gray-200" }}>
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
    </>
  );
};

export default TableData;
