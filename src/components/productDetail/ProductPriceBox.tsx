import { Card, CardContent, Typography } from "@mui/material";
import type { ProductVariant } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";

interface ProductPriceBoxProps {
    variant: ProductVariant | null;
    quantity: number;
}

export default function ProductPriceBox({
                                            variant,
                                            quantity,
                                        }: ProductPriceBoxProps) {
    if (!variant) return null;

    const totalPrice = variant.price * quantity;
    const hasDiscount =
        typeof variant.originalPrice === "number" &&
        variant.originalPrice > variant.price;

    return (
        <Card variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: "#fafafa" }}>
            <CardContent sx={{ p: 0 }}>
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <Typography variant="h5" color="text.info" sx={{ fontWeight: 700 }}>
                            {formatPrice(variant.price)}
                        </Typography>

                        {hasDiscount && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                            >
                                {formatPrice(variant.originalPrice!)}
                            </Typography>
                        )}

                        <Typography variant="caption" color="text.secondary">
                            Miễn phí vận chuyển cho đơn hàng trên 5.000.000₫
                        </Typography>
                    </div>

                    <div className="text-end">
                        <Typography variant="caption" color="text.secondary">
                            Tổng tiền
                        </Typography>
                        <Typography variant="h4" color="error" sx={{ fontWeight: 700 }}>
                            {formatPrice(totalPrice)}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
