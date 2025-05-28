import React, { FC, useEffect, useState } from "react";
import BaseSelect from "@/app/component/ui/BaseSelect";
import { FaSearch } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDebouncedValue } from "@mantine/hooks";
import { apiData } from "@/app/anime/page";
import BaseInput from "@/app/component/ui/BaseInput";
import { mediaType } from "@/app/constant/mediaType";
import { statusType } from "@/app/constant/statusType";
import FieldWithDeleteButton from "@/app/component/FieldWithDeleteButton";

export type IFilter = {
  type: string | null;
  title: string;
  status: string | null;
};

export type IHeaderProps = {
  row: string | null;
  OnFilter: (filter: IFilter) => void;
  totalItem: number;
  currentPage: number | undefined;
};

const FilterFields: FC<IHeaderProps> = (props) => {
  const { row, OnFilter, totalItem, currentPage } = props;
  const [type, setType] = useState<string | null>(""); // this is type of like tv and other ...
  const [title, setTitle] = useState(""); // this is search field (input field)...
  const [status, setStatus] = useState<string | null>("");
  const [debounced] = useDebouncedValue(title, 1000);

  const filterArguments = {
    type: type,
    title: title,
    status: status,
  };

  useEffect(() => {
    OnFilter(filterArguments);
  }, [type, title, status]);

  // useEffect(() => {
  //   const debouncefunc = async () => {
  //     if (debounced.trim() !== "" || debounced === "") {
  //       const res = await apiData(Number(row) | 5, type, title, currentPage);
  //     }
  //   };
  //   debouncefunc();
  // }, [debounced]);

  const handleDeleteType = () => {
    setType("");
  };

  const handleDeleteTitle = () => {
    setTitle("");
  };

  const handleDeleteStatus = () => {
    setStatus("");
  };

  const handleAllDelete = () => {
    setType("");
    setTitle("");
    setStatus("");
  };

  const handleType = async (value: string | null) => {
    setType(value);
  };

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleStatus = async (value: string | null) => {
    setStatus(value);
  };

  return (
    <>
      <div className="flex items-center py-10 gap-4">
        <BaseSelect
          onChange={(value) => handleType(value)}
          label="Type"
          value={type}
          data={mediaType}
        />
        <BaseInput
          value={title}
          onChange={(e) => handleSearchInput(e)}
          placeholder="Search Anthing..."
          leftSection={<FaSearch />}
        />
        <BaseSelect
          label="Status"
          value={status}
          onChange={(value) => handleStatus(value)}
          data={statusType}
        />
      </div>

      <div>
        <span className="text-black font-bold">{totalItem}</span>
        <span className="text-gray-700 text-base pl-2">results found</span>
      </div>

      <div className="my-6 flex flex-row text-center items-center gap-12">
        {type && (
          <FieldWithDeleteButton
            title={"Type"}
            value={type}
            handleDelete={handleDeleteType}
          />
        )}
        {title.trim() && (
          <FieldWithDeleteButton
            title={"Title"}
            value={title}
            handleDelete={handleDeleteTitle}
          />
        )}
        {status && (
          <FieldWithDeleteButton
            title={"Status"}
            value={status!}
            handleDelete={handleDeleteStatus}
          />
        )}
        {type || title.trim() || status ? (
          <div>
            <MdDeleteOutline size={22} onClick={handleAllDelete} color="red" />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FilterFields;
