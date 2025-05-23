import AnimeList from "@/app/component/AnimeList";
import axios from "axios";

export const apiData = async (
  limit?: number | null,
  filterData?: string | null,
  title?: string | undefined,
  page?: number | null,
  order?: string | null,
  sort?: string | null,
  status?: string | null
) => {
  const url = new URL("https://api.jikan.moe/v4/anime");

  if (limit) url.searchParams.append("limit", limit.toString());
  if (filterData) url.searchParams.append("type", filterData);
  if (title) url.searchParams.append("q", title);
  if (page) url.searchParams.append("page", page.toString());
  if (order) url.searchParams.append("order_by", order);
  if (sort) url.searchParams.append("sort", sort);
  if (status) url.searchParams.append("status", status);

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
