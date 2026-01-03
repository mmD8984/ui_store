import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

import { getRelatedProducts } from "@/api/product.api";
import type { RelatedProduct } from "@/types/related-product";
import { formatPrice } from "@/utils/formatPrice";

interface RelatedProductsProps {
    productId: number;
}

export default function RelatedProducts({
                                            productId,
                                        }: RelatedProductsProps) {
    const [products, setProducts] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;

        setLoading(true);

        getRelatedProducts({
            productId,
            limit: 4,
        })
            .then(setProducts)
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [productId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-4">
                <CircularProgress />
            </div>
        );
    }

    if (!products.length) return null;

    return (
        <div className="mt-5">
            <Typography variant="h5" className="mb-3">
                Sản phẩm liên quan
            </Typography>

            <div className="row g-3">
                {products.map((product) => (
                    <div className="col-6 col-md-3" key={product.id}>
                        <RouterLink
                            to={`/products/${product.id}`}
                            className="text-decoration-none"
                        >
                            <Card className="h-100">
                                <div style={{ height: 160, overflow: "hidden" }}>
                                    <img
                                        src={product.thumbnail}
                                        alt={product.name}
                                        loading="lazy"
                                        style={{width: "100%", height: "100%", objectFit: "cover",}}
                                    />
                                </div>

                                <CardContent>
                                    <Typography variant="subtitle2" className="mb-2" noWrap>
                                        {product.name}
                                    </Typography>

                                    <Typography variant="body2" fontWeight={700} color="black">
                                        {formatPrice(product.price)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </RouterLink>
                    </div>
                ))}
            </div>
        </div>
    );
}
