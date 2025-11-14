// ProductDetail.tsx
import React, { useState, useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    Button as MuiButton,
    IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AutorenewIcon from "@mui/icons-material/Autorenew";


import Header from "@/common/Header.tsx";
import Footer from "@/common/Footer.tsx";
import Breadcrumbs from "@/components/products/Breadcrumbs.tsx";

import macbookpro from "../assets/images/macbook-pro.png";
import ip15promax from "../assets/images/iphone-15-pro-max.png";
import taingheblt from "../assets/images/tai-nghe-chup-tai-bowers-wilkins-px8.jpg";

interface Spec {
    label: string;
    value: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    stock: number;
    description: string;
    specs: Spec[];
    features: string[];
    originalPrice?: number;
}

const products: Record<number, Product> = {
    1: {
        id: 1,
        name: 'MacBook Pro 16"',
        price: 45900000,
        image: macbookpro,
        category: "Laptop",
        rating: 4.8,
        reviews: 128,
        stock: 15,
        description:
            "MacBook Pro với chip M3 Max là lựa chọn hoàn hảo cho các chuyên gia. Với màn hình Liquid Retina XDR, bàn phím Magic Keyboard đầy đủ và cải thiện thời lượng pin lên đến 18 giờ.",
        specs: [
            { label: "Chip", value: "Apple M3 Max" },
            { label: "Màn hình", value: '16" Liquid Retina XDR' },
            { label: "RAM", value: "36GB Unified Memory" },
            { label: "Lưu trữ", value: "1TB SSD" },
            { label: "Pin", value: "Lên đến 18 giờ" },
            { label: "Trọng lượng", value: "2.1 kg" },
        ],
        features: [
            "Hiệu suất cực kỳ nhanh với chip M3 Max",
            "Màn hình Liquid Retina XDR tuyệt đẹp",
            "Pin kéo dài 18 giờ cho cả ngày làm việc",
            "Cổng Thunderbolt 3 x3 để kết nối",
            "Bộ âm thanh cao cấp với 6 loa",
            "Mặt lưng được chế tạo từ nhôm nguyên khối",
        ],
        originalPrice: 59990000,
    },
    2: {
        id: 2,
        name: "iPhone 15 Pro",
        price: 29990000,
        image: ip15promax,
        category: "Điện thoại",
        rating: 4.9,
        reviews: 256,
        stock: 32,
        description:
            "iPhone 15 Pro mang đến trải nghiệm quay phim chuyên nghiệp với camera chính 48MP. Được trang bị chip A17 Pro, titanium, và Dynamic Island.",
        specs: [
            { label: "Màn hình", value: '6.1" Super Retina XDR' },
            { label: "Chip", value: "A17 Pro" },
            { label: "Camera", value: "48MP chính + 12MP siêu rộng" },
            { label: "Pin", value: "Lên đến 29 giờ" },
            { label: "Chống nước", value: "IP68" },
            { label: "Kích thước", value: "147.6 x 70.6 x 8.25 mm" },
        ],
        features: [
            "Camera 48MP cải thiện với zoom quang học 3x",
            "Quay phim 4K ở tất cả các độ phân giải và tốc độ khung hình",
            "Titanium design bền bỉ và nhẹ",
            "Chip A17 Pro mạnh mẽ nhất trên điện thoại",
            "Dynamic Island thông minh",
            "Sạc nhanh 20W lên đến 50% trong 30 phút",
        ],
        originalPrice: 39990000,
    },
    3: {
        id: 3,
        name: "iPad Air",
        price: 18990000,
        image: macbookpro,
        category: "Máy tính bảng",
        rating: 4.7,
        reviews: 89,
        stock: 22,
        description:
            "iPad Air kết hợp năng lực mạnh mẽ của chip M1 với màn hình Liquid Retina 10.9 inch đẹp mắt. Hỗ trợ Apple Pencil và Magic Keyboard.",
        specs: [
            { label: "Màn hình", value: "10.9 inch Liquid Retina" },
            { label: "Chip", value: "Apple M1" },
            { label: "RAM", value: "8GB" },
            { label: "Lưu trữ", value: "128GB" },
            { label: "Camera", value: "12MP + 12MP Ultra Wide" },
            { label: "Pin", value: "Lên đến 10 giờ" },
        ],
        features: [
            "Màn hình Liquid Retina 10.9 inch tuyệt đẹp",
            "Chip M1 cung cấp năng lực chuyên nghiệp",
            "Hỗ trợ Apple Pencil (thế hệ 2)",
            "Magic Keyboard tùy chọn để tăng năng suất",
            "8 loa lập thể cho âm thanh tuyệt vời",
            "Ghi âm video 4K ở 60fps",
        ],
        originalPrice: 23990000,
    },
    4: {
        id: 4,
        name: "AirPods Max",
        price: 14990000,
        image: taingheblt,
        category: "Phụ kiện",
        rating: 4.6,
        reviews: 154,
        stock: 18,
        description:
            "AirPods Max mang lại âm thanh không gian thích ứng sống động. Với khung nhôm tinh tế và thời lượng pin lên đến 20 giờ.",
        specs: [
            { label: "Loại tai nghe", value: "Over-ear" },
            { label: "Loại âm thanh", value: "Âm thanh không gian thích ứng" },
            { label: "Khử tiếng ồn", value: "Chủ động (ANC)" },
            { label: "Pin", value: "Lên đến 20 giờ" },
            { label: "Trọng lượng", value: "384.8g" },
            { label: "Vật liệu", value: "Nhôm, Lưới thép, Vải dệt" },
        ],
        features: [
            "Âm thanh không gian thích ứng sống động",
            "Khử tiếng ồn chủ động (ANC) mạnh mẽ",
            "Pin 20 giờ và sạc trong hộp",
            "Điều khiển cảm ứng trực quan",
            "Chuyển đổi âm thanh thông minh giữa thiết bị",
            "Tích hợp Siri cho điều khiển bằng giọng nói",
        ],
        originalPrice: 18990000,
    },
    // you can extend more products here...
};

function formatPrice(price: number) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(price);
}

