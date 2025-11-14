import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface SortSelectProps {
    sortBy: string;
    sortOptions: { label: string; value: string }[];
    onSortChange: (value: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({ sortBy, sortOptions, onSortChange }) => {
    return (
        <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Sắp xếp theo</InputLabel>
            <Select
                value={sortBy}
                label="Sắp xếp theo"
                onChange={(e) => onSortChange(e.target.value)}
            >
                {sortOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SortSelect;
