import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../common/Header.tsx"
import Footer from "../common/Footer.tsx"
import ip15promax from "../assets/images/iphone-15-pro-max.png"
import macbookprom3 from "../assets/images/macbook-pro-m3.jpg"
import s24ultra from "../assets/images/samsung-galaxy-s24-ultra.png"
import ipadpro12 from "../assets/images/ipad-pro-12-9.jpg"
import airspodpro2 from "../assets/images/airpods-pro-2.jpg"
import dellxps13 from "../assets/images/dell-xps-13-lifestyle.jpg"
import sonywh1000 from "../assets/images/sony-wh-1000xm5.jpg"
import applewatch9 from "../assets/images/apple-watch-series-9.jpg"

interface Product {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    category: string
    rating: number
    reviews: number
    badge?: string
}

const mockProducts: Product[] = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 29990000,
        originalPrice: 32990000,
        image: ip15promax,
        category: "smartphone",
        rating: 4.8,
        reviews: 1250,
        badge: "Bestseller",
    },
    {
        id: 2,
        name: "MacBook Pro M3",
        price: 52990000,
        image: macbookprom3,
        category: "laptop",
        rating: 4.9,
        reviews: 890,
    },
    {
        id: 3,
        name: "Samsung Galaxy S24 Ultra",
        price: 26990000,
        originalPrice: 29990000,
        image: s24ultra,
        category: "smartphone",
        rating: 4.7,
        reviews: 2100,
        badge: "New",
    },
    {
        id: 4,
        name: "iPad Pro 12.9",
        price: 24990000,
        image: ipadpro12,
        category: "tablet",
        rating: 4.6,
        reviews: 650,
    },
    {
        id: 5,
        name: "AirPods Pro 2",
        price: 6490000,
        originalPrice: 7490000,
        image: airspodpro2,
        category: "audio",
        rating: 4.8,
        reviews: 3200,
        badge: "Sale",
    },
    {
        id: 6,
        name: "Dell XPS 13",
        price: 32990000,
        image: dellxps13,
        category: "laptop",
        rating: 4.5,
        reviews: 420,
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        price: 8990000,
        image: sonywh1000,
        category: "audio",
        rating: 4.7,
        reviews: 1800,
    },
    {
        id: 8,
        name: "Apple Watch Series 9",
        price: 9990000,
        image: applewatch9,
        category: "wearable",
        rating: 4.6,
        reviews: 950,
    },
]

const categories = [
    { id: "all", name: "Tất cả sản phẩm", count: mockProducts.length },
    { id: "smartphone", name: "Điện thoại", count: mockProducts.filter((p) => p.category === "smartphone").length },
    { id: "laptop", name: "Laptop", count: mockProducts.filter((p) => p.category === "laptop").length },
    { id: "tablet", name: "Tablet", count: mockProducts.filter((p) => p.category === "tablet").length },
    { id: "audio", name: "Âm thanh", count: mockProducts.filter((p) => p.category === "audio").length },
    { id: "wearable", name: "Thiết bị đeo", count: mockProducts.filter((p) => p.category === "wearable").length },
]

