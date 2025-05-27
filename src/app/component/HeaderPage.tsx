import React, { FC } from "react";
import BaseSelect from "@/app/component/ui/BaseSelect";
import { Input } from "@mantine/core";
import { IData } from "@/app/component/AnimeList";
import { FaSearch } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import FieldWithValueWrapper from "@/app/component/FieldWithValueWrapper";

export type IHeaderProps = {
  handleType: (value: string | null) => Promise<void>;
  handleStatus: (value: string | null) => Promise<void>;
  type: string | null;
  title: string;
  allData: IData;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  status: string | null;
  handleDeleteTitle: () => void;
  handleDeleteType: () => void;
  handleDeleteStatus: () => void;
  handleAllDelete: () => void;
};

const HeaderPage: FC<IHeaderProps> = (props) => {
  const {
    handleType,
    type,
    title,
    allData,
    handleSearchInput,
    handleDeleteTitle,
    handleStatus,
    status,
    handleDeleteType,
    handleAllDelete,
    handleDeleteStatus,
  } = props;
  const totalItem = allData.pagination.items.total;

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
        <Input
          value={title}
          onChange={(e) => handleSearchInput(e)}
          classNames={{ input: "!h-12 !rounded-2xl" }}
          placeholder="Search anything.."
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
