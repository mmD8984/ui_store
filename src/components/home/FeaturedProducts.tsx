import React, { useState, useEffect } from "react";
import ProductCard from "../../common/ProductCard.tsx";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { getProducts } from "@/api/product.api.ts";
import type { ProductListDTO } from "@/types/ProductListDTO";

const FeaturedProducts: React.FC = () => {
    const [products, setProducts] = useState<ProductListDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Lấy 8 sản phẩm mới nhất làm Featured
                const data = await getProducts({
                    page: 0,
                    size: 8,
                    sort: "newest",
                });
                setProducts(data.content);
            } catch (err) {
                console.error("Lỗi khi load featured products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Box component="section" sx={{ py: 8, backgroundColor: "background.default" }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={2}
                    className="mb-5"
                >
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: "common.black" }}>
                            Sản phẩm nổi bật
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            Những sản phẩm được yêu thích nhất
                        </Typography>
                    </Box>
                </Stack>

                {/* Product grid */}
                <div className="row g-4">
                    {loading ? (
                        <Typography>Đang tải...</Typography>
                    ) : products.length === 0 ? (
                        <Typography>Không có sản phẩm</Typography>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
                                <Link
                                    to={`/products/${product.id}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                >
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
                            </div>
                        ))
                    )}
                </div>

                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Button
                        component={Link}
                        to="/products"
                        variant="contained"
                        size="large"
                        sx={{
                            fontWeight: 500,
                            textTransform: "none",
                            px: 3,
                            py: 1.5,
                            color: "common.black",
                            bgcolor: "common.white",
                            "&:hover": { color: "common.white", bgcolor: "common.black" },
                        }}
                    >
                        Xem tất cả sản phẩm
                        <ArrowRight style={{ marginLeft: 8, width: 18, height: 18 }} />
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default FeaturedProducts;
