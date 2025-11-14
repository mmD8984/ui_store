/**
 * Thông tin chi tiết về một sản phẩm
 */
export interface Product {
    id: string
    name: string
    slug: string
    description: string
    price: number
    originalPrice?: number
    category: string
    brand: string
    image: string
    images?: string[]        // Danh sách ảnh phụ
    inStock: boolean
    rating: number           // Điểm đánh giá (0-5)
    reviewCount: number      // Số lượng đánh giá
    specs?: Record<string, string>  // Thông số kỹ thuật
    tags?: string[]          // Từ khóa tìm kiếm
}

/**
 * Sản phẩm trong giỏ hàng
 */
export interface CartItem {
    product: Product
    quantity: number
}

/**
 * Danh mục sản phẩm
 */
export interface Category {
    id: string
    name: string
    slug: string
    image: string
    productCount: number
}

/**
 * Kết quả tìm kiếm Elasticsearch trả về
 */
export interface SearchResult {
    products: Product[]
    total: number
    page: number
    pageSize: number
}

/**
 * Truy vấn Elasticsearch với các bộ lọc và sắp xếp
 */
export interface ElasticsearchQuery {
    query: string
    filters?: {
        category?: string
        brand?: string
        priceRange?: {
            min: number
            max: number
        }
        inStock?: boolean
    }
    sort?: "relevance" | "price-asc" | "price-desc" | "rating"
    page?: number
    pageSize?: number
}
