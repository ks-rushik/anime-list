import AnimeList from "@/app/component/AnimeList";
import axios from "axios";

export const apiData = async (
  limit?: number | null,
  filterData?: string | null,
  title?: string | undefined,
  page?: number | null
) => {
  const url = new URL("https://api.jikan.moe/v4/anime");

  if (limit) url.searchParams.append("limit", limit.toString());
  if (filterData) url.searchParams.append("type", filterData);
  if (title) url.searchParams.append("q", title);
  if(page) url.searchParams.append("page" , page.toString())
 
  const response = await axios.get(url.toString());
  return response.data;
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
