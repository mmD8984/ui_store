import React, {useState} from "react";
import { Link } from "react-router-dom";
import {AppBar, Toolbar, IconButton, Typography, Badge, Box, Container, Menu, MenuItem} from "@mui/material";
import {MenuIcon, ShoppingCart, User} from "lucide-react";
import SearchBar from "./SearchBar.tsx";
import { useCartStore } from "@/lib/cart-store.ts";
import { useAuth } from "@/contexts/useAuth";
import { logoutUser } from "../api/firebase-auth.api.ts";

const Header: React.FC = () => {
    const cartCount = useCartStore((state) => state.getTotalItems());
    const { user } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logoutUser();
        handleCloseMenu();
    };


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
                        {!user ? (
                            <IconButton color="inherit"  component={Link} to="/auth">
                                <User size={20} />
                            </IconButton>
                        ) : (
                            <IconButton color="inherit"
                                        onClick={handleOpenMenu}
                            >
                                <MenuIcon size={20} />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </Container>

            <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem component={Link} to="/account" onClick={handleCloseMenu}>
                    Thông tin cá nhân
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: "red", fontWeight: 600 }}>
                    Đăng xuất
                </MenuItem>
            </Menu>

            {/* Category Navigation */}
            <Box sx={{borderTop: 1, borderColor: "divider", py: 1, display: { xs: "none", md: "block" }, }}>
                {/* ✅ Dùng Container cùng maxWidth với AppBar để căn lề đều nhau */}
                <Container maxWidth="lg">
                    <Box display="flex" alignItems="center" gap={3}>
                        <Link to="/products?category=laptops" className="text-secondary text-decoration-none">
                            Laptop
                        </Link>
                        <Link to="/products?category=phones" className="text-secondary text-decoration-none">
                            Điện thoại
                        </Link>
                        <Link to="/products?category=headphones" className="text-secondary text-decoration-none">
                            Tai nghe
                        </Link>
                        <Link to="/products?category=watches" className="text-secondary text-decoration-none">
                            Đồng hồ
                        </Link>
                        <Link to="/products?category=cameras" className="text-secondary text-decoration-none">
                            Camera
                        </Link>
                        <Link to="/deals" className=" fw-medium text-decoration-none" style={{ color: "#FF0800" }}>
                            Khuyến mại
                        </Link>
                    </Box>
                </Container>
            </Box>
        </AppBar>
    );
};

export default Header;
