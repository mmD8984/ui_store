// import React, { useState, useEffect, useRef } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import { Box, TextField, IconButton, InputAdornment, Paper, List, ListItemButton, ListItemText, Typography, CircularProgress } from "@mui/material"
// import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material"
// import type { Product } from "@/lib/types"
// import { searchProducts } from "@/lib/api"
//
// const Categories = () => {
//     const [query, setQuery] = useState("")
//     const [results, setResults] = useState<Product[]>([])
//     const [loading, setLoading] = useState(false)
//     const [open, setOpen] = useState(false)
//     const wrapperRef = useRef<HTMLDivElement>(null)
//     const navigate = useNavigate()
//
//     // Handle click outside -> close result box
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
//                 setOpen(false)
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside)
//         return () => document.removeEventListener("mousedown", handleClickOutside)
//     }, [])
//
//     // Search effect
//     useEffect(() => {
//         if (query.trim() === "") {
//             setResults([])
//             setOpen(false)
//             return
//         }
//
//         const fetchResults = async () => {
//             setLoading(true)
//             try {
//                 const res = await searchProducts(query)
//                 setResults(res)
//                 setOpen(true)
//             } catch (error) {
//                 console.error(error)
//             } finally {
//                 setLoading(false)
//             }
//         }
//
//         const delayDebounce = setTimeout(fetchResults, 300)
//         return () => clearTimeout(delayDebounce)
//     }, [query])
//
//     const handleClear = () => {
//         setQuery("")
//         setResults([])
//         setOpen(false)
//     }
//
//     const handleSelect = (id: number) => {
//         navigate(`/product/${id}`)
//         handleClear()
//     }
//
//     return (
//         <Box sx={{ position: "relative", width: "100%", maxWidth: 400 }} ref={wrapperRef}>
//             <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Tìm kiếm sản phẩm..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon color="action" />
//                         </InputAdornment>
//                     ),
//                     endAdornment: query && (
//                         <InputAdornment position="end">
//                             <IconButton size="small" onClick={handleClear}>
//                                 <CloseIcon />
//                             </IconButton>
//                         </InputAdornment>
//                     ),
//                 }}
//                 sx={{
//                     "& .MuiOutlinedInput-root": {
//                         borderRadius: 3,
//                         bgcolor: "background.paper",
//                         boxShadow: open ? 3 : 0,
//                         transition: "box-shadow 0.2s ease-in-out",
//                     },
//                 }}
//             />
//
//             {open && (
//                 <Paper
//                     elevation={6}
//                     sx={{
//                         position: "absolute",
//                         top: "100%",
//                         left: 0,
//                         right: 0,
//                         mt: 1,
//                         borderRadius: 2,
//                         maxHeight: 300,
//                         overflowY: "auto",
//                         zIndex: 10,
//                     }}
//                 >
//                     {loading ? (
//                         <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
//                             <CircularProgress size={24} />
//                         </Box>
//                     ) : results.length > 0 ? (
//                         <List dense>
//                             {results.map((product) => (
//                                 <ListItemButton key={product.id} onClick={() => handleSelect(product.id)}>
//                                     <ListItemText
//                                         primary={<Typography variant="body1">{product.name}</Typography>}
//                                         secondary={
//                                             <Typography variant="body2" color="text.secondary">
//                                                 {product.price?.toLocaleString()} ₫
//                                             </Typography>
//                                         }
//                                     />
//                                 </ListItemButton>
//                             ))}
//                         </List>
//                     ) : (
//                         <Box sx={{ p: 2 }}>
//                             <Typography variant="body2" color="text.secondary">
//                                 Không tìm thấy sản phẩm nào
//                             </Typography>
//                         </Box>
//                     )}
//                 </Paper>
//             )}
//         </Box>
//     )
// }
//
// export default Categories;