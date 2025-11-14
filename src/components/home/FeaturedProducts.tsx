import React from "react";
import ProductCard from "../../common/ProductCard.tsx";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import macbookpro from "../../assets/images/macbook-pro.png";
import ip15promax from "../../assets/images/iphone-15-pro-max.png";
import s24ultra from "../../assets/images/samsung-galaxy-s24-ultra.png";
import dellxps13 from "../../assets/images/dell-xps-13-laptop.jpg";
import donghori from "../../assets/images/dong-ho-orient-sk.jpg";
import taingheblt from "../../assets/images/tai-nghe-chup-tai-bowers-wilkins-px8.jpg";
import {Link} from "react-router-dom";
import {ArrowRight} from "lucide-react";

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

const products: Product[] = [
    {
        id: 1,
        name: 'MacBook Pro 14" M3',
        category: "Apple",
        price: 52990000,
        originalPrice: 59990000,
        rating: 4.8,
        reviews: 124,
        image: macbookpro,
    },
    {
        id: 2,
        name: "iPhone 15 Pro Max",
        category: "Apple",
        price: 34990000,
        originalPrice: 39990000,
        rating: 4.9,
        reviews: 137,
        image: ip15promax,
    },
    {
        id: 3,
        name: "Samsung Galaxy S24 Ultra",
        category: "Apple",
        price: 31990000,
        originalPrice: 35990000,
        rating: 4.7,
        reviews: 156,
        image: s24ultra,

    },
    {
        id: 4,
        name: "Dell XPS 13 Plus",
        category: "Apple",
        price: 28990000,
        originalPrice: 32990000,
        rating: 4.6,
        reviews: 78,
        image: dellxps13,

    },
    {
        id: 5,
        name: "ORIENT SK 41.7 mm Nam",
        category: "Apple",
        price: 7890000,
        originalPrice: 32990000,
        rating: 4.6,
        reviews: 78,
        image: donghori,

    },
    {
        id: 6,
        name: "Bowers & Wilkins PX8",
        category: "Apple",
        price: 15695000,
        originalPrice: 16200000,
        rating: 4.9,
        reviews: 12,
        image: taingheblt,
    },
    {
        id: 7,
        name: "Bowers & Wilkins PX8",
        category: "Apple",
        price: 15695000,
        originalPrice: 16200000,
        rating: 4.9,
        reviews: 12,
        image: taingheblt,
    },
    {
        id: 8,
        name: "Bowers & Wilkins PX8",
        category: "Apple",
        price: 15695000,
        originalPrice: 16200000,
        rating: 4.9,
        reviews: 12,
        image: taingheblt,
    },
];

const FeaturedProducts: React.FC = () => {
    return (
        <Box component="section" sx={{ py: 8, backgroundColor: "background.default" }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2} className="mb-5">
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold", color: "common.black" }}>
                            Sản phẩm nổi bật
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary" }}>
                            Những sản phẩm được yêu thích nhất
                        </Typography>
                    </Box>
                </Stack>

                {/* Product grid (dùng Bootstrap) */}
                <div className="row g-4">
                    {products.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
                            <Link key={product.id} to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <ProductCard product={product} />
                            </Link>
                        </div>
                    ))}
                </div>
                <Box sx={{ textAlign: "center" }}>
                    <Button component={Link} to="/products" variant="contained" size="large" sx={{fontWeight: 500, textTransform: "none", px: 3, py: 1.5, color: "common.black", bgcolor: "common.white", "&:hover": {color: "common.white", bgcolor: "common.black"}}}>
                        Xem tất cả sản phẩm
                        <ArrowRight style={{ marginLeft: 8, width: 18, height: 18 }} />
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default FeaturedProducts;
