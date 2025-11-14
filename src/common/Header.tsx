import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Badge, Box, Container } from "@mui/material";
import { ShoppingCart, User, Menu } from "lucide-react";
import SearchBar from "./SearchBar.tsx";
import { useCartStore } from "@/lib/cart-store.ts";

const Header: React.FC = () => {
    const cartCount = useCartStore((state) => state.getTotalItems());

    return (
        <AppBar position="sticky" color="default" elevation={2} sx={{ backdropFilter: "blur(8px)", bgcolor: "rgba(255,255,255,0.9)" }}>
            <Container maxWidth="lg">
                <Toolbar sx={{position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", px: 0,}}>
                    {/* Logo — dịch sang phải cùng độ lệch với chữ "Laptop" */}
                    <Box display="flex" alignItems="center" gap={1} sx={{ ml: 0 }}>
                        <Link to="/" className="d-flex align-items-center text-decoration-none text-dark">
                            <Box sx={{bgcolor: "common.black", width: 64, height: 32, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",}}>
                                <Typography variant="subtitle1" sx={{ color: "yellow", fontWeight: "bold" }}>
                                    Van Ha
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1, display: { xs: "none", sm: "block" } }}>
                                Store
                            </Typography>
                        </Link>
                    </Box>

                    {/* Search Bar — nằm giữa tuyệt đối */}
                    <Box
                        sx={{position: "absolute", left: "50%", transform: "translateX(-50%)", width: { xs: "60%", sm: "50%", md: "40%" },}}>
                        <SearchBar />
                    </Box>

                    {/* Actions */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <IconButton color="inherit" component={Link} to="/cart">
                            <Badge badgeContent={cartCount} color="primary">
                                <ShoppingCart size={20} />
                            </Badge>
                        </IconButton>

                        <IconButton color="inherit" sx={{ display: { xs: "none", md: "inline-flex" } }}>
                            <User size={20} />
                        </IconButton>

                        <IconButton color="inherit" sx={{ display: { md: "none" } }}>
                            <Menu size={20} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>

            {/* Category Navigation */}
            <Box sx={{borderTop: 1, borderColor: "divider", py: 1, display: { xs: "none", md: "block" }, }}>
                {/* ✅ Dùng Container cùng maxWidth với AppBar để căn lề đều nhau */}
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center" gap={3}>
                        <Link to="/category/laptops" className="text-secondary text-decoration-none">
                            Laptop
                        </Link>
                        <Link to="/category/smartphones" className="text-secondary text-decoration-none">
                            Điện thoại
                        </Link>
                        <Link to="/category/tablets" className="text-secondary text-decoration-none">
                            Tai nghe
                        </Link>
                        <Link to="/category/accessories" className="text-secondary text-decoration-none">
                            Đồng hồ
                        </Link>
                        <Link to="/category/audio" className="text-secondary text-decoration-none">
                            Camera
                        </Link>
                        <Link to="/deals" className="text-danger fw-medium text-decoration-none">
                            Khuyến mãi
                        </Link>
                    </Box>
                </Container>
            </Box>
        </AppBar>
    );
};

export default Header;