const ProductDetailPage: React.FC = () => {
    const params = useParams<{ id?: string }>();
    const rawId = params.id ?? "";
    const id = Number.parseInt(rawId || "0", 10);
    const product = products[id];

    const [quantity, setQuantity] = useState<number>(1);
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const relatedIds = useMemo(() => {
        // pick other product ids for related section
        return Object.keys(products)
            .map((k) => Number(k))
            .filter((pid) => pid !== id)
            .slice(0, 4);
    }, [id]);

    if (!product) {
        return (
            <div className="d-flex flex-column min-vh-100">
                <Header />

                <main className="flex-fill d-flex align-items-center justify-content-center">
                    <div className="text-center p-4">
                        <Typography variant="h5" gutterBottom>
                            Sản phẩm không tìm thấy
                        </Typography>
                        <MuiButton component={RouterLink} to="/products" variant="contained">
                            Quay lại danh sách sản phẩm
                        </MuiButton>
                    </div>
                </main>

                <footer className="py-3 bg-light mt-auto">
                    <div className="container text-center">© My Shop</div>
                </footer>
            </div>
        );
    }

    const totalPrice = product.price * quantity;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <main className="flex-fill">
                <Breadcrumbs category={product.category} productName={product.name}/>

                <div className="container py-5">
                    <div className="row">
                        {/* Left - Images */}
                        <div className="col-md-6 mb-4">
                            <div className="mb-3">
                                <Card>
                                    <div style={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </div>
                                </Card>
                            </div>

                            <div className="d-flex gap-2">
                                {/* For demo we only have one image; if you have more, map them */}
                                {[product.image].map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`border rounded overflow-hidden p-0 ${selectedImageIndex === idx ? "border-primary" : "border-secondary"}`}
                                        style={{ width: 64, height: 64, padding: 0 }}
                                    >
                                        <img src={img} alt={`${product.name} ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right - Details */}
                        <div className="col-md-6">
                            <div className="mb-2">
                                <span className="badge bg-primary text-white">{product.category}</span>
                            </div>

                            <Typography variant="h4" component="h1" className="mb-3">
                                {product.name}
                            </Typography>

                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div>
                                    {/* simple star rendering */}
                                    <div>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i} style={{ fontSize: 20, color: i < Math.floor(product.rating) ? "#f6c85f" : "#ddd" }}>
                        ★
                      </span>
                                        ))}
                                    </div>
                                </div>
                                <Typography variant="body2" color="textSecondary">
                                    ({product.reviews} nhận xét)
                                </Typography>
                                <Typography variant="body2" className="ms-3" sx={{ fontWeight: 600, color: product.stock > 10 ? "green" : "orange" }}>
                                    {product.stock > 10 ? "Còn hàng" : `Chỉ còn ${product.stock} chiếc`}
                                </Typography>
                            </div>

                            <Typography variant="body1" color="textSecondary" paragraph>
                                {product.description}
                            </Typography>

                            <Card variant="outlined" className="mb-3" sx={{ p: 2 }}>
                                <CardContent className="p-0">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                                {formatPrice(product.price)}
                                            </Typography>
                                            {product.originalPrice && (
                                                <Typography variant="body2" color="textSecondary" sx={{ textDecoration: "line-through" }}>
                                                    {formatPrice(product.originalPrice)}
                                                </Typography>
                                            )}
                                            <Typography variant="caption" color="textSecondary">
                                                Miễn phí vận chuyển cho đơn hàng trên 5 triệu đồng
                                            </Typography>
                                        </div>
                                        <div className="text-end">
                                            <Typography variant="caption" color="textSecondary">
                                                Tổng: {formatPrice(totalPrice)}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quantity and actions */}
                            <div className="mb-3">
                                <div className="d-flex align-items-center gap-3 mb-2">
                                    <label className="me-2 mb-0" style={{ fontWeight: 600 }}>
                                        Số lượng:
                                    </label>
                                    <div className="d-flex align-items-center border rounded">
                                        <button
                                            className="btn btn-sm"
                                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        >
                                            −
                                        </button>
                                        <div style={{ minWidth: 48, textAlign: "center" }}>{quantity}</div>
                                        <button
                                            className="btn btn-sm"
                                            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex gap-2 mb-2">
                                    <MuiButton variant="contained" size="large" fullWidth>
                                        Thêm vào giỏ hàng
                                    </MuiButton>
                                    <IconButton
                                        color={isWishlisted ? "error" : "default"}
                                        onClick={() => setIsWishlisted((s) => !s)}
                                        aria-label="wishlist"
                                        sx={{ border: "1px solid", borderColor: isWishlisted ? "error.main" : "divider" }}
                                    >
                                        {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                    </IconButton>
                                </div>

                                <MuiButton variant="outlined" fullWidth startIcon={<ShareIcon />}>
                                    Chia sẻ
                                </MuiButton>
                            </div>

                            {/* Benefits */}
                            <div className="mt-4">
                                <div className="d-flex gap-3 mb-3 align-items-start">
                                    <LocalShippingIcon color="primary" />
                                    <div>
                                        <Typography variant="subtitle2">Giao hàng nhanh</Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            Giao trong 2-3 ngày làm việc
                                        </Typography>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 mb-3 align-items-start">
                                    <VerifiedUserIcon color="primary" />
                                    <div>
                                        <Typography variant="subtitle2">Bảo hành chính hãng</Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            Bảo hành 12-24 tháng tùy sản phẩm
                                        </Typography>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 align-items-start">
                                    <AutorenewIcon color="primary" />
                                    <div>
                                        <Typography variant="subtitle2">Đổi trả dễ dàng</Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            30 ngày đổi trả không cần lý do
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs: Specs & Features */}
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <Typography variant="h5" className="mb-3">
                                Thông số kỹ thuật
                            </Typography>
                            <Card variant="outlined" sx={{ p: 2 }}>
                                <div>
                                    {product.specs.map((spec, idx) => (
                                        <div key={idx} className="d-flex justify-content-between py-2 border-bottom">
                                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                {spec.label}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {spec.value}
                                            </Typography>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        <div className="col-md-6">
                            <Typography variant="h5" className="mb-3">
                                Đặc điểm nổi bật
                            </Typography>
                            <Card variant="outlined" sx={{ p: 2 }}>
                                <ul className="list-unstyled mb-0">
                                    {product.features.map((f, idx) => (
                                        <li key={idx} className="d-flex gap-2 py-2 align-items-start border-bottom">
                                            <Typography color="primary" sx={{ fontWeight: 700 }}>
                                                ✓
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {f}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    </div>

                    {/* Related products */}
                    <div className="mt-5">
                        <Typography variant="h5" className="mb-3">
                            Sản phẩm liên quan
                        </Typography>
                        <div className="row g-3">
                            {relatedIds.map((rid) => {
                                const rp = products[rid];
                                if (!rp) return null;
                                return (
                                    <div className="col-6 col-md-3" key={rp.id}>
                                        <RouterLink to={`/products/${rp.id}`} className="text-decoration-none">
                                            <Card className="h-100">
                                                <div style={{ height: 160, overflow: "hidden" }}>
                                                    <img src={rp.image} alt={rp.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                                </div>
                                                <CardContent>
                                                    <Typography variant="subtitle2" className="mb-2">
                                                        {rp.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>
                                                        {formatPrice(rp.price)}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </RouterLink>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetailPage;
