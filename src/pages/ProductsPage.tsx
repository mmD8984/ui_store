import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Header from "@/common/Header";
import Footer from "@/common/Footer";
import { Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import Breadcrumbs from "@/components/products/Breadcrumbs";
import Filters from "@/components/products/Filters";
import Pagination from "@/components/products/Pagination";
import SortSelect from "@/components/products/SortSelect";
import ProductCard from "@/common/ProductCard";

import { getProducts, getCategories } from "@/api/product.api.ts";
import type { ProductListDTO } from "@/types/ProductListDTO";
import type { CategoryDTO } from "@/types/CategoryDTO";

const sortOptions = [
    { label: "Mới nhất", value: "newest" },
    { label: "Giá: Thấp → Cao", value: "price-low" },
    { label: "Giá: Cao → Thấp", value: "price-high" },
    { label: "Đánh giá cao nhất", value: "rating" },
];

const ProductsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const categoryFromURL = searchParams.get("category") ?? "";

    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("all");
    const [sortBy, setSortBy] = useState<string>("newest");
    const [priceRange, setPriceRange] = useState<number[]>([0, 60000000]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [products, setProducts] = useState<ProductListDTO[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    // Load categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Lỗi khi load categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Cập nhật category từ URL
    useEffect(() => {
        if (categoryFromURL) {
            const found = categories.find((c) => c.slug === categoryFromURL);
            setSelectedCategorySlug(found ? found.slug : "all");
        }
    }, [categoryFromURL, categories]);

    // Load products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await getProducts({
                    category: selectedCategorySlug !== "all" ? selectedCategorySlug : undefined,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                    page: currentPage - 1,
                    size: 8,
                    sort: sortBy,
                });
                setProducts(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error("Lỗi khi load products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategorySlug, priceRange, sortBy, currentPage]);

    // Lấy tên category từ slug để hiển thị
    const getCategoryName = (slug: string) => {
        if (slug === "all") return "Tất cả";
        const found = categories.find((c) => c.slug === slug);
        return found ? found.name : "Tất cả";
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <main className="flex-fill">
                <Breadcrumbs category={getCategoryName(selectedCategorySlug)} />

                <div className="container py-4">
                    <div className="row">
                        {/* FILTER */}
                        <div className="col-md-3 mb-4">
                            <Filters
                                selectedCategory={getCategoryName(selectedCategorySlug)}
                                categories={["Tất cả", ...categories.map((c) => c.name)]}
                                priceRange={priceRange}
                                onCategoryChange={(catName) => {
                                    if (catName === "Tất cả") setSelectedCategorySlug("all");
                                    else {
                                        const cat = categories.find((c) => c.name === catName);
                                        setSelectedCategorySlug(cat ? cat.slug : "all");
                                    }
                                    setCurrentPage(1);
                                }}
                                onPriceChange={(range) => setPriceRange(range)}
                            />
                        </div>

                        {/* PRODUCT LIST */}
                        <div className="col-md-9">
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                                <Typography variant="body2" color="text.secondary">
                                    Hiển thị <strong>{products.length}</strong> sản phẩm
                                </Typography>

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
                                {loading ? (
                                    <Typography>Đang tải...</Typography>
                                ) : products.length === 0 ? (
                                    <Typography>Không có sản phẩm</Typography>
                                ) : (
                                    products.map((product) => (
                                        <Link key={product.id} to={`/products/${product.id}`} className="col-sm-6 col-lg-4" style={{ textDecoration: "none", color: "inherit" }}>
                                            <ProductCard
                                                product={{
                                                    id: product.id,
                                                    name: product.name,
                                                    category: product.category,
                                                    price: Number(product.price),
                                                    originalPrice: Number(product.originalPrice),
                                                    rating: Number(product.avgRating),
                                                    reviews: product.totalReviews,
                                                    image: product.thumbnail,
                                                }}
                                            />
                                        </Link>
                                    ))
                                )}
                            </div>

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
