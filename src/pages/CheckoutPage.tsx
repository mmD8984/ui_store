// import type React from "react"
// import { useState } from "react"
// import {CreditCard, MapPin, User, Mail, Phone, Lock, ArrowLeft, CheckCircle, Truck, Shield, Package, Clock,} from "lucide-react"
// import Header from "../components/Header.tsx"
// import Footer from "../components/Footer.tsx"
// import ip15promax from "../assets/images/iphone-15-pro-max.png"
// import macbookprom3 from "../assets/images/macbook-pro-m3.jpg"
// import {Link} from "react-router-dom";
//
// interface CartItem {
//     id: number
//     name: string
//     price: number
//     quantity: number
//     image: string
//     category: string
// }
//
// interface ShippingInfo {
//     fullName: string
//     email: string
//     phone: string
//     address: string
//     city: string
//     district: string
//     ward: string
//     postalCode: string
// }
//
// interface PaymentInfo {
//     method: "cod" | "debit" | "momo" | "banking"
//     cardNumber: string
//     expiryDate: string
//     cvv: string
//     cardName: string
// }
//
// interface CheckoutPageProps {
//     onBackToCart?: () => void
// }
//
// const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToCart }) => {
//     const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "review" | "success">("shipping")
//     const [orderNumber, setOrderNumber] = useState<string>("")
//
//     const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//         fullName: "",
//         email: "",
//         phone: "",
//         address: "",
//         city: "",
//         district: "",
//         ward: "",
//         postalCode: "",
//     })
//
//     const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
//         method: "debit",
//         cardNumber: "",
//         expiryDate: "",
//         cvv: "",
//         cardName: "",
//     })
//
//     // Sample cart items (in real app, this would come from context/props)
//     const cartItems: CartItem[] = [
//         {
//             id: 1,
//             name: 'MacBook Pro 14" M3',
//             price: 45990000,
//             quantity: 1,
//             image: macbookprom3,
//             category: "Laptop",
//         },
//         {
//             id: 2,
//             name: "iPhone 15 Pro Max",
//             price: 29990000,
//             quantity: 2,
//             image: ip15promax,
//             category: "Điện thoại",
//         },
//     ]
//
//     const formatPrice = (price: number) => {
//         return new Intl.NumberFormat("vi-VN", {
//             style: "currency",
//             currency: "VND",
//         }).format(price)
//     }
//
//     const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     const shipping = subtotal > 50000000 ? 0 : 500000
//     const tax = subtotal * 0.1
//     const total = subtotal + shipping + tax
//
//     const handleShippingSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         setCurrentStep("payment")
//     }
//
//     const handlePaymentSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         setCurrentStep("review")
//     }
//
//     const handleFinalSubmit = () => {
//         // Tạo số đơn hàng ngẫu nhiên
//         const orderNum = "TG" + Date.now().toString().slice(-8)
//         setOrderNumber(orderNum)
//         setCurrentStep("success")
//     }
//
//     return (
//         <div style={{minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif",}}>
//             <Header />
//             {/* Header */}
//             <div style={{backgroundColor: "white", borderBottom: "1px solid #e2e8f0", padding: "1rem 0",}}>
//                 <div style={{maxWidth: "1200px", margin: "0 auto", padding: "0 1rem", display: "flex", alignItems: "center", gap: "0.75rem",}}>
//                     <button
//                         onClick={onBackToCart || (() => window.history.back())}
//                         style={{padding: "0.5rem", backgroundColor: "#f1f5f9", border: "none", borderRadius: "8px", color: "#475569", cursor: "pointer", display: "flex", alignItems: "center",}}>
//                         <ArrowLeft size={20} />
//                     </button>
//                     <CreditCard size={28} style={{ color: "#3b82f6" }} />
//                     <h1 style={{fontSize: "1.875rem", fontWeight: "700", color: "#1e293b", margin: 0,}}>
//                         {currentStep === "success" ? "Đặt hàng thành công" : "Thanh toán"}
//                     </h1>
//                 </div>
//             </div>
//
//             {currentStep !== "success" && (
//                 <div style={{backgroundColor: "white", borderBottom: "1px solid #e2e8f0", padding: "1rem 0",}}>
//                     <div style={{maxWidth: "1200px", margin: "0 auto", padding: "0 1rem",}}>
//                         <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem",}}>
//                             {[
//                                 { key: "shipping", label: "Thông tin giao hàng", icon: MapPin },
//                                 { key: "payment", label: "Thanh toán", icon: CreditCard },
//                                 { key: "review", label: "Xác nhận", icon: CheckCircle },
//                             ].map((step) => {
//                                 const Icon = step.icon
//                                 const isActive = currentStep === step.key
//                                 const isCompleted =
//                                     (step.key === "shipping" && (currentStep === "payment" || currentStep === "review")) ||
//                                     (step.key === "payment" && currentStep === "review")
//
//                                 return (
//                                     <div key={step.key} style={{display: "flex", alignItems: "center", gap: "0.5rem", color: isActive ? "#3b82f6" : isCompleted ? "#059669" : "#94a3b8",}}>
//                                         <div style={{width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: isActive ? "#3b82f6" : isCompleted ? "#059669" : "#e2e8f0", color: isActive || isCompleted ? "white" : "#94a3b8", display: "flex", alignItems: "center", justifyContent: "center",}}>
//                                             <Icon size={16} />
//                                         </div>
//                                         <span style={{fontWeight: isActive ? "600" : "500", fontSize: "0.875rem",}}>
//                                             {step.label}
//                                         </span>
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//             {currentStep === "success" ? (
//                 <div
//                     style={{maxWidth: "800px", margin: "0 auto", padding: "3rem 1rem", textAlign: "center",}}>
//                     {/* Success Icon */}
//                     <div style={{width: "120px", height: "120px", backgroundColor: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem auto",}}>
//                         <CheckCircle size={60} style={{ color: "#059669" }} />
//                     </div>
//
//                     {/* Success Message */}
//                     <h1 style={{fontSize: "2.5rem", fontWeight: "700", color: "#1e293b", margin: "0 0 1rem 0",}}>
//                         Đặt hàng thành công!
//                     </h1>
//
//                     <p style={{fontSize: "1.125rem", color: "#64748b", margin: "0 0 2rem 0", lineHeight: "1.6",}}>
//                         Cảm ơn bạn đã mua sắm tại TechGear. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
//                     </p>
//
//                     {/* Order Details Card */}
//                     <div
//                         style={{
//                             backgroundColor: "white",
//                             borderRadius: "16px",
//                             padding: "2rem",
//                             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//                             border: "1px solid #f1f5f9",
//                             marginBottom: "2rem",
//                             textAlign: "left",
//                         }}
//                     >
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateColumns: "1fr 1fr",
//                                 gap: "2rem",
//                                 marginBottom: "2rem",
//                             }}
//                         >
//                             {/* Order Info */}
//                             <div>
//                                 <h3
//                                     style={{
//                                         fontSize: "1.125rem",
//                                         fontWeight: "600",
//                                         color: "#1e293b",
//                                         margin: "0 0 1rem 0",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: "0.5rem",
//                                     }}
//                                 >
//                                     <Package size={20} />
//                                     Thông tin đơn hàng
//                                 </h3>
//                                 <div style={{ color: "#64748b", lineHeight: "1.6" }}>
//                                     <p style={{ margin: "0 0 0.5rem 0" }}>
//                                         <strong>Mã đơn hàng:</strong> #{orderNumber}
//                                     </p>
//                                     <p style={{ margin: "0 0 0.5rem 0" }}>
//                                         <strong>Ngày đặt:</strong> {new Date().toLocaleDateString("vi-VN")}
//                                     </p>
//                                     <p style={{ margin: "0" }}>
//                                         <strong>Tổng tiền:</strong>{" "}
//                                         <span style={{ color: "#059669", fontWeight: "600" }}>{formatPrice(total)}</span>
//                                     </p>
//                                 </div>
//                             </div>
//
//                             {/* Delivery Info */}
//                             <div>
//                                 <h3
//                                     style={{
//                                         fontSize: "1.125rem",
//                                         fontWeight: "600",
//                                         color: "#1e293b",
//                                         margin: "0 0 1rem 0",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: "0.5rem",
//                                     }}
//                                 >
//                                     <Truck size={20} />
//                                     Thông tin giao hàng
//                                 </h3>
//                                 <div style={{ color: "#64748b", lineHeight: "1.6" }}>
//                                     <p style={{ margin: "0 0 0.5rem 0" }}>
//                                         <strong>Người nhận:</strong> {shippingInfo.fullName}
//                                     </p>
//                                     <p style={{ margin: "0 0 0.5rem 0" }}>
//                                         <strong>Điện thoại:</strong> {shippingInfo.phone}
//                                     </p>
//                                     <p style={{ margin: "0" }}>
//                                         <strong>Dự kiến giao:</strong> 2-3 ngày làm việc
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Order Items */}
//                         <div>
//                             <h3
//                                 style={{
//                                     fontSize: "1.125rem",
//                                     fontWeight: "600",
//                                     color: "#1e293b",
//                                     margin: "0 0 1rem 0",
//                                 }}
//                             >
//                                 Sản phẩm đã đặt
//                             </h3>
//                             <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//                                 {cartItems.map((item) => (
//                                     <div
//                                         key={item.id}
//                                         style={{
//                                             display: "flex",
//                                             gap: "1rem",
//                                             padding: "1rem",
//                                             backgroundColor: "#f8fafc",
//                                             borderRadius: "8px",
//                                         }}
//                                     >
//                                         <div
//                                             style={{
//                                                 width: "60px",
//                                                 height: "60px",
//                                                 backgroundColor: "white",
//                                                 borderRadius: "6px",
//                                                 overflow: "hidden",
//                                                 flexShrink: 0,
//                                             }}
//                                         >
//                                             <img
//                                                 src={item.image || "/placeholder.svg"}
//                                                 alt={item.name}
//                                                 style={{
//                                                     width: "100%",
//                                                     height: "100%",
//                                                     objectFit: "cover",
//                                                 }}
//                                             />
//                                         </div>
//                                         <div style={{ flex: 1 }}>
//                                             <h4
//                                                 style={{
//                                                     fontSize: "1rem",
//                                                     fontWeight: "600",
//                                                     color: "#1e293b",
//                                                     margin: "0 0 0.25rem 0",
//                                                 }}
//                                             >
//                                                 {item.name}
//                                             </h4>
//                                             <p
//                                                 style={{
//                                                     fontSize: "0.875rem",
//                                                     color: "#64748b",
//                                                     margin: "0",
//                                                 }}
//                                             >
//                                                 Số lượng: {item.quantity} × {formatPrice(item.price)}
//                                             </p>
//                                         </div>
//                                         <div
//                                             style={{
//                                                 fontSize: "1rem",
//                                                 fontWeight: "600",
//                                                 color: "#1e293b",
//                                             }}
//                                         >
//                                             {formatPrice(item.price * item.quantity)}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Next Steps */}
//                     <div
//                         style={{
//                             backgroundColor: "#eff6ff",
//                             borderRadius: "12px",
//                             padding: "1.5rem",
//                             border: "1px solid #bfdbfe",
//                             marginBottom: "2rem",
//                         }}
//                     >
//                         <h3
//                             style={{
//                                 fontSize: "1.125rem",
//                                 fontWeight: "600",
//                                 color: "#1e40af",
//                                 margin: "0 0 1rem 0",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 gap: "0.5rem",
//                             }}
//                         >
//                             <Clock size={20} />
//                             Bước tiếp theo
//                         </h3>
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//                                 gap: "1rem",
//                                 textAlign: "center",
//                             }}
//                         >
//                             <div>
//                                 <div
//                                     style={{
//                                         width: "40px",
//                                         height: "40px",
//                                         backgroundColor: "#3b82f6",
//                                         borderRadius: "50%",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         margin: "0 auto 0.5rem auto",
//                                     }}
//                                 >
//                                     <Mail size={20} style={{ color: "white" }} />
//                                 </div>
//                                 <p style={{ fontSize: "0.875rem", color: "#1e40af", margin: 0 }}>Email xác nhận đã được gửi</p>
//                             </div>
//                             <div>
//                                 <div
//                                     style={{
//                                         width: "40px",
//                                         height: "40px",
//                                         backgroundColor: "#3b82f6",
//                                         borderRadius: "50%",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         margin: "0 auto 0.5rem auto",
//                                     }}
//                                 >
//                                     <Package size={20} style={{ color: "white" }} />
//                                 </div>
//                                 <p style={{ fontSize: "0.875rem", color: "#1e40af", margin: 0 }}>Đơn hàng đang được chuẩn bị</p>
//                             </div>
//                             <div>
//                                 <div
//                                     style={{
//                                         width: "40px",
//                                         height: "40px",
//                                         backgroundColor: "#3b82f6",
//                                         borderRadius: "50%",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         justifyContent: "center",
//                                         margin: "0 auto 0.5rem auto",
//                                     }}
//                                 >
//                                     <Truck size={20} style={{ color: "white" }} />
//                                 </div>
//                                 <p style={{ fontSize: "0.875rem", color: "#1e40af", margin: 0 }}>Giao hàng trong 2-3 ngày</p>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Action Buttons */}
//                     <div
//                         style={{
//                             display: "flex",
//                             gap: "1rem",
//                             justifyContent: "center",
//                             flexWrap: "wrap",
//                         }}
//                     >
//                         <button
//                             onClick={() => window.print()}
//                             style={{
//                                 padding: "0.875rem 1.5rem",
//                                 backgroundColor: "white",
//                                 color: "#3b82f6",
//                                 border: "2px solid #3b82f6",
//                                 borderRadius: "8px",
//                                 fontSize: "1rem",
//                                 fontWeight: "600",
//                                 cursor: "pointer",
//                                 transition: "all 0.2s",
//                             }}
//                             onMouseOver={(e) => {
//                                 e.currentTarget.style.backgroundColor = "#3b82f6"
//                                 e.currentTarget.style.color = "white"
//                             }}
//                             onMouseOut={(e) => {
//                                 e.currentTarget.style.backgroundColor = "white"
//                                 e.currentTarget.style.color = "#3b82f6"
//                             }}
//                         >
//                             In đơn hàng
//                         </button>
//                         <Link to='/products' >
//                             <button
//                                 onClick={onBackToCart}
//                                 style={{
//                                     padding: "0.875rem 1.5rem",
//                                     backgroundColor: "#3b82f6",
//                                     color: "white",
//                                     border: "none",
//                                     borderRadius: "8px",
//                                     fontSize: "1rem",
//                                     fontWeight: "600",
//                                     cursor: "pointer",
//                                     transition: "background-color 0.2s",
//                                 }}
//                                 onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
//                                 onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
//                             >
//                                 Tiếp tục mua sắm
//                             </button>
//                         </Link>
//
//                     </div>
//                 </div>
//             ) : (
//                 <div
//                     style={{
//                         maxWidth: "1200px",
//                         margin: "0 auto",
//                         padding: "2rem 1rem",
//                         display: "grid",
//                         gridTemplateColumns: "1fr 400px",
//                         gap: "2rem",
//                     }}
//                 >
//                     {/* Main Content */}
//                     <div>
//                         {currentStep === "shipping" && (
//                             <div
//                                 style={{
//                                     backgroundColor: "white",
//                                     borderRadius: "12px",
//                                     padding: "2rem",
//                                     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//                                 }}
//                             >
//                                 <h2
//                                     style={{
//                                         fontSize: "1.5rem",
//                                         fontWeight: "700",
//                                         color: "#1e293b",
//                                         margin: "0 0 1.5rem 0",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: "0.5rem",
//                                     }}
//                                 >
//                                     <MapPin size={24} />
//                                     Thông tin giao hàng
//                                 </h2>
//
//                                 <form onSubmit={handleShippingSubmit}>
//                                     <div
//                                         style={{
//                                             display: "grid",
//                                             gridTemplateColumns: "1fr 1fr",
//                                             gap: "1rem",
//                                             marginBottom: "1rem",
//                                         }}
//                                     >
//                                         <div>
//                                             <label
//                                                 style={{
//                                                     display: "block",
//                                                     fontSize: "0.875rem",
//                                                     fontWeight: "600",
//                                                     color: "#374151",
//                                                     marginBottom: "0.5rem",
//                                                 }}
//                                             >
//                                                 <User size={16} style={{ display: "inline", marginRight: "0.25rem" }} />
//                                                 Họ và tên *
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 required
//                                                 value={shippingInfo.fullName}
//                                                 onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
//                                                 style={{
//                                                     width: "100%",
//                                                     padding: "0.75rem",
//                                                     border: "1px solid #d1d5db",
//                                                     borderRadius: "8px",
//                                                     fontSize: "1rem",
//                                                     outline: "none",
//                                                     transition: "border-color 0.2s",
//                                                 }}
//                                                 onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
//                                                 onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                                             />
//                                         </div>
//
//                                         <div>
//                                             <label
//                                                 style={{
//                                                     display: "block",
//                                                     fontSize: "0.875rem",
//                                                     fontWeight: "600",
//                                                     color: "#374151",
//                                                     marginBottom: "0.5rem",
//                                                 }}
//                                             >
//                                                 <Phone size={16} style={{ display: "inline", marginRight: "0.25rem" }} />
//                                                 Số điện thoại *
//                                             </label>
//                                             <input
//                                                 type="tel"
//                                                 required
//                                                 value={shippingInfo.phone}
//                                                 onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
//                                                 style={{
//                                                     width: "100%",
//                                                     padding: "0.75rem",
//                                                     border: "1px solid #d1d5db",
//                                                     borderRadius: "8px",
//                                                     fontSize: "1rem",
//                                                     outline: "none",
//                                                     transition: "border-color 0.2s",
//                                                 }}
//                                                 onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
//                                                 onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                                             />
//                                         </div>
//                                     </div>
//
//                                     <div style={{ marginBottom: "1rem" }}>
//                                         <label
//                                             style={{
//                                                 display: "block",
//                                                 fontSize: "0.875rem",
//                                                 fontWeight: "600",
//                                                 color: "#374151",
//                                                 marginBottom: "0.5rem",
//                                             }}
//                                         >
//                                             <Mail size={16} style={{ display: "inline", marginRight: "0.25rem" }} />
//                                             Email *
//                                         </label>
//                                         <input
//                                             type="email"
//                                             required
//                                             value={shippingInfo.email}
//                                             onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
//                                             style={{
//                                                 width: "100%",
//                                                 padding: "0.75rem",
//                                                 border: "1px solid #d1d5db",
//                                                 borderRadius: "8px",
//                                                 fontSize: "1rem",
//                                                 outline: "none",
//                                                 transition: "border-color 0.2s",
//                                             }}
//                                             onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
//                                             onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                                         />
//                                     </div>
//
//                                     <div style={{ marginBottom: "1rem" }}>
//                                         <label
//                                             style={{
//                                                 display: "block",
//                                                 fontSize: "0.875rem",
//                                                 fontWeight: "600",
//                                                 color: "#374151",
//                                                 marginBottom: "0.5rem",
//                                             }}
//                                         >
//                                             Địa chỉ *
//                                         </label>
//                                         <input
//                                             type="text"
//                                             required
//                                             value={shippingInfo.address}
//                                             onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
//                                             placeholder="Số nhà, tên đường"
//                                             style={{
//                                                 width: "100%",
//                                                 padding: "0.75rem",
//                                                 border: "1px solid #d1d5db",
//                                                 borderRadius: "8px",
//                                                 fontSize: "1rem",
//                                                 outline: "none",
//                                                 transition: "border-color 0.2s",
//                                             }}
//                                             onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
//                                             onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                                         />
//                                     </div>
//
//                                     <div
//                                         style={{
//                                             display: "grid",
//                                             gridTemplateColumns: "1fr 1fr 1fr",
//                                             gap: "1rem",
//                                             marginBottom: "2rem",
//                                         }}
//                                     >
//                                         <div>
//                                             <label
//                                                 style={{
//                                                     display: "block",
//                                                     fontSize: "0.875rem",
//                                                     fontWeight: "600",
//                                                     color: "#374151",
//                                                     marginBottom: "0.5rem",
//                                                 }}
//                                             >
//                                                 Tỉnh/Thành phố *
//                                             </label>
//                                             <select
//                                                 required
//                                                 value={shippingInfo.city}
//                                                 onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
//                                                 style={{
//                                                     width: "100%",
//                                                     padding: "0.75rem",
//                                                     border: "1px solid #d1d5db",
//                                                     borderRadius: "8px",
//                                                     fontSize: "1rem",
//                                                     outline: "none",
//                                                     backgroundColor: "white",
//                                                 }}
//                                             >
//                                                 <option value="">Chọn tỉnh/thành</option>
//                                                 <option value="hanoi">Hà Nội</option>
//                                                 <option value="hcm">TP. Hồ Chí Minh</option>
//                                                 <option value="danang">Đà Nẵng</option>
//                                             </select>
//                                         </div>
//
//                                         <div>
//                                             <label
//                                                 style={{
//                                                     display: "block",
//                                                     fontSize: "0.875rem",
//                                                     fontWeight: "600",
//                                                     color: "#374151",
//                                                     marginBottom: "0.5rem",
//                                                 }}
//                                             >
//                                                 Quận/Huyện *
//                                             </label>
//                                             <select
//                                                 required
//                                                 value={shippingInfo.district}
//                                                 onChange={(e) => setShippingInfo({ ...shippingInfo, district: e.target.value })}
//                                                 style={{
//                                                     width: "100%",
//                                                     padding: "0.75rem",
//                                                     border: "1px solid #d1d5db",
//                                                     borderRadius: "8px",
//                                                     fontSize: "1rem",
//                                                     outline: "none",
//                                                     backgroundColor: "white",
//                                                 }}
//                                             >
//                                                 <option value="">Chọn quận/huyện</option>
//                                                 <option value="district1">Quận 1</option>
//                                                 <option value="district2">Quận 2</option>
//                                                 <option value="district3">Quận 3</option>
//                                             </select>
//                                         </div>
//
//                                         <div>
//                                             <label
//                                                 style={{
//                                                     display: "block",
//                                                     fontSize: "0.875rem",
//                                                     fontWeight: "600",
//                                                     color: "#374151",
//                                                     marginBottom: "0.5rem",
//                                                 }}
//                                             >
//                                                 Phường/Xã *
//                                             </label>
//                                             <select
//                                                 required
//                                                 value={shippingInfo.ward}
//                                                 onChange={(e) => setShippingInfo({ ...shippingInfo, ward: e.target.value })}
//                                                 style={{
//                                                     width: "100%",
//                                                     padding: "0.75rem",
//                                                     border: "1px solid #d1d5db",
//                                                     borderRadius: "8px",
//                                                     fontSize: "1rem",
//                                                     outline: "none",
//                                                     backgroundColor: "white",
//                                                 }}
//                                             >
//                                                 <option value="">Chọn phường/xã</option>
//                                                 <option value="ward1">Phường 1</option>
//                                                 <option value="ward2">Phường 2</option>
//                                                 <option value="ward3">Phường 3</option>
//                                             </select>
//                                         </div>
//                                     </div>
//
//                                     <button
//                                         type="submit"
//                                         style={{
//                                             width: "100%",
//                                             padding: "0.875rem",
//                                             backgroundColor: "#3b82f6",
//                                             color: "white",
//                                             border: "none",
//                                             borderRadius: "8px",
//                                             fontSize: "1rem",
//                                             fontWeight: "600",
//                                             cursor: "pointer",
//                                             transition: "background-color 0.2s",
//                                         }}
//                                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
//                                         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
//                                     >
//                                         Tiếp tục đến thanh toán
//                                     </button>
//                                 </form>
//                             </div>
//                         )}
//
//                         {currentStep === "payment" && (
//                             <div
//                                 style={{
//                                     backgroundColor: "white",
//                                     borderRadius: "12px",
//                                     padding: "2rem",
//                                     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//                                 }}
//                             >
//                                 <h2
//                                     style={{
//                                         fontSize: "1.5rem",
//                                         fontWeight: "700",
//                                         color: "#1e293b",
//                                         margin: "0 0 1.5rem 0",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: "0.5rem",
//                                     }}
//                                 >
//                                     <CreditCard size={24} />
//                                     Phương thức thanh toán
//                                 </h2>
//
//                                 <form onSubmit={handlePaymentSubmit}>
//                                     {/* Payment Methods */}
//                                     <div style={{ marginBottom: "2rem" }}>
//                                         <div
//                                             style={{
//                                                 display: "grid",
//                                                 gridTemplateColumns: "1fr 1fr",
//                                                 gap: "1rem",
//                                             }}
//                                         >
//                                             {[
//                                                 { key: "cod", label: "Thanh toán khi nhận  hàng", icon: "💳" },
//                                                 { key: "debit", label: "Thẻ ghi nợ", icon: "💳" },
//                                                 { key: "momo", label: "Ví MoMo", icon: "📱" },
//                                                 { key: "banking", label: "Chuyển khoản", icon: "🏦" },
//                                             ].map((method) => (
//                                                 <label
//                                                     key={method.key}
//                                                     style={{
//                                                         display: "flex",
//                                                         alignItems: "center",
//                                                         gap: "0.75rem",
//                                                         padding: "1rem",
//                                                         border: paymentInfo.method === method.key ? "2px solid #3b82f6" : "1px solid #d1d5db",
//                                                         borderRadius: "8px",
//                                                         cursor: "pointer",
//                                                         backgroundColor: paymentInfo.method === method.key ? "#eff6ff" : "white",
//                                                         transition: "all 0.2s",
//                                                     }}
//                                                 >
//                                                     <input
//                                                         type="radio"
//                                                         name="paymentMethod"
//                                                         value={method.key}
//                                                         checked={paymentInfo.method === method.key}
//                                                         onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value as PaymentInfo["method"] })}
//                                                         style={{ margin: 0 }}
//                                                     />
//                                                     <span style={{ fontSize: "1.25rem" }}>{method.icon}</span>
//                                                     <span style={{ fontWeight: "500" }}>{method.label}</span>
//                                                 </label>
//                                             ))}
//                                         </div>
//                                     </div>
//
//                                     {/* Card Details (only show for credit/debit) */}
//                                     {(paymentInfo.method === "debit") && (
//                                         <div>
//                                             <div style={{ marginBottom: "1rem" }}>
//                                                 <label
//                                                     style={{
//                                                         display: "block",
//                                                         fontSize: "0.875rem",
//                                                         fontWeight: "600",
//                                                         color: "#374151",
//                                                         marginBottom: "0.5rem",
//                                                     }}
//                                                 >
//                                                     <Lock size={16} style={{ display: "inline", marginRight: "0.25rem" }} />
//                                                     Số thẻ *
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     required
//                                                     value={paymentInfo.cardNumber}
//                                                     onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
//                                                     placeholder="1234 5678 9012 3456"
//                                                     style={{
//                                                         width: "100%",
//                                                         padding: "0.75rem",
//                                                         border: "1px solid #d1d5db",
//                                                         borderRadius: "8px",
//                                                         fontSize: "1rem",
//                                                         outline: "none",
//                                                         transition: "border-color 0.2s",
//                                                     }}
//                                                     onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
//                                                     onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                                                 />
//                                             </div>
//
//                                             <div
//                                                 style={{
//                                                     display: "grid",
//                                                     gridTemplateColumns: "1fr 1fr",
//                                                     gap: "1rem",
//                                                     marginBottom: "1rem",
//                                                 }}
//                                             >
//                                                 <div>
//                                                     <label
//                                                         style={{
//                                                             display: "block",
//                                                             fontSize: "0.875rem",
//                                                             fontWeight: "600",
//                                                             color: "#374151",
//                                                             marginBottom: "0.5rem",
//                                                         }}
//                                                     >
//                                                         Ngày hết hạn *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         required
//                                                         value={paymentInfo.expiryDate}
//                                                         onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
//                                                         placeholder="MM/YY"
//                                                         style={{
//                                                             width: "100%",
//                                                             padding: "0.75rem",
//                                                             border: "1px solid #d1d5db",
//                                                             borderRadius: "8px",
//                                                             fontSize: "1rem",
//                                                             outline: "none",
//                                                             transition: "border-color 0.2s",
//                                                         }}
//                                                         onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
//                                                         onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                                                     />
//                                                 </div>
//
//                                                 <div>
//                                                     <label
//                                                         style={{
//                                                             display: "block",
//                                                             fontSize: "0.875rem",
//                                                             fontWeight: "600",
//                                                             color: "#374151",
//                                                             marginBottom: "0.5rem",
//                                                         }}
//                                                     >
//                                                         CVV *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         required
//                                                         value={paymentInfo.cvv}
//                                                         onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
//                                                         placeholder="123"
//                                                         style={{
//                                                             width: "100%",
//                                                             padding: "0.75rem",
//                                                             border: "1px solid #d1d5db",
//                                                             borderRadius: "8px",
//                                                             fontSize: "1rem",
//                                                             outline: "none",
//                                                             transition: "border-color 0.2s",
//                                                         }}
//                                                         onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
//                                                         onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                                                     />
//                                                 </div>
//                                             </div>
//
//                                             <div style={{ marginBottom: "2rem" }}>
//                                                 <label
//                                                     style={{
//                                                         display: "block",
//                                                         fontSize: "0.875rem",
//                                                         fontWeight: "600",
//                                                         color: "#374151",
//                                                         marginBottom: "0.5rem",
//                                                     }}
//                                                 >
//                                                     Tên trên thẻ *
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     required
//                                                     value={paymentInfo.cardName}
//                                                     onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
//                                                     placeholder="NGUYEN VAN A"
//                                                     style={{
//                                                         width: "100%",
//                                                         padding: "0.75rem",
//                                                         border: "1px solid #d1d5db",
//                                                         borderRadius: "8px",
//                                                         fontSize: "1rem",
//                                                         outline: "none",
//                                                         transition: "border-color 0.2s",
//                                                     }}
//                                                     onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
//                                                     onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//
//                                     <div
//                                         style={{
//                                             display: "flex",
//                                             gap: "1rem",
//                                         }}
//                                     >
//                                         <button
//                                             type="button"
//                                             onClick={() => setCurrentStep("shipping")}
//                                             style={{
//                                                 flex: 1,
//                                                 padding: "0.875rem",
//                                                 backgroundColor: "#f1f5f9",
//                                                 color: "#475569",
//                                                 border: "none",
//                                                 borderRadius: "8px",
//                                                 fontSize: "1rem",
//                                                 fontWeight: "600",
//                                                 cursor: "pointer",
//                                                 transition: "background-color 0.2s",
//                                             }}
//                                             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
//                                             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
//                                         >
//                                             Quay lại
//                                         </button>
//                                         <button
//                                             type="submit"
//                                             style={{
//                                                 flex: 2,
//                                                 padding: "0.875rem",
//                                                 backgroundColor: "#3b82f6",
//                                                 color: "white",
//                                                 border: "none",
//                                                 borderRadius: "8px",
//                                                 fontSize: "1rem",
//                                                 fontWeight: "600",
//                                                 cursor: "pointer",
//                                                 transition: "background-color 0.2s",
//                                             }}
//                                             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
//                                             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
//                                         >
//                                             Xem lại đơn hàng
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         )}
//
//                         {currentStep === "review" && (
//                             <div
//                                 style={{
//                                     backgroundColor: "white",
//                                     borderRadius: "12px",
//                                     padding: "2rem",
//                                     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//                                 }}
//                             >
//                                 <h2
//                                     style={{
//                                         fontSize: "1.5rem",
//                                         fontWeight: "700",
//                                         color: "#1e293b",
//                                         margin: "0 0 1.5rem 0",
//                                         display: "flex",
//                                         alignItems: "center",
//                                         gap: "0.5rem",
//                                     }}
//                                 >
//                                     <CheckCircle size={24} />
//                                     Xác nhận đơn hàng
//                                 </h2>
//
//                                 {/* Shipping Info Review */}
//                                 <div
//                                     style={{
//                                         padding: "1.5rem",
//                                         backgroundColor: "#f8fafc",
//                                         borderRadius: "8px",
//                                         marginBottom: "1.5rem",
//                                     }}
//                                 >
//                                     <h3
//                                         style={{
//                                             fontSize: "1.125rem",
//                                             fontWeight: "600",
//                                             color: "#1e293b",
//                                             margin: "0 0 1rem 0",
//                                             display: "flex",
//                                             alignItems: "center",
//                                             gap: "0.5rem",
//                                         }}
//                                     >
//                                         <Truck size={20} />
//                                         Thông tin giao hàng
//                                     </h3>
//                                     <div style={{ color: "#64748b", lineHeight: "1.6" }}>
//                                         <p style={{ margin: "0 0 0.5rem 0" }}>
//                                             <strong>Người nhận:</strong> {shippingInfo.fullName}
//                                         </p>
//                                         <p style={{ margin: "0 0 0.5rem 0" }}>
//                                             <strong>Điện thoại:</strong> {shippingInfo.phone}
//                                         </p>
//                                         <p style={{ margin: "0 0 0.5rem 0" }}>
//                                             <strong>Email:</strong> {shippingInfo.email}
//                                         </p>
//                                         <p style={{ margin: "0" }}>
//                                             <strong>Địa chỉ:</strong> {shippingInfo.address}, {shippingInfo.ward}, {shippingInfo.district},{" "}
//                                             {shippingInfo.city}
//                                         </p>
//                                     </div>
//                                 </div>
//
//                                 {/* Payment Info Review */}
//                                 <div
//                                     style={{
//                                         padding: "1.5rem",
//                                         backgroundColor: "#f8fafc",
//                                         borderRadius: "8px",
//                                         marginBottom: "2rem",
//                                     }}
//                                 >
//                                     <h3
//                                         style={{
//                                             fontSize: "1.125rem",
//                                             fontWeight: "600",
//                                             color: "#1e293b",
//                                             margin: "0 0 1rem 0",
//                                             display: "flex",
//                                             alignItems: "center",
//                                             gap: "0.5rem",
//                                         }}
//                                     >
//                                         <Shield size={20} />
//                                         Phương thức thanh toán
//                                     </h3>
//                                     <div style={{ color: "#64748b" }}>
//                                         <p style={{ margin: 0 }}>
//                                             <strong>
//                                                 {paymentInfo.method === "cod" && "Thanh toán khi nhận hàng"}
//                                                 {paymentInfo.method === "debit" && "Thẻ ghi nợ"}
//                                                 {paymentInfo.method === "momo" && "Ví MoMo"}
//                                                 {paymentInfo.method === "banking" && "Chuyển khoản ngân hàng"}
//                                             </strong>
//                                             {(paymentInfo.method === "debit") &&
//                                                 ` - **** **** **** ${paymentInfo.cardNumber.slice(-4)}`}
//                                         </p>
//                                     </div>
//                                 </div>
//
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         gap: "1rem",
//                                     }}
//                                 >
//                                     <button
//                                         type="button"
//                                         onClick={() => setCurrentStep("payment")}
//                                         style={{
//                                             flex: 1,
//                                             padding: "0.875rem",
//                                             backgroundColor: "#f1f5f9",
//                                             color: "#475569",
//                                             border: "none",
//                                             borderRadius: "8px",
//                                             fontSize: "1rem",
//                                             fontWeight: "600",
//                                             cursor: "pointer",
//                                             transition: "background-color 0.2s",
//                                         }}
//                                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
//                                         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
//                                     >
//                                         Quay lại
//                                     </button>
//                                     <button
//                                         onClick={handleFinalSubmit}
//                                         style={{
//                                             flex: 2,
//                                             padding: "0.875rem",
//                                             backgroundColor: "#059669",
//                                             color: "white",
//                                             border: "none",
//                                             borderRadius: "8px",
//                                             fontSize: "1rem",
//                                             fontWeight: "600",
//                                             cursor: "pointer",
//                                             transition: "background-color 0.2s",
//                                             display: "flex",
//                                             alignItems: "center",
//                                             justifyContent: "center",
//                                             gap: "0.5rem",
//                                         }}
//                                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#047857")}
//                                         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#059669")}
//                                     >
//                                         <CheckCircle size={20} />
//                                         Xác nhận đặt hàng
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//
//                     {/* Order Summary Sidebar */}
//                     <div style={{ position: "sticky", top: "2rem", height: "fit-content" }}>
//                         <div
//                             style={{
//                                 backgroundColor: "white",
//                                 borderRadius: "12px",
//                                 padding: "1.5rem",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//                                 border: "1px solid #f1f5f9",
//                             }}
//                         >
//                             <h2
//                                 style={{
//                                     fontSize: "1.25rem",
//                                     fontWeight: "700",
//                                     color: "#1e293b",
//                                     margin: "0 0 1.5rem 0",
//                                 }}
//                             >
//                                 Đơn hàng của bạn
//                             </h2>
//
//                             {/* Cart Items */}
//                             <div style={{ marginBottom: "1.5rem" }}>
//                                 {cartItems.map((item) => (
//                                     <div
//                                         key={item.id}
//                                         style={{
//                                             display: "flex",
//                                             gap: "0.75rem",
//                                             marginBottom: "1rem",
//                                             paddingBottom: "1rem",
//                                             borderBottom: "1px solid #f1f5f9",
//                                         }}
//                                     >
//                                         <div
//                                             style={{
//                                                 width: "60px",
//                                                 height: "60px",
//                                                 backgroundColor: "#f8fafc",
//                                                 borderRadius: "6px",
//                                                 overflow: "hidden",
//                                                 flexShrink: 0,
//                                             }}
//                                         >
//                                             <img
//                                                 src={item.image || "/placeholder.svg"}
//                                                 alt={item.name}
//                                                 style={{
//                                                     width: "100%",
//                                                     height: "100%",
//                                                     objectFit: "cover",
//                                                 }}
//                                             />
//                                         </div>
//                                         <div style={{ flex: 1 }}>
//                                             <h4
//                                                 style={{
//                                                     fontSize: "0.875rem",
//                                                     fontWeight: "600",
//                                                     color: "#1e293b",
//                                                     margin: "0 0 0.25rem 0",
//                                                 }}
//                                             >
//                                                 {item.name}
//                                             </h4>
//                                             <p
//                                                 style={{
//                                                     fontSize: "0.75rem",
//                                                     color: "#64748b",
//                                                     margin: "0 0 0.5rem 0",
//                                                 }}
//                                             >
//                                                 Số lượng: {item.quantity}
//                                             </p>
//                                             <p
//                                                 style={{
//                                                     fontSize: "0.875rem",
//                                                     fontWeight: "600",
//                                                     color: "#1e293b",
//                                                     margin: 0,
//                                                 }}
//                                             >
//                                                 {formatPrice(item.price * item.quantity)}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//
//                             {/* Order Summary */}
//                             <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         color: "#64748b",
//                                     }}
//                                 >
//                                     <span>Tạm tính:</span>
//                                     <span>{formatPrice(subtotal)}</span>
//                                 </div>
//
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         color: "#64748b",
//                                     }}
//                                 >
//                                     <span>Phí vận chuyển:</span>
//                                     <span style={{ color: shipping === 0 ? "#059669" : "#64748b" }}>
//                     {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
//                   </span>
//                                 </div>
//
//                                 <div
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                         color: "#64748b",
//                                     }}
//                                 >
//                                     <span>Thuế (10%):</span>
//                                     <span>{formatPrice(tax)}</span>
//                                 </div>
//
//                                 <div
//                                     style={{
//                                         borderTop: "1px solid #e2e8f0",
//                                         paddingTop: "0.75rem",
//                                         marginTop: "0.5rem",
//                                     }}
//                                 >
//                                     <div
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "space-between",
//                                             fontSize: "1.125rem",
//                                             fontWeight: "700",
//                                             color: "#1e293b",
//                                         }}
//                                     >
//                                         <span>Tổng cộng:</span>
//                                         <span>{formatPrice(total)}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <Footer />
//         </div>
//     )
// }
//
// export default CheckoutPage
