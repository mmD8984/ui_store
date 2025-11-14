import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, Mail, Phone, MapPin } from "lucide-react"
import logo from "../assets/images/logo.png";
import {Box, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer style={{backgroundColor: "#212529", color: "white", padding: "60px 0 20px",}}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px", marginBottom: "40px",}}>
                    {/* Company Info */}
                    <div>
                        <Link to="/" className="d-flex align-items-center text-decoration-none text-light">
                            <Box sx={{bgcolor: "common.black", width:64 , height: 32, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",}}>
                                <Typography variant="subtitle1" sx={{ color: "yellow", fontWeight: "bold" }}>
                                    Van Ha
                                </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1, display: { xs: "none", sm: "block" } }}>
                                Store
                            </Typography>
                        </Link>
                        <p style={{color: "#adb5bd", marginBottom: "20px", lineHeight: "1.6",}}>
                            Cửa hàng công nghệ hàng đầu Việt Nam, chuyên cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất
                            thị trường.
                        </p>
                        <div style={{ display: "flex", gap: "15px" }}>
                            {[FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon].map((Icon, index) => (
                                <a key={index} href="#" style={{color: "#adb5bd", transition: "color 0.2s ease",}}>
                                    <Icon style={{ width: "20px", height: "20px" }} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5
                            style={{fontWeight: "bold", marginBottom: "15px", fontSize: "18px",}}>
                            Liên kết
                        </h5>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {["Về chúng tôi", "Sản phẩm", "Khuyến mãi", "Tin tức", "Liên hệ"].map((item, index) => (
                                <li key={index} style={{ marginBottom: "8px" }}>
                                    <a
                                        href="#"
                                        style={{
                                            color: "#adb5bd",
                                            textDecoration: "none",
                                            transition: "color 0.2s ease",
                                        }}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h5
                            style={{
                                fontWeight: "bold",
                                marginBottom: "15px",
                                fontSize: "18px",
                            }}
                        >
                            Danh mục
                        </h5>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {["Laptop", "Smartphone", "Tai nghe", "Smartwatch", "Phụ kiện"].map((item, index) => (
                                <li key={index} style={{ marginBottom: "8px" }}>
                                    <a
                                        href="#"
                                        style={{
                                            color: "#adb5bd",
                                            textDecoration: "none",
                                            transition: "color 0.2s ease",
                                        }}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h5
                            style={{
                                fontWeight: "bold",
                                marginBottom: "15px",
                                fontSize: "18px",
                            }}
                        >
                            Liên hệ
                        </h5>
                        <ul
                            style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            <li
                                style={{
                                    marginBottom: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <Phone style={{ width: "16px", height: "16px", color: "#adb5bd" }} />
                                <span style={{ color: "#adb5bd", fontSize: "14px" }}>1900 1234</span>
                            </li>
                            <li
                                style={{
                                    marginBottom: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <Mail style={{ width: "16px", height: "16px", color: "#adb5bd" }} />
                                <span style={{ color: "#adb5bd", fontSize: "14px" }}>info@techstore.vn</span>
                            </li>
                            <li
                                style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "8px",
                                }}
                            >
                                <MapPin style={{ width: "16px", height: "16px", color: "#adb5bd", marginTop: "2px" }} />
                                <span style={{ color: "#adb5bd", fontSize: "14px" }}>123 Đường ABC, Quận 1, TP.HCM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    style={{
                        borderTop: "1px solid #495057",
                        paddingTop: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "15px",
                    }}
                >
                    <p
                        style={{
                            color: "#adb5bd",
                            fontSize: "14px",
                            margin: 0,
                        }}
                    >
                        © 2025 TechStore. Tất cả quyền được bảo lưu.
                    </p>
                    <div style={{ display: "flex", gap: "20px" }}>
                        {["Điều khoản sử dụng", "Chính sách bảo mật", "Sitemap"].map((item, index) => (
                            <a
                                key={index}
                                href="#"
                                style={{
                                    color: "#adb5bd",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    transition: "color 0.2s ease",
                                }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;