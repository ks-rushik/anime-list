import AnimeList from "@/app/component/AnimeList";
import axios, { AxiosError } from "axios";

export const apiData = async (
  limit?: number | null,
  filterData?: string | null,
  title?: string | undefined,
  page?: number | null,
  order?: string | null,
  sort?: string | null,
  status?: string | null
) => {
  const api = "https://api.jikan.moe/v4/anime";
  const params: Record<string, string> = {};

  if (limit) params.limit = limit.toString();
  if (filterData) params.type = filterData;
  if (title) params.q = title;
  if (page) params.page = page.toString();
  if (order) params.order_by = order;
  if (sort) params.sort = sort;
  if (status) params.status = status;

  try {
    const response = await axios.get(api, { params });
    return response.data;
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      if (error.code === "ERR_BAD_REQUEST") {
        throw new Error(
          "Failed to fetch data from the API, there might be wrong api"
        );
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  }
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
