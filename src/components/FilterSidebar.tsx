import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Slider,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";

interface FilterSidebarProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (cat: string) => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    setCurrentPage: (page: number) => void;
    formatPrice: (price: number) => string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
                                                         categories,
                                                         selectedCategory,
                                                         setSelectedCategory,
                                                         priceRange,
                                                         setPriceRange,
                                                         setCurrentPage,
                                                         formatPrice,
                                                     }) => {
    return (
        <div className="col-md-3 mb-4">
            {/* Bộ lọc danh mục */}
            <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                    <Typography
                        variant="h6"
                        className="d-flex align-items-center gap-2 mb-3"
                    >
                        <FilterList fontSize="small" /> Danh mục
                    </Typography>

                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "contained" : "outlined"}
                            color="primary"
                            fullWidth
                            sx={{ mb: 1, textTransform: "none" }}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setCurrentPage(1);
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {/* Bộ lọc giá */}
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h6" className="mb-3">
                        Giá
                    </Typography>

                    <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue as number[])}
                        valueLabelDisplay="auto"
                        min={0}
                        max={60000000}
                        step={1000000}
                    />

                    <Typography variant="body2" color="text.secondary">
                        Từ {formatPrice(priceRange[0])} đến {formatPrice(priceRange[1])}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default FilterSidebar;
