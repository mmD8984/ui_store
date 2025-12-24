import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Slider
} from "@mui/material";
import { FilterList } from "@mui/icons-material";

interface FiltersProps {
    selectedCategory: string;
    categories: string[];
    priceRange: number[];
    onCategoryChange: (categoryName: string) => void;
    onPriceChange: (range: number[]) => void;
}

const Filters: React.FC<FiltersProps> = ({
                                             selectedCategory,
                                             categories,
                                             priceRange,
                                             onCategoryChange,
                                             onPriceChange
                                         }) => {

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(price);

    return (
        <div>
            {/* Danh mục */}
            <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" className="d-flex align-items-center gap-2 mb-3">
                        <FilterList fontSize="small" /> Danh mục
                    </Typography>

                    {categories.map((catName) => (
                        <Button
                            key={catName}
                            variant={selectedCategory === catName ? "contained" : "outlined"}
                            fullWidth
                            sx={{
                                mb: 1,
                                textTransform: "none",
                                color: selectedCategory === catName ? "#fff" : "#000",
                                backgroundColor: selectedCategory === catName ? "#000" : "transparent",
                                borderColor: "#000"
                            }}
                            onClick={() => onCategoryChange(catName)}
                        >
                            {catName}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {/* Khoảng giá */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" className="mb-3">
                        Giá
                    </Typography>

                    <Slider
                        value={priceRange}
                        onChange={(_, v) => onPriceChange(v as number[])}
                        valueLabelDisplay="auto"
                        min={0}
                        max={60000000}
                        step={1000000}
                        sx={{
                            color: "#000",
                            '& .MuiSlider-thumb': {
                                borderColor: "#000",
                            }
                        }}
                    />

                    <Typography variant="body2" color="text.secondary">
                        Từ {formatPrice(priceRange[0])} đến {formatPrice(priceRange[1])}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Filters;
