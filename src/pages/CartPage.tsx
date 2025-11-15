import type React from "react"
import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard } from "lucide-react"
import { Link } from "react-router-dom";
import Header from "@/common/Header.tsx";
import Footer from "@/common/Footer.tsx";

import macbookpro from "../assets/images/macbook-pro.png";
import ip15promax from "../assets/images/iphone-15-pro-max.png";
import s24ultra from "../assets/images/samsung-galaxy-s24-ultra.png";
import dellxps13 from "../assets/images/dell-xps-13-laptop.jpg";

interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    image: string
    category: string
}

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'MacBook Pro 14" M3',
            price: 45990000,
            quantity: 1,
            image: macbookpro,
            category: "Laptop",
        },
        {
            id: 2,
            name: "iPhone 15 Pro Max",
            price: 29990000,
            quantity: 2,
            image: ip15promax,
            category: "Điện thoại",
        },
        {
            id: 3,
            name: "AirPods Pro (2nd Gen)",
            price: 6490000,
            quantity: 1,
            image: s24ultra,
            category: "Phụ kiện",
        },
        {
            id: 4,
            name: 'iPad Air 11" M2',
            price: 16990000,
            quantity: 1,
            image: dellxps13,
            category: "Tablet",
        },
    ])

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }

    const subtotal = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 50000000 ? 0 : 500000
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    return (
        <div style={{minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif",}}>
            <Header />
            {/* Header */}
            <div style={{backgroundColor: "white", borderBottom: "1px solid #e2e8f0", padding: "1rem 0",}}>
                <div style={{maxWidth: "1200px", margin: "0 auto", padding: "0 1rem", display: "flex", alignItems: "center", gap: "0.75rem",}}>
                    <ShoppingBag size={28} style={{ color: "#0dcaf0" }} />
                    <h1 style={{fontSize: "1.875rem", fontWeight: "700", color: "#1e293b", margin: 0,}}>
                        Giỏ hàng của bạn
                    </h1>
                    <span style={{backgroundColor: "#0dcaf0", color: "white", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: "600",}}>
                        {cartItems.length} sản phẩm
                    </span>
                </div>
            </div>

            <div style={{maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem", display: "grid", gridTemplateColumns: "1fr 400px", gap: "2rem",}}>
                {/* Cart Items */}
                <div>
                    {cartItems.length === 0 ? (
                        <div style={{backgroundColor: "white", borderRadius: "12px", padding: "3rem", textAlign: "center", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",}}>
                            <ShoppingBag size={64} style={{ color: "#94a3b8", margin: "0 auto 1rem" }} />
                            <h3 style={{ color: "#64748b", fontSize: "1.25rem", margin: "0 0 0.5rem 0" }}>Giỏ hàng trống</h3>
                            <p style={{ color: "#94a3b8", margin: 0 }}>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{backgroundColor: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", border: "1px solid #f1f5f9",}}>
                                    <div style={{display: "flex", gap: "1rem", alignItems: "flex-start",}}>
                                        {/* Checkbox */}
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.id)}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        setSelectedItems(prev => [...prev, item.id]);
                                                    } else {
                                                        setSelectedItems(prev => prev.filter(id => id !== item.id));
                                                    }
                                                }}
                                            />
                                        </div>
                                        {/* Product Image */}
                                        <div style={{width: "120px", height: "120px", backgroundColor: "#f8fafc", borderRadius: "8px", overflow: "hidden", flexShrink: 0,}}>
                                            <img src={item.image || "/placeholder.svg"} alt={item.name} style={{width: "100%", height: "100%", objectFit: "cover",}}/>
                                        </div>

                                        {/* Product Info */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem",}}>
                                                <div>
                                                    <span style={{fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.05em",}}>
                                                        {item.category}
                                                    </span>
                                                    <h3 style={{fontSize: "1.125rem", fontWeight: "600", color: "#1e293b", margin: "0.25rem 0 0 0",}}>
                                                        {item.name}
                                                    </h3>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    style={{padding: "0.5rem", backgroundColor: "#fef2f2", border: "none", borderRadius: "6px", color: "#dc2626", cursor: "pointer", transition: "all 0.2s",}}
                                                    onMouseOver={(e) => {e.currentTarget.style.backgroundColor = "#fee2e2"}}
                                                    onMouseOut={(e) => {e.currentTarget.style.backgroundColor = "#fef2f2"}}>
                                                        <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem",}}>
                                                {/* Quantity Controls */}
                                                <div style={{display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#f8fafc", borderRadius: "8px", padding: "0.25rem",}}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        style={{padding: "0.5rem", backgroundColor: item.quantity <= 1 ? "#f1f5f9" : "white", border: "none", borderRadius: "6px", color: item.quantity <= 1 ? "#94a3b8" : "#475569", cursor: item.quantity <= 1 ? "not-allowed" : "pointer", transition: "all 0.2s",}}>
                                                            <Minus size={16} />
                                                    </button>
                                                    <span style={{minWidth: "2rem", textAlign: "center", fontWeight: "600", color: "#1e293b",}}>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        style={{padding: "0.5rem", backgroundColor: "white", border: "none", borderRadius: "6px", color: "#475569", cursor: "pointer", transition: "all 0.2s",}}
                                                        onMouseOver={(e) => {e.currentTarget.style.backgroundColor = "#f1f5f9"}}
                                                        onMouseOut={(e) => {e.currentTarget.style.backgroundColor = "white"}}>
                                                            <Plus size={16} />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div style={{ textAlign: "right" }}>
                                                    <div style={{fontSize: "1.25rem", fontWeight: "700", color: "#1e293b",}}>
                                                        {formatPrice(item.price * item.quantity)}
                                                    </div>
                                                    {item.quantity > 1 && (
                                                        <div style={{fontSize: "0.875rem", color: "#64748b",}}>
                                                            {formatPrice(item.price)} x {item.quantity}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Order Summary */}
                <div style={{ position: "sticky", top: "2rem", height: "fit-content" }}>
                    <div style={{backgroundColor: "white", borderRadius: "12px", padding: "1.5rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)", border: "1px solid #f1f5f9",}}>
                        <h2 style={{fontSize: "1.25rem", fontWeight: "700", color: "#1e293b", margin: "0 0 1.5rem 0",}}>
                            Tóm tắt đơn hàng
                        </h2>

                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <div style={{display: "flex", justifyContent: "space-between", color: "#64748b",}}>
                                <span>Tạm tính:</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            <div style={{display: "flex", justifyContent: "space-between", color: "#64748b",}}>
                                <span>Phí vận chuyển:</span>
                                <span style={{ color: shipping === 0 ? "#059669" : "#64748b" }}>
                                    {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
                                 </span>
                            </div>

                            <div style={{display: "flex", justifyContent: "space-between", color: "#64748b",}}>
                                <span>Thuế (8%):</span>
                                <span>{formatPrice(tax)}</span>
                            </div>

                            {shipping === 0 && (
                                <div style={{padding: "0.75rem", backgroundColor: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0",}}>
                                    <p style={{fontSize: "0.875rem", color: "#059669", margin: 0, fontWeight: "500",}}>
                                        🎉 Bạn được miễn phí vận chuyển!
                                    </p>
                                </div>
                            )}

                            <div style={{borderTop: "1px solid #e2e8f0", paddingTop: "0.75rem", marginTop: "0.5rem",}}>
                                <div
                                    style={{display: "flex", justifyContent: "space-between", fontSize: "1.125rem", fontWeight: "700", color: "#1e293b",}}>
                                    <span>Tổng cộng:</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/checkout" style={{ textDecoration: "none", color: "inherit" }}>
                            <button
                                disabled={selectedItems.length === 0}
                                style={{width: "100%", padding: "0.875rem 1rem", backgroundColor: selectedItems.length === 0 ? "#e2e8f0" : "black", color: selectedItems.length === 0 ? "#94a3b8" : "white", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: selectedItems.length === 0 ? "not-allowed" : "pointer", marginTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "all 0.2s",}}
                                onMouseOver={(e) => {if (selectedItems.length > 0) {e.currentTarget.style.backgroundColor = "#32CD32"}}}
                                onMouseOut={(e) => {if (selectedItems.length > 0) {e.currentTarget.style.backgroundColor = "black"}}}
                            >
                                    <CreditCard size={20} />
                                    Thanh toán ngay
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CartPage
