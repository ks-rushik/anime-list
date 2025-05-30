import {
  Loader,
  Pagination,
  Table,
  TableProps,
  TableStylesNames,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from "@mantine/core";
import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import BaseSelect from "@/app/component/ui/BaseSelect";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export type ISort = { column: string; sort: string };

export type IPagination = {
  handleRow: (value: string | null) => Promise<void>;
  handlePageChange: (newPage: number) => Promise<void>;
  currentPage: number;
};
export type IColumn<T> = {
  label: string;
  render: (item: T) => ReactNode;
  sortable?: {
    upFunc: () => void;
    downFunc: () => void;
    sortingOrder: ISort;
  };
};

export type IData<T> = {
  data: T[];
  pagination: {
    current_page: number;
    has_next_page: boolean;
    items: { count: number; total: number; per_page: number };
    last_visible_page: number;
  };
};

export type IBaseTableProps<T> = TableProps & {
  classNames?: Partial<Record<TableStylesNames, string>>;
  columns: IColumn<T>[];
  data: IData<T>;
  pagination?: IPagination | undefined;
  loading: boolean;
};

const BaseTable = <T,>({
  classNames,
  columns,
  data,
  pagination,
  loading,
  ...other
}: IBaseTableProps<T>) => {
  const perPage = data.pagination.items.per_page || 5;
  const totalItems = data.pagination.items.total || 0;
  const currentPage = pagination?.currentPage || 1;

  const startItem =
    totalItems === 0
      ? (currentPage - 1) * perPage
      : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(
    startItem === 0 ? 0 : startItem + (data.pagination.items.count || 0) - 1,
    totalItems
  );

  const totalPages = data.pagination.last_visible_page;

  const totalItem = data.pagination.items.total;

  return (
    <>
      <Table
        {...other}
        classNames={{
          ...classNames,
          thead: clsx("text-gray-600 text-base bg-gray-200", classNames?.thead),
        }}
      >
        <TableThead>
          <TableTr>
            {columns.map((col, index) => (
              <React.Fragment key={index}>
                {col.sortable ? (
                  <TableTh>
                    <div className="flex items-center gap-2">
                      <span>{col.label}</span>
                      <div className="flex">
                        <button
                          className="disabled:opacity-30"
                          onClick={col.sortable.upFunc}
                          disabled={
                            col.label === col.sortable.sortingOrder.column &&
                            col.sortable.sortingOrder.sort === "asc"
                          }
                        >
                          <FaArrowUp size={14} />
                        </button>
                        <button
                          className="disabled:opacity-30"
                          onClick={col.sortable.downFunc}
                          disabled={
                            col.label === col.sortable.sortingOrder.column &&
                            col.sortable.sortingOrder.sort === "desc"
                          }
                        >
                          <FaArrowDown size={14} />
                        </button>
                      </div>
                    </div>
                  </TableTh>
                ) : (
                  <TableTh>{col.label}</TableTh>
                )}
              </React.Fragment>
            ))}
          </TableTr>
        </TableThead>
        <TableTbody>
          {data.data.length === 0 ? (
            <TableTr>
              <TableTd colSpan={columns.length}>
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
            data.data.map((row, index) => (
              <TableTr key={index}>
                {columns.map((col, index) => (
                  <TableTd key={index}>{col.render(row)}</TableTd>
                ))}
              </TableTr>
            ))
          )}
        </TableTbody>
      </Table>
      {pagination && (
        <div className="py-12 flex flex-row justify-end gap-6 items-center-safe">
          <BaseSelect
            data={["5", "10", "15", "20"]}
            onChange={(value) => pagination.handleRow(value)}
            defaultValue={"5"}
          />
          <div>
            {startItem} - {endItem} of {totalItem}
          </div>
          <Pagination
            total={totalPages}
            value={pagination.currentPage}
            onChange={pagination.handlePageChange}
            radius={"xl"}
          />
        </div>
      )}
    </>
  );
};

export default BaseTable;
