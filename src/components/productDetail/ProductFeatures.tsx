import React from "react";
import { Card, Typography } from "@mui/material";

interface ProductFeaturesProps {
    features: string[];
}

export default function ProductFeatures({
                                            features
                                        }: ProductFeaturesProps) {
    if (!features || features.length === 0) {
        return null;
    }

    return (
        <div className="mt-4">
            <Typography variant="h5" className="mb-3">
                Đặc điểm nổi bật
            </Typography>

            <Card variant="outlined" sx={{ p: 2 }}>
                <ul className="list-unstyled mb-0">
                    {features.map((feature, idx) => (
                        <li key={idx} className="d-flex gap-2 py-2 align-items-start border-bottom">
                            <Typography sx={{ fontWeight: 700 }} color="text.primary">
                                ✓
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {feature}
                            </Typography>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}
