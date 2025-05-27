import React, { FC, useEffect, useState } from "react";
import BaseSelect from "@/app/component/ui/BaseSelect";
import { Input } from "@mantine/core";
import { IData } from "@/app/component/AnimeList";
import { FaSearch } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import FieldWithValueWrapper from "@/app/component/FieldWithValueWrapper";
import { useDebouncedValue } from "@mantine/hooks";
import { apiData } from "@/app/anime/page";
import BaseInput from "@/app/component/ui/BaseInput";

export type IFilter = {
  type: string | null;
  title: string;
};

export type IHeaderProps = {
  alldata: IData;
  setAllData: React.Dispatch<React.SetStateAction<IData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  row: string | null;
  OnFilter: (filter: IFilter) => void;
};

const HeaderPage: FC<IHeaderProps> = (props) => {
  const { setAllData, alldata, setLoading, row, OnFilter } = props;
  const [type, setType] = useState<string | null>(""); // this is type of like tv and other ...
  const [title, setTitle] = useState(""); // this is search field (input field)...
  const [status, setStatus] = useState<string | null>("");
  const [debounced] = useDebouncedValue(title, 1000);

  const filterArguments = {
    type: type,
    title: title,
  };

  useEffect(() => {
    OnFilter(filterArguments);
  }, [type, title]);

  useEffect(() => {
    const debouncefunc = async () => {
      const res = await apiData(Number(row) | 5, type, title);
      setAllData(res);
    };
    debouncefunc();
  }, [debounced]);

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
    setLoading(true);
    setTitle(e.target.value);
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

  const totalItem = alldata.pagination.items.total;

  return (
    <>
      <div className="flex items-center py-10 gap-4">
        <BaseSelect
          onChange={(value) => handleType(value)}
          label="Type"
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
        <BaseInput
          onChange={(e) => handleSearchInput(e)}
          placeholder="Search Anthing..."
          leftSection={<FaSearch />}
        />
        <BaseSelect
          label="Status"
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
        <FieldWithValueWrapper
          title={"Type"}
          value={type!}
          handleDelete={handleDeleteType}
        />
        <FieldWithValueWrapper
          title={"Title"}
          value={title}
          handleDelete={handleDeleteTitle}
        />
        <FieldWithValueWrapper
          title={"Status"}
          value={status!}
          handleDelete={handleDeleteStatus}
        />

        {type && status && title && (
          <div>
            <MdDeleteOutline size={22} onClick={handleAllDelete} color="red" />
          </div>
        )}
      </div>
    </>
  );
};

export default HeaderPage;
