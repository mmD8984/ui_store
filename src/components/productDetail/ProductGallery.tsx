import { useState } from "react";
import { Card } from "@mui/material";

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductGallery({
                                           images,
                                           productName,
                                       }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    if (!images || images.length === 0) {
        return (
            <Card className="d-flex align-items-center justify-content-center" sx={{ height: 400 }}>
                <span>Không có hình ảnh</span>
            </Card>
        );
    }

    return (
        <div>
            {/* Main image */}
            <div className="mb-3">
                <Card>
                    <div style={{aspectRatio: "1 / 0.65", overflow: "hidden",}}>
                        <img
                            src={images[selectedIndex]}
                            alt={`${productName} ${selectedIndex + 1}`}
                            style={{width: "100%", height: "100%", objectFit: "contain", backgroundColor: "#f5f5f5", }}
                        />
                    </div>
                </Card>
            </div>

            {/* Thumbnails */}
            <div className="d-flex gap-2 flex-wrap">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedIndex(idx)}
                        className={`border rounded overflow-hidden p-0 ${selectedIndex === idx ? "border-primary" : "border-secondary"}`}
                        style={{width: 64, height: 64, cursor: "pointer",}}
                    >
                        <img
                            src={img}
                            alt={`${productName} thumbnail ${idx + 1}`}
                            style={{width: "100%", height: "100%", objectFit: "cover",}}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
