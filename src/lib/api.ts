// src/lib/api.ts
import axios from "axios"
import type { Product, SearchResult, ElasticsearchQuery } from "./types"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

// Mock data for local development (có thể xoá khi kết nối backend thật)
const mockProducts: Product[] = [
    {
        id: "1",
        name: 'MacBook Pro 16" M3 Max',
        slug: "macbook-pro-16-m3-max",
        description: "Laptop chuyên nghiệp với chip M3 Max mạnh mẽ, màn hình Liquid Retina XDR 16 inch",
        price: 89990000,
        originalPrice: 99990000,
        category: "laptops",
        brand: "Apple",
        image: "/macbook-pro-laptop.png",
        inStock: true,
        rating: 4.8,
        reviewCount: 234,
        specs: {
            Chip: "Apple M3 Max",
            RAM: "36GB",
            Storage: "1TB SSD",
            Display: '16.2" Liquid Retina XDR',
        },
    },
    {
        id: "2",
        name: "iPhone 15 Pro Max",
        slug: "iphone-15-pro-max",
        description: "Smartphone cao cấp với chip A17 Pro, camera 48MP, khung titan",
        price: 34990000,
        category: "smartphones",
        brand: "Apple",
        image: "/iphone-15-pro-max-display.png",
        inStock: true,
        rating: 4.9,
        reviewCount: 567,
    },
    {
        id: "3",
        name: "Samsung Galaxy S24 Ultra",
        slug: "samsung-galaxy-s24-ultra",
        description: "Flagship Android với S Pen, camera 200MP, màn hình Dynamic AMOLED 2X",
        price: 31990000,
        category: "smartphones",
        brand: "Samsung",
        image: "/samsung-galaxy-s24-ultra.png",
        inStock: true,
        rating: 4.7,
        reviewCount: 423,
    },
    {
        id: "4",
        name: "Dell XPS 15",
        slug: "dell-xps-15",
        description: "Laptop cao cấp với Intel Core i9, màn hình OLED 4K, thiết kế premium",
        price: 45990000,
        category: "laptops",
        brand: "Dell",
        image: "/dell-xps-15.png",
        inStock: true,
        rating: 4.6,
        reviewCount: 189,
    },
    {
        id: "5",
        name: "AirPods Pro (2nd Gen)",
        slug: "airpods-pro-2nd-gen",
        description: "Tai nghe true wireless với ANC chủ động, chip H2, âm thanh Adaptive",
        price: 6490000,
        category: "accessories",
        brand: "Apple",
        image: "/airpods-pro-lifestyle.png",
        inStock: true,
        rating: 4.8,
        reviewCount: 892,
    },
    {
        id: "6",
        name: "Sony WH-1000XM5",
        slug: "sony-wh-1000xm5",
        description: "Tai nghe over-ear với ANC hàng đầu, âm thanh Hi-Res, pin 30 giờ",
        price: 8990000,
        category: "accessories",
        brand: "Sony",
        image: "/sony-headphones-wh1000xm5.jpg",
        inStock: true,
        rating: 4.9,
        reviewCount: 654,
    },
]

// 🔍 Tìm kiếm sản phẩm (kết nối Elasticsearch / Spring Boot)
export async function searchProducts(query: ElasticsearchQuery): Promise<SearchResult> {
    try {
        // Kết nối backend thật (bỏ comment khi backend đã sẵn sàng)
        // const response = await axios.post(`${API_BASE_URL}/products/search`, query)
        // return response.data

        // Mock tạm thời
        await new Promise((resolve) => setTimeout(resolve, 300))

        let filtered = [...mockProducts]

        if (query.query) {
            const searchTerm = query.query.toLowerCase()
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.description.toLowerCase().includes(searchTerm) ||
                    p.brand.toLowerCase().includes(searchTerm),
            )
        }

        if (query.filters?.category) {
            filtered = filtered.filter((p) => p.category === query.filters?.category)
        }

        if (query.filters?.brand) {
            filtered = filtered.filter((p) => p.brand === query.filters?.brand)
        }

        return {
            products: filtered,
            total: filtered.length,
            page: query.page || 1,
            pageSize: query.pageSize || 20,
        }
    } catch (error) {
        console.error("Error searching products:", error)
        throw error
    }
}

// 🧩 Lấy chi tiết 1 sản phẩm
export async function getProduct(slug: string): Promise<Product | null> {
    try {
        // const response = await axios.get(`${API_BASE_URL}/products/${slug}`)
        // return response.data

        await new Promise((resolve) => setTimeout(resolve, 200))
        return mockProducts.find((p) => p.slug === slug) || null
    } catch (error) {
        console.error("Error fetching product:", error)
        throw error
    }
}

// ⭐ Lấy sản phẩm nổi bật
export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        // const response = await axios.get(`${API_BASE_URL}/products/featured`)
        // return response.data

        await new Promise((resolve) => setTimeout(resolve, 200))
        return mockProducts.slice(0, 6)
    } catch (error) {
        console.error("Error fetching featured products:", error)
        throw error
    }
}