const ProductCatalog = () => {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name")

    const filteredProducts = mockProducts
        .filter((product) => {
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price
                case "price-high":
                    return b.price - a.price
                case "rating":
                    return b.rating - a.rating
                default:
                    return a.name.localeCompare(b.name)
            }
        })

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f8f9fa",
                color: "#333333",
                fontFamily: "system-ui, -apple-system, sans-serif",
            }}
        >
            <Header />

            {/* Banner */}
            <div
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "40px 0",
                }}
            >
                <div
                    style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        padding: "0 24px",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "36px",
                            fontWeight: "bold",
                            margin: "0 0 12px 0",
                            textAlign: "center",
                        }}
                    >
                        Tìm sản phẩm của bạn
                    </h1>
                    <p
                        style={{
                            fontSize: "18px",
                            color: "rgba(255, 255, 255, 0.9)",
                            margin: "0",
                            textAlign: "center",
                        }}
                    >
                        Khám phá bộ sưu tập công nghệ hàng đầu với chất lượng cao từ TechStore.
                    </p>
                </div>
            </div>

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "40px 24px",
                    display: "flex",
                    gap: "30px",
                }}
            >
                {/* Sidebar */}
                <div style={{ width: "280px", flexShrink: 0 }}>
                    {/* Search */}
                    <div style={{ marginBottom: "32px" }}>
                        <div style={{ position: "relative" }}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 16px 12px 44px",
                                    backgroundColor: "white",
                                    border: "1px solid #dee2e6",
                                    borderRadius: "8px",
                                    color: "#333333",
                                    fontSize: "14px",
                                    outline: "none",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    left: "16px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#6c757d",
                                }}
                            >
                                🔍
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div style={{ marginBottom: "32px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#0d6efd", margin: "0 0 16px 0" }}>Danh mục</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "12px 16px",
                                        backgroundColor: selectedCategory === category.id ? "#0d6efd" : "white",
                                        border: "1px solid #dee2e6",
                                        borderRadius: "6px",
                                        color: selectedCategory === category.id ? "white" : "#333333",
                                        fontSize: "14px",
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        textAlign: "left",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    <span>{category.name}</span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            color: selectedCategory === category.id ? "rgba(255,255,255,0.8)" : "#6c757d",
                                            backgroundColor: selectedCategory === category.id ? "rgba(255,255,255,0.2)" : "#f8f9fa",
                                            padding: "2px 6px",
                                            borderRadius: "4px",
                                        }}
                                    >
                    {category.count}
                  </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort */}
                    <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#0d6efd", margin: "0 0 16px 0" }}>Sắp xếp</h3>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                backgroundColor: "white",
                                border: "1px solid #dee2e6",
                                borderRadius: "8px",
                                color: "#333333",
                                fontSize: "14px",
                                outline: "none",
                                cursor: "pointer",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            }}
                        >
                            <option value="name">Tên A-Z</option>
                            <option value="price-low">Giá thấp đến cao</option>
                            <option value="price-high">Giá cao đến thấp</option>
                            <option value="rating">Đánh giá cao nhất</option>
                        </select>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "24px",
                            paddingBottom: "16px",
                            borderBottom: "1px solid #dee2e6",
                        }}
                    >
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 4px 0", color: "#0d6efd" }}>
                                {selectedCategory === "all"
                                    ? "Tất cả sản phẩm"
                                    : categories.find((c) => c.id === selectedCategory)?.name}
                            </h2>
                            <p style={{ fontSize: "14px", color: "#6c757d", margin: "0" }}>{filteredProducts.length} sản phẩm</p>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "24px",
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                style={{
                                    backgroundColor: "white",
                                    border: "1px solid #dee2e6",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <div style={{ position: "relative", aspectRatio: "1", backgroundColor: "#f8f9fa" }}>
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    {product.badge && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "12px",
                                                left: "12px",
                                                backgroundColor:
                                                    product.badge === "Sale" ? "#dc3545" : product.badge === "New" ? "#198754" : "#0d6efd",
                                                color: "#ffffff",
                                                padding: "4px 8px",
                                                borderRadius: "4px",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {product.badge}
                                        </div>
                                    )}
                                </div>

                                <div style={{ padding: "20px" }}>
                                    <h3
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "600",
                                            margin: "0 0 8px 0",
                                            color: "#333333",
                                            lineHeight: "1.4",
                                        }}
                                    >
                                        {product.name}
                                    </h3>

                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                            <span style={{ color: "#ffc107" }}>★</span>
                                            <span style={{ fontSize: "14px", color: "#333333", fontWeight: "500" }}>{product.rating}</span>
                                        </div>
                                        <span style={{ fontSize: "14px", color: "#6c757d" }}>({product.reviews} đánh giá)</span>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "#0d6efd" }}>
                      {formatPrice(product.price)}
                    </span>
                                        {product.originalPrice && (
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#6c757d",
                                                    textDecoration: "line-through",
                                                }}
                                            >
                        {formatPrice(product.originalPrice)}
                      </span>
                                        )}
                                    </div>

                                    <button
                                        style={{
                                            width: "100%",
                                            padding: "12px",
                                            backgroundColor: "#0d6efd",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                        }}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <div style={{ textAlign: "center", padding: "64px 24px", color: "#6c757d" }}>
                            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 8px 0", color: "#333333" }}>
                                Không tìm thấy sản phẩm
                            </h3>
                            <p style={{ fontSize: "14px", margin: "0" }}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductCatalog
