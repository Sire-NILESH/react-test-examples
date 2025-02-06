import axios from "axios";
import type { Product } from "../types";
import { useQuery } from "@tanstack/react-query";

interface FetchProductsResponse {
  products: Product[];
}

interface FetchProductsParams {
  limit: number;
  options: {
    signal: AbortSignal;
  };
}

const fetchProducts = async ({
  limit,
  options: { signal },
}: FetchProductsParams) => {
  return axios.get<FetchProductsResponse>(
    `https://dummyjson.com/products?limit=${limit}`,
    { signal }
  );
};

const useProducts = (limit: number = 50) => {
  const response = useQuery({
    queryKey: ["all-products"],
    queryFn: ({ signal }) => fetchProducts({ limit, options: { signal } }),
    refetchOnWindowFocus: false,
  });

  return {
    ...response,
    data: response.data?.data.products,
  };
};

export default useProducts;
