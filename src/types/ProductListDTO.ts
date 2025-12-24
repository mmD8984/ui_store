export interface ProductListDTO {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    avgRating: number;
    totalReviews: number;
    thumbnail: string;
}

export interface CategoryDTO {
    id: number;
    name: string;
    slug: string;
}
