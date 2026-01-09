import { useEffect, useMemo, useState } from "react";
import { Typography, Chip, Box } from "@mui/material";
import type { ProductVariant } from "@/types/product";


interface ProductInfoProps {
    name: string;
    categorySlug: string;
    rating: number;
    reviews: number;
    description: string;
    variants: ProductVariant[];
    onVariantChange?: (variant: ProductVariant) => void;
}

export default function ProductInfo({
                                        name,
                                        categorySlug,
                                        rating,
                                        reviews,
                                        description,
                                        variants,
                                        onVariantChange,
                                    }: ProductInfoProps) {

    const isDeviceCategory =
        categorySlug === "laptops" || categorySlug === "phones";

    /** ===== Extract options (lọc null an toàn) ===== */
    const colors = useMemo(
        () =>
            Array.from(
                new Set(
                    variants
                        .map(v => v.color)
                        .filter((c): c is string => !!c)
                )
            ),
        [variants]
    );

    const rams = useMemo(
        () =>
            isDeviceCategory
                ? Array.from(
                    new Set(
                        variants
                            .map(v => v.ram)
                            .filter((r): r is string => !!r)
                    )
                )
                : [],
        [variants, isDeviceCategory]
    );

    const storages = useMemo(
        () =>
            isDeviceCategory
                ? Array.from(
                    new Set(
                        variants
                            .map(v => v.storage)
                            .filter((s): s is string => !!s)
                    )
                )
                : [],
        [variants, isDeviceCategory]
    );

    /** ===== Selected state ===== */
    const [selectedColor, setSelectedColor] = useState<string | undefined>(
        colors[0]
    );

    const [selectedRam, setSelectedRam] = useState<string | undefined>(
        rams[0]
    );

    const [selectedStorage, setSelectedStorage] = useState<string | undefined>(
        storages[0]
    );

    /** ===== Sync selected option khi data đổi ===== */
    useEffect(() => {
        setSelectedColor(colors[0]);
        setSelectedRam(rams[0]);
        setSelectedStorage(storages[0]);
    }, [colors, rams, storages]);

    /** ===== Find current variant ===== */
    const selectedVariant = useMemo(() => {
        return variants.find(v =>
            (!selectedColor || v.color === selectedColor) &&
            (!isDeviceCategory || !selectedRam || v.ram === selectedRam) &&
            (!isDeviceCategory || !selectedStorage || v.storage === selectedStorage)
        );
    }, [
        variants,
        selectedColor,
        selectedRam,
        selectedStorage,
        isDeviceCategory,
    ]);

    useEffect(() => {
        if (selectedVariant && onVariantChange) {
            onVariantChange(selectedVariant);
        }
    }, [selectedVariant, onVariantChange]);

    const stock = selectedVariant?.stock ?? 0;
    const isInStock = stock > 0;

    return (
        <div>
            {/* ===== Product name ===== */}
            <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                {name}
            </Typography>

            {/* ===== Rating & stock ===== */}
            <div className="d-flex align-items-center gap-3 mb-3">
                <div>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span
                            key={i}
                            style={{
                                fontSize: 20,
                                color: i < Math.round(rating) ? "#f6c85f" : "#ddd",
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <Typography variant="body2">
                    ({reviews} đánh giá)
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 600,
                        color: isInStock
                            ? stock > 10
                                ? "green"
                                : "orange"
                            : "red",
                    }}
                >
                    {isInStock
                        ? stock > 10
                            ? "Còn hàng"
                            : `Chỉ còn ${stock} sản phẩm`
                        : "Hết hàng"}
                </Typography>
            </div>

            {/* ===== Color ===== */}
            {colors.length > 0 && (
                <Box mb={2}>
                    <Typography fontWeight={600}>Màu sắc</Typography>

                    {colors.length === 1 ? (
                        <Typography mt={1}>{colors[0]}</Typography>
                    ) : (
                        <Box display="flex" gap={1} mt={1}>
                            {colors.map(color => (
                                <Chip
                                    key={color}
                                    label={color}
                                    clickable
                                    color={
                                        color === selectedColor
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => setSelectedColor(color)}
                                    sx={{
                                        backgroundColor: color === selectedColor ? '#0dcaf0' : undefined,
                                        color: color === selectedColor ? '#fff' : undefined,
                                        '&:hover': {
                                            backgroundColor: color === selectedColor ? '#0dcaf0' : undefined,
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            )}

            {/* ===== RAM ===== */}
            {isDeviceCategory && rams.length > 0 && (
                <Box mb={2}>
                    <Typography fontWeight={600}>RAM</Typography>

                    {rams.length === 1 ? (
                        <Typography mt={1}>{rams[0]}</Typography>
                    ) : (
                        <Box display="flex" gap={1} mt={1}>
                            {rams.map(ram => (
                                <Chip
                                    key={ram}
                                    label={ram}
                                    clickable
                                    color={
                                        ram === selectedRam
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => setSelectedRam(ram)}
                                    sx={{
                                        backgroundColor: ram === selectedRam ? '#0dcaf0' : undefined,
                                        color: ram === selectedRam ? '#fff' : undefined,
                                        '&:hover': {
                                            backgroundColor: ram === selectedRam ? '#0dcaf0' : undefined,
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            )}

            {/* ===== Storage ===== */}
            {isDeviceCategory && storages.length > 0 && (
                <Box mb={2}>
                    <Typography fontWeight={600}>Bộ nhớ</Typography>

                    {storages.length === 1 ? (
                        <Typography mt={1}>{storages[0]}</Typography>
                    ) : (
                        <Box display="flex" gap={1} mt={1}>
                            {storages.map(storage => (
                                <Chip
                                    key={storage}
                                    label={storage}
                                    clickable
                                    color={
                                        storage === selectedStorage
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => setSelectedStorage(storage)}
                                    sx={{
                                        backgroundColor: storage === selectedStorage ? '#0dcaf0' : undefined,
                                        color: storage === selectedStorage ? '#fff' : undefined,
                                        '&:hover': {
                                            backgroundColor: storage === selectedStorage ? '#0dcaf0' : undefined,
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>
            )}

            {/* ===== Description ===== */}
            <Typography variant="body1" color="text.secondary">
                {description}
            </Typography>
        </div>
    );
}
