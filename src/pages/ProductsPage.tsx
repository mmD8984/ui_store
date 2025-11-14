import React, { useState, useMemo } from "react";
import Header from "@/common/Header.tsx";
import Footer from "@/common/Footer.tsx";

import { Typography,} from "@mui/material";
import {Link} from "react-router-dom";

import Breadcrumbs from "@/components/products/Breadcrumbs.tsx";
import Filters from "@/components/products/Filters.tsx";
import Pagination from "@/components/products/Pagination.tsx";
import SortSelect from "@/components/products/SortSelect.tsx";
import ProductCard from "@/common/ProductCard.tsx";

import macbookpro from "../assets/images/macbook-pro.png";
import ip15promax from "../assets/images/iphone-15-pro-max.png";
import s24ultra from "../assets/images/samsung-galaxy-s24-ultra.png";
import dellxps13 from "../assets/images/dell-xps-13-laptop.jpg";
import donghori from "../assets/images/dong-ho-orient-sk.jpg";
import taingheblt from "../assets/images/tai-nghe-chup-tai-bowers-wilkins-px8.jpg";

const allProducts = [
    { id: 1, name: 'MacBook Pro 16"', price: 45900000, originalPrice: 59990000, category: "Laptop", image: macbookpro, rating: 4.8, reviews: 128 },
    { id: 2, name: "iPhone 15 Pro", price: 29990000, originalPrice: 59990000, category: "Điện thoại", image: ip15promax, rating: 4.9, reviews: 256 },
    { id: 3, name: "iPad Air", price: 18990000, originalPrice: 59990000, category: "Máy tính bảng", image: s24ultra, rating: 4.7, reviews: 89 },
    { id: 4, name: "AirPods Max", price: 14990000, originalPrice: 59990000, category: "Phụ kiện", image: ip15promax, rating: 4.6, reviews: 154 },
    { id: 5, name: "Dell XPS 15", price: 39990000, originalPrice: 59990000, category: "Laptop", image: s24ultra, rating: 4.7, reviews: 95 },
    { id: 6, name: "Samsung Galaxy S24", price: 24990000, originalPrice: 59990000, category: "Điện thoại", image: taingheblt, rating: 4.5, reviews: 187 },
    { id: 7, name: "Samsung Tab S9", price: 16990000, originalPrice: 59990000, category: "Máy tính bảng", image: macbookpro, rating: 4.4, reviews: 67 },
    { id: 8, name: "Sony WH-1000XM5", price: 8990000, originalPrice: 59990000, category: "Phụ kiện", image: donghori, rating: 4.8, reviews: 203 },
    { id: 9, name: "Lenovo ThinkPad", price: 35990000, originalPrice: 59990000, category: "Laptop", image: dellxps13, rating: 4.6, reviews: 112 },
    { id: 10, name: "Google Pixel 8", price: 22990000, originalPrice: 59990000, category: "Điện thoại", image: dellxps13, rating: 4.7, reviews: 176 },
    { id: 11, name: "Apple Watch Ultra", price: 12990000, originalPrice: 59990000, category: "Laptop", image: donghori, rating: 4.9, reviews: 234 },
    { id: 12, name: "ASUS ROG Gaming Laptop", price: 55990000, originalPrice: 59990000, category: "Laptop", image: taingheblt, rating: 4.8, reviews: 145 },
];

const categories = ["Tất cả", "Laptop", "Điện thoại", "Máy tính bảng", "Phụ kiện"];

const sortOptions = [
    { label: "Mới nhất", value: "newest" },
    { label: "Giá: Thấp → Cao", value: "price-low" },
    { label: "Giá: Cao → Thấp", value: "price-high" },
    { label: "Đánh giá cao nhất", value: "rating" },
];

const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [sortBy, setSortBy] = useState("newest");
    const [priceRange, setPriceRange] = useState<number[]>([0, 60000000]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        if (selectedCategory !== "Tất cả") {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

        if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
        else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
        else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

        return filtered;
    }, [selectedCategory, sortBy, priceRange]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <main className="flex-fill">
                <Breadcrumbs category={selectedCategory !== "Tất cả" ? selectedCategory : undefined} />

                <div className="container py-4">
                    <div className="row">

                        {/* ============================ FILTER SIDEBAR ============================ */}
                        <div className="col-md-3 mb-4">
                            <Filters
                                selectedCategory={selectedCategory}
                                categories={categories}
                                priceRange={priceRange}
                                onCategoryChange={(cat) => {
                                    setSelectedCategory(cat);
                                    setCurrentPage(1);
                                }}
                                onPriceChange={(range) => setPriceRange(range)}
                            />
                        </div>

                        {/* ============================ PRODUCT LIST ============================ */}
                        <div className="col-md-9">
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                                <Typography variant="body2" color="text.secondary">
                                    Hiển thị <strong>{paginatedProducts.length}</strong> /{" "}
                                    <strong>{filteredProducts.length}</strong> sản phẩm
                                </Typography>

                                {/* ============================ SORT SELECT COMPONENT ============================ */}
                                <SortSelect
                                    sortBy={sortBy}
                                    sortOptions={sortOptions}
                                    onSortChange={(value) => {
                                        setSortBy(value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>

                            <div className="row g-3">
                                {paginatedProducts.map((product) => (
                                    <div key={product.id} className="col-sm-6 col-lg-4">
                                        <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                            <ProductCard product={product} />
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* ============================ PAGINATION ============================ */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductsPage;
