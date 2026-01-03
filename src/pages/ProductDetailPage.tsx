import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Typography, Button, CircularProgress } from "@mui/material";

import Header from "@/common/Header";
import Footer from "@/common/Footer";
import Breadcrumbs from "@/components/products/Breadcrumbs";

import ProductGallery from "@/components/productDetail/ProductGallery";
import ProductInfo from "@/components/productDetail/ProductInfo";
import ProductPriceBox from "@/components/productDetail/ProductPriceBox";
import ProductActions from "@/components/productDetail/ProductActions";
import ProductBenefits from "@/components/productDetail/ProductBenefits";
import ProductSpecs from "@/components/productDetail/ProductSpecs";
import ProductFeatures from "@/components/productDetail/ProductFeatures";
import RelatedProducts from "@/components/productDetail/RelatedProducts";

import { getProductDetail } from "@/api/product.api";
import type { ProductDetail, ProductVariant } from "@/types/product";

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getProductDetail(Number(id))
            .then(data => {
                setProduct(data);
                setSelectedVariant(data.variants[0] ?? null);
            })
            .catch(() => setProduct(null))
            .finally(() => setLoading(false));
    }, [id]);
    // chờ load dữ liệu
    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <CircularProgress  color="inherit" />
            </div>
        );
    }
    // nếu sản phẩm không có
    if (!product) {
        return (
            <div className="text-center py-5">
                <Typography variant="h5" gutterBottom>
                    Sản phẩm không tìm thấy
                </Typography>
                <Button
                    component={RouterLink}
                    to="/products"
                    variant="contained"
                    sx={{ backgroundColor: "black", color: "white" }}
                >
                    Quay lại danh sách
                </Button>
            </div>
        );
    }
    // chi tiết sản phẩm
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <main className="flex-fill">
                <Breadcrumbs
                    category={product.category.name}
                    productName={product.name}
                />

                <div className="container py-5">
                    <div className="row">
                        {/*các ảnh của sản phẩm*/}
                        <div className="col-md-6 mb-4">
                            <ProductGallery
                                images={product.images}
                                productName={product.name}
                            />
                        </div>
                        {/*thông tin sản phẩm*/}
                        <div className="col-md-6">
                            <ProductInfo
                                name={product.name}
                                categorySlug={product.category.slug}
                                rating={product.rating}
                                reviews={product.reviews}
                                description={product.description}
                                variants={product.variants}
                                onVariantChange={(variant) => setSelectedVariant(variant)}
                            />
                            {/*giá*/}
                            <ProductPriceBox
                                variant={selectedVariant}
                                quantity={quantity}
                            />
                            {/*thêm giỏ hàng/yêu thích*/}
                            <ProductActions
                                stock={selectedVariant?.stock ?? 0}
                                quantity={quantity}
                                onQuantityChange={setQuantity}
                                onAddToCart={(qty) =>
                                    console.log("Add to cart", product.id, selectedVariant?.id, qty)
                                }
                            />
                        </div>
                        {/*lợi ích*/}
                        <ProductBenefits />
                    </div>

                    <div className="row mt-5">
                        {/*thông số*/}
                        <div className="col-md-6">
                            <ProductSpecs specs={product.specs} />
                        </div>
                        {/*đặc điểm*/}
                        <div className="col-md-6">
                            <ProductFeatures features={product.features} />
                        </div>
                    </div>
                    {/*sản phẩm liên quan*/}
                    <RelatedProducts productId={product.id} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
