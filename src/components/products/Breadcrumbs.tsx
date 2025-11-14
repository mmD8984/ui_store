import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface BreadcrumbsProductProps {
    category?: string;     // ví dụ: "Điện thoại", "Laptop"
    productName?: string;  // ví dụ: "Dell-HP-2025"
}

const BreadcrumbsProduct: React.FC<BreadcrumbsProductProps> = ({ category, productName }) => {
    return (
        <div className="bg-light border-bottom">
            <div className="container">
                <div className="py-3 d-flex align-items-center gap-2">
                    <Breadcrumbs aria-label="breadcrumb" separator="">
                        {/* Luôn có Trang chủ */}
                        <RouterLink to="/" className="text-muted text-decoration-none">
                            Trang chủ
                        </RouterLink>
                        <ChevronRightIcon fontSize="small" />
                        {/* Nếu có category */}
                        {category && !productName && (
                            <Typography color="text.primary">{category}</Typography>
                        )}
                        {/* Trang chi tiết sản phẩm: luôn có category + productName */}
                        {category && productName && (
                            <div className='d-flex align-items-center gap-2'>
                                <RouterLink to={`/products?category=${category}`} className="text-muted text-decoration-none">
                                    {category}
                                </RouterLink>
                                <ChevronRightIcon fontSize="small" />
                                <Typography color="text.primary">{productName}</Typography>
                            </div>
                        )}
                        {/* Trường hợp danh sách tất cả sản phẩm */}
                        {!category && !productName && (
                            <Typography color="text.primary">Tất cả sản phẩm</Typography>
                        )}
                    </Breadcrumbs>
                </div>
            </div>
        </div>
    );
};

export default BreadcrumbsProduct;
