import React from "react";
import AnimeList from "@/app/component/AnimeList";

export const apiData = async (
  limit?: number | null,
  filterData?: string | null
) => {
  console.log(filterData, "this is filterData");

  const api = `https://api.jikan.moe/v4/anime?limit=${limit}&q={fil}`;
  const response = await fetch(api);
  const allData = await response.json();
  return allData;
};

const page = async () => {
  const allData = await apiData(5);

  return (
    <>
      <AnimeList alldata={allData} />
    </>
  );
};

export default page;
