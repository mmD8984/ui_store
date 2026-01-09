import React from "react";
import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
            <Button
                variant="outlined"
                startIcon={<ChevronLeft />}
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                sx={{
                    color: "#000",
                    borderColor: "#000",
                    borderRadius: "9999px",
                    "&:hover": { backgroundColor: "#f0f0f0", borderColor: "#000" }
                }}
            >
                Trước
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i}
                    variant={currentPage === i + 1 ? "contained" : "outlined"}
                    onClick={() => onPageChange(i + 1)}
                    sx={{
                        minWidth: 40,
                        height: 40,
                        borderRadius: "50%",
                        color: currentPage === i + 1 ? "#fff" : "#000",
                        backgroundColor: currentPage === i + 1 ? "#000" : "transparent",
                        borderColor: "#000",
                        "&:hover": {
                            backgroundColor: currentPage === i + 1 ? "#333" : "#f0f0f0",
                        },
                    }}
                >
                    {i + 1}
                </Button>
            ))}

            <Button
                variant="outlined"
                endIcon={<ChevronRight />}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                sx={{
                    color: "#000",
                    borderColor: "#000",
                    borderRadius: "9999px",
                    "&:hover": { backgroundColor: "#f0f0f0", borderColor: "#000" }
                }}
            >
                Sau
            </Button>
        </div>
    );
};

export default Pagination;
