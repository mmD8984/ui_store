import axiosClient from "./axiosClient";
import type { ProductListDTO } from "@/types/ProductListDTO";

export interface GetProductsParams {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    size?: number;
    sort?: string;
}

export const getProducts = async (params: GetProductsParams) => {
    const response = await axiosClient.get("/public/products", { params });
    return response.data as {
        content: ProductListDTO[];
        totalPages: number;
        totalElements: number;
        pageable: any;
    };
};

export const getCategories = async () => {
    const response = await axiosClient.get("/public/categories");
    return response.data as { id: number; name: string; slug: string }[];
};
