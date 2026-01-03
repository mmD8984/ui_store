import axiosClient from "@/lib/axiosClient.ts";
import type { ProductListDTO } from "@/types/ProductListDTO";
import type { ProductDetail } from "@/types/product";
import type { RelatedProduct } from "@/types/related-product";

export interface GetProductsParams {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    size?: number;
    sort?: string;
}

export interface GetRelatedProductsParams {
    productId: number;
    limit?: number;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    pageable: Pageable;
}

export const getProducts = async (params: GetProductsParams): Promise<PaginatedResponse<ProductListDTO>> => {
    const res = await axiosClient.get(`/public/products`, { params });
    return res.data;
};

export const getCategories = async (): Promise<{ id: number; name: string; slug: string }[]> => {
    const res = await axiosClient.get(`/public/categories`);
    return res.data;
};

export const getProductDetail = async (productId: number): Promise<ProductDetail> => {
    const res = await axiosClient.get<ProductDetail>(`/public/products/${productId}`);
    return res.data;
};

export const getRelatedProducts = async (params: GetRelatedProductsParams): Promise<RelatedProduct[]> => {
    const res = await axiosClient.get<RelatedProduct[]>(`/public/products/${params.productId}/related`,
        {
            params: {
                limit: params.limit ?? 4,
            },
        }
    );
    return res.data;
};
