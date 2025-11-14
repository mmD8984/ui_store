import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Button,
    Chip,
    Box,
    Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN").format(Number(price)) + "đ";

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                },
                position: "relative",
            }}
            className="mb-4"
        >
            {/* Hình ảnh sản phẩm */}
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={product.image || "/placeholder.svg"}
                    alt={product.name}
                    sx={{ objectFit: "cover" }}
                />

                {/* Nhãn giảm giá */}
                <Chip
                    label={product.category}
                    sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        bgcolor: "#0dcaf0",
                        color: "white",
                        fontWeight: 500,
                    }}
                    size="small"
                />

                {/* Nút yêu thích */}
                <IconButton
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        bgcolor: "white",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "#f8f9fa" },
                    }}
                >
                    <FavoriteBorderIcon color="error" />
                </IconButton>
            </Box>

            {/* Nội dung sản phẩm */}
            <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ lineHeight: 1.4 }}
                >
                    {product.name}
                </Typography>

                {/* Đánh giá */}
                <Box display="flex" alignItems="center" mb={1}>
                    <Rating
                        name="read-only"
                        value={product.rating}
                        precision={0.1}
                        size="small"
                        readOnly
                    />
                    <Typography variant="body2" color="text.secondary" ml={1}>
                        ({product.reviews} đánh giá)
                    </Typography>
                </Box>

                {/* Giá */}
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Typography variant="h6" color="error" fontWeight="bold">
                        {formatPrice(product.price)}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                    >
                        {formatPrice(product.originalPrice)}
                    </Typography>
                </Box>

                {/* Nút thêm vào giỏ */}
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                        borderRadius: 2,
                        fontWeight: 500,
                        mt: "auto",
                        backgroundColor: "#000",
                        "&:hover": {
                            backgroundColor: "#333",   // nền khi hover
                        },
                    }}
                >
                    Thêm vào giỏ hàng
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
