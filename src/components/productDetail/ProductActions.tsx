import { useState } from "react";
import {Button, IconButton, Typography,} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

interface ProductActionsProps {
    stock: number;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onAddToCart: (quantity: number) => void;
}

export default function ProductActions({
                                           stock,
                                           quantity,
                                           onQuantityChange,
                                           onAddToCart,
                                       }: ProductActionsProps) {
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

    const decreaseQty = () => {
        onQuantityChange(Math.max(1, quantity - 1));
    };

    const increaseQty = () => {
        onQuantityChange(Math.min(stock, quantity + 1));
    };

    const handleAddToCart = () => {
        onAddToCart(quantity);
    };

    return (
        <div className="mb-3">
            {/* Quantity selector */}
            <div className="d-flex align-items-center gap-3 mb-2">
                <Typography sx={{ fontWeight: 600 }}>
                    Số lượng:
                </Typography>

                <div className="d-flex align-items-center border rounded">
                    <button type="button" className="btn btn-sm" onClick={decreaseQty} disabled={quantity <= 1}>
                        −
                    </button>

                    <div style={{minWidth: 48, textAlign: "center",}}>
                        {quantity}
                    </div>

                    <button type="button" className="btn btn-sm" onClick={increaseQty} disabled={quantity >= stock}>
                        +
                    </button>
                </div>
            </div>

            {/* Add to cart & wishlist */}
            <div className="d-flex gap-2 mb-2">
                {/*thêm giỏ hàng*/}
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{backgroundColor: '#000', color: '#fff', '&:hover': {backgroundColor: '#333',}}}
                    disabled={stock === 0}
                    onClick={handleAddToCart}
                >
                    Thêm vào giỏ hàng
                </Button>
                {/*yêu thích*/}
                <IconButton
                    aria-label="wishlist"
                    onClick={() => setIsWishlisted((v) => !v)}
                    color={isWishlisted ? "error" : "default"}
                    sx={{border: "1px solid", borderColor: isWishlisted ? "error.main" : "divider",}}
                >
                    {isWishlisted ? (
                        <FavoriteIcon />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>
            </div>

            {/* Share */}
            <Button
                variant="outlined"
                fullWidth
                startIcon={<ShareIcon />}
                sx={{color: '#000', borderColor: '#000', '&:hover': {borderColor: '#000', backgroundColor: 'rgba(0,0,0,0.04)',}}}
            >
                Chia sẻ
            </Button>
        </div>
    );
}
