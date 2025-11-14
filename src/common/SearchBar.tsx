import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    TextField,
    IconButton,
    InputAdornment,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    CircularProgress,
    Typography,
    Divider,
    Fade,
    ListItemButton,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import { searchProducts } from "@/lib/api.ts"
import type { Product } from "@/lib/types.ts"

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Product[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    // 🕒 Debounce tìm kiếm
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length > 1) {
                setIsLoading(true)
                try {
                    const result = await searchProducts({ query, pageSize: 5 })
                    setResults(result.products)
                    setIsOpen(true)
                } catch (error) {
                    console.error("Search error:", error)
                } finally {
                    setIsLoading(false)
                }
            } else {
                setResults([])
                setIsOpen(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    // 🖱 Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`)
            setIsOpen(false)
        }
    }

    return (
        <Box ref={searchRef} sx={{ position: "relative", flexGrow: 1, maxWidth: 500 }}>
            {/* Ô tìm kiếm */}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    size="small" // ✅ giảm chiều cao
                    variant="outlined"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 1 && setIsOpen(true)}
                    InputProps={{
                        sx: {
                            height: 36, // ✅ ép chiều cao tổng thể
                            fontSize: 14,
                            "& input": {
                                py: 0.5,
                            },
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                            </InputAdornment>
                        ),
                        endAdornment: query && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => {
                                        setQuery("")
                                        setResults([])
                                        setIsOpen(false)
                                    }}
                                    size="small"
                                >
                                    <CloseIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>

            {/* Gợi ý tìm kiếm */}
            <Fade in={isOpen}>
                <Paper
                    elevation={6}
                    sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        mt: 0.5,
                        borderRadius: 2,
                        maxHeight: 350,
                        overflowY: "auto",
                        zIndex: 10,
                    }}
                >
                    {isLoading ? (
                        <Box sx={{ textAlign: "center", py: 2 }}>
                            <CircularProgress size={20} />
                            <Typography variant="body2" color="text.secondary" mt={1}>
                                Đang tìm kiếm...
                            </Typography>
                        </Box>
                    ) : results.length > 0 ? (
                        <>
                            <List dense> {/* ✅ giảm khoảng cách giữa các item */}
                                {results.map((product) => (
                                    <ListItem key={product.id} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/product/${product.slug}`)
                                                setIsOpen(false)
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    variant="rounded"
                                                    src={product.image || "/placeholder.png"}
                                                    sx={{ width: 40, height: 40 }}
                                                />
                                            </ListItemAvatar>

                                            <ListItemText
                                                primary={
                                                    <Typography variant="subtitle2" noWrap>
                                                        {product.name}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="body2" color="text.secondary" noWrap>
                                                        {product.brand}
                                                    </Typography>
                                                }
                                            />

                                            <Typography variant="body2" fontWeight="bold" color="primary">
                                                {product.price.toLocaleString("vi-VN")}đ
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                            <Box textAlign="center" py={1}>
                                <Typography
                                    variant="body2"
                                    color="primary"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => {
                                        navigate(`/search?q=${encodeURIComponent(query)}`)
                                        setIsOpen(false)
                                    }}
                                >
                                    Xem tất cả kết quả cho "{query}"
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ textAlign: "center", py: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                Không tìm thấy sản phẩm
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Fade>
        </Box>
    )
}

export default SearchBar
