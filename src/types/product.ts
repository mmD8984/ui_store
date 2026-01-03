export interface ProductSpec {
    label: string;
    value: string;
}

export interface ProductVariant {
    id: number;
    color?: string | null;
    ram?: string | null;
    storage?: string | null;
    price: number;
    originalPrice?: number;
    stock: number;
}

export interface ProductDetail {
    id: number;
    name: string;
    images: string[];      // backend nên trả mảng
    category: {
        name: string;
        slug: string;
    };
    rating: number;
    reviews: number;
    description: string;
    specs: ProductSpec[];
    features: string[];
    variants: ProductVariant[];
}
