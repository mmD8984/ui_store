// import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import { ShoppingCart, Check } from "@mui/icons-material";
// import type { Product } from "@/lib/types";
// import { useCartStore } from "@/lib/cart-store";
//
// interface AddToCartButtonProps {
//     product: Product;
//     quantity?: number;
//     className?: string;
// }
//
// const AddToCartButton: React.FC<AddToCartButtonProps> = ({
//                                                              product,
//                                                              quantity = 1,
//                                                              className,
//                                                          }) => {
//     const addItem = useCartStore((state) => state.addItem);
//     const [isAdded, setIsAdded] = useState(false);
//
//     const handleAddToCart = () => {
//         addItem(product, quantity);
//         setIsAdded(true);
//         setTimeout(() => setIsAdded(false), 2000);
//     };
//
//     return (
//         <Stack direction="row" className={className}>
//             <Button
//                 variant="contained"
//                 color="primary"
//                 disabled={!product.inStock || isAdded}
//                 onClick={handleAddToCart}
//                 startIcon={isAdded ? <Check /> : <ShoppingCart />}
//                 fullWidth
//                 style={{ borderRadius: 8, fontWeight: 500 }}
//             >
//                 {isAdded ? "Đã thêm" : product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
//             </Button>
//         </Stack>
//     );
// };
//
// export default AddToCartButton;
