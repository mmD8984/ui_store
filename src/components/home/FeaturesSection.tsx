import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Box, Typography, Paper } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: <LocalShippingIcon fontSize="medium" />,
            title: "Miễn phí vận chuyển",
            description: "Cho đơn hàng từ 500.000đ",
        },
        {
            icon: <SecurityIcon fontSize="medium" />,
            title: "Bảo hành chính hãng",
            description: "Đổi trả trong 30 ngày",
        },
        {
            icon: <HeadsetMicIcon fontSize="medium" />,
            title: "Hỗ trợ 24/7",
            description: "Tư vấn nhiệt tình",
        },
    ];

    return (
        <Box sx={{borderTop: 1, borderBottom: 1, borderColor: "divider", bgcolor: "rgba(0,0,0,0.02)", px: 18 , py: 6,}}>
            {/* Giữ nguyên .container để khớp với lề của danh mục trong Header */}
            <div className="container">
                <Row className="gy-4">
                    {features.map((feature, index) => (
                        <Col key={index} md={4}>
                            <Paper elevation={0} sx={{display: "flex", alignItems: "flex-start", gap: 2, bgcolor: "transparent", boxShadow: "none",}}>
                                {/* Icon */}
                                <Box sx={{width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 2, bgcolor: "common.black", color: "white", flexShrink: 0,}}>
                                    {feature.icon}
                                </Box>

                                {/* Text */}
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Col>
                    ))}
                </Row>
            </div>
        </Box>
    );
};

export default FeaturesSection;
