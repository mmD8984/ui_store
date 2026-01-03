import React from "react";
import { Card, Typography } from "@mui/material";

export interface ProductSpec {
    label: string;
    value: string;
}

interface ProductSpecsProps {
    specs: ProductSpec[];
}

export default function ProductSpecs({
                                         specs
                                     }: ProductSpecsProps) {
    if (!specs || specs.length === 0) {
        return null;
    }

    return (
        <div className="mt-4">
            <Typography variant="h5" className="mb-3">
                Thông số kỹ thuật
            </Typography>

            <Card variant="outlined" sx={{ p: 2 }}>
                {specs.map((spec, idx) => (
                    <div key={idx} className="d-flex justify-content-between py-2 border-bottom">
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {spec.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {spec.value}
                        </Typography>
                    </div>
                ))}
            </Card>
        </div>
    );
}
