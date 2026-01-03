import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";
import { ShieldCheck, Truck, RefreshCcw, CreditCard } from "lucide-react";

interface BenefitItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const BENEFITS: BenefitItem[] = [
    {
        icon: <ShieldCheck size={20} />,
        title: "Bảo hành chính hãng",
        description: "Bảo hành 12 tháng tại trung tâm ủy quyền"
    },
    {
        icon: <Truck size={20} />,
        title: "Giao hàng nhanh",
        description: "Giao hàng toàn quốc từ 1–3 ngày"
    },
    {
        icon: <RefreshCcw size={20} />,
        title: "Đổi trả dễ dàng",
        description: "Đổi mới trong 7 ngày nếu lỗi kỹ thuật"
    },
    {
        icon: <CreditCard size={20} />,
        title: "Thanh toán linh hoạt",
        description: "Hỗ trợ COD, chuyển khoản, trả góp"
    }
];

export default function ProductBenefits() {
    return (
        <Box sx={{border: "1px solid #e0e0e0", borderRadius: 2, p: 2, backgroundColor: "#fafafa"}}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                Quyền lợi khi mua sản phẩm
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
                {BENEFITS.map((item, index) => (
                    <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                        <Box sx={{mt: "2px", color: "text.primary"}}>
                            {item.icon}
                        </Box>
                        <Box>
                            <Typography variant="body1" fontWeight={500}>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>
                        </Box>
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
}
