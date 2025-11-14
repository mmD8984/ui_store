import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
    return (
        <Box component="section" sx={{position: "relative", background: "linear-gradient(to bottom right, rgba(25,118,210,0.1), rgba(255,255,255,1), rgba(0,200,255,0.1))", py: { xs: 10, md: 16 }, textAlign: "center",}}>
            <Container maxWidth="md">
                {/* Tiêu đề */}
                <Typography variant="h3" component="h1" fontWeight="bold" sx={{mb: 3, lineHeight: 1.3, "@media (min-width:600px)": { fontSize: "3.5rem" },}}>
                    Công nghệ hàng đầu cho cuộc sống hiện đại
                </Typography>

                {/* Mô tả */}
                <Typography variant="h6" color="text.secondary" sx={{mb: 5, lineHeight: 1.6, px: { xs: 1, sm: 4 },}}>
                    Khám phá bộ sưu tập laptop, smartphone và phụ kiện công nghệ chính hãng
                    với giá tốt nhất thị trường
                </Typography>

                {/* Nút hành động */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" alignItems="center">
                    <Button component={Link} to="/products" variant="contained" size="large" sx={{fontWeight: 500, textTransform: "none", px: 3, py: 1.5, bgcolor: "common.black", "&:hover": {bgcolor: "#222",}}}>
                        Khám phá ngay
                        <ArrowRight style={{ marginLeft: 8, width: 18, height: 18 }} />
                    </Button>

                    <Button component={Link} to="/deals" variant="outlined" size="large" sx={{fontWeight: 500, textTransform: "none", px: 3, py: 1.5, color: "common.black", borderColor: "common.black",}}>
                        Ưu đãi hot
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default HeroSection;
