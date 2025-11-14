// "use client"
//
// import type React from "react"
// import { useState } from "react"
// import {Link} from "react-router-dom";
//
// interface AuthPageProps {
//     onBack?: () => void
// }
//
// export default function AuthPage({ onBack }: AuthPageProps) {
//     const [isLogin, setIsLogin] = useState(true)
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//         confirmPassword: "",
//         firstName: "",
//         lastName: "",
//     })
//
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         })
//     }
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         if (isLogin) {
//             alert("Đăng nhập thành công!")
//         } else {
//             if (formData.password !== formData.confirmPassword) {
//                 alert("Mật khẩu không khớp!")
//                 return
//             }
//             alert("Đăng ký thành công!")
//         }
//     }
//
//     // 🎨 Style trắng – xanh dương
//     const containerStyle: React.CSSProperties = {
//         minHeight: "100vh",
//         backgroundColor: "#ffffff",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "20px",
//         fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//     }
//
//     const cardStyle: React.CSSProperties = {
//         backgroundColor: "#ffffff",
//         border: "1px solid #e0e0e0",
//         borderRadius: "12px",
//         padding: "40px",
//         boxShadow: "0 10px 20px rgba(0, 123, 255, 0.15)",
//         width: "100%",
//         maxWidth: "450px",
//     }
//
//     const headerStyle: React.CSSProperties = {
//         textAlign: "center",
//         marginBottom: "32px",
//     }
//
//     const titleStyle: React.CSSProperties = {
//         fontSize: "32px",
//         fontWeight: "700",
//         color: "#007bff",
//         marginBottom: "8px",
//     }
//
//     const subtitleStyle: React.CSSProperties = {
//         color: "#555",
//         fontSize: "16px",
//     }
//
//     const backButtonStyle: React.CSSProperties = {
//         position: "absolute",
//         top: "24px",
//         left: "24px",
//         background: "none",
//         border: "none",
//         color: "#007bff",
//         fontSize: "16px",
//         cursor: "pointer",
//         transition: "color 0.2s",
//     }
//
//     const inputGroupStyle: React.CSSProperties = {
//         marginBottom: "20px",
//     }
//
//     const labelStyle: React.CSSProperties = {
//         display: "block",
//         color: "#000000",
//         fontSize: "14px",
//         fontWeight: "500",
//         marginBottom: "8px",
//     }
//
//     const inputStyle: React.CSSProperties = {
//         width: "100%",
//         padding: "12px 16px",
//         backgroundColor: "#ffffff",
//         border: "1px solid #007bff",
//         borderRadius: "8px",
//         color: "#000000",
//         fontSize: "16px",
//         outline: "none",
//         transition: "border-color 0.2s, box-shadow 0.2s",
//     }
//
//     const buttonStyle: React.CSSProperties = {
//         width: "100%",
//         padding: "14px",
//         backgroundColor: "#007bff",
//         color: "#ffffff",
//         border: "none",
//         borderRadius: "8px",
//         fontSize: "16px",
//         fontWeight: "600",
//         cursor: "pointer",
//         transition: "background-color 0.2s",
//         marginBottom: "24px",
//     }
//
//     const socialButtonStyle: React.CSSProperties = {
//         width: "48%",
//         padding: "12px",
//         backgroundColor: "#f9f9f9",
//         color: "#007bff",
//         border: "1px solid #007bff",
//         borderRadius: "8px",
//         fontSize: "14px",
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         transition: "background-color 0.2s, border-color 0.2s",
//     }
//
//     const linkStyle: React.CSSProperties = {
//         color: "#007bff",
//         textDecoration: "none",
//         fontWeight: "500",
//         cursor: "pointer",
//     }
//
//     const forgotPasswordStyle: React.CSSProperties = {
//         textAlign: "right",
//         marginBottom: "24px",
//     }
//
//     const forgotLinkStyle: React.CSSProperties = {
//         color: "#007bff",
//         fontSize: "14px",
//         textDecoration: "none",
//         cursor: "pointer",
//         transition: "color 0.2s",
//     }
//
//     const toggleStyle: React.CSSProperties = {
//         textAlign: "center",
//         color: "#555",
//         fontSize: "14px",
//     }
//
//     const dividerStyle: React.CSSProperties = {
//         position: "relative",
//         margin: "24px 0",
//         textAlign: "center",
//     }
//
//     const dividerLineStyle: React.CSSProperties = {
//         position: "absolute",
//         top: "50%",
//         left: "0",
//         right: "0",
//         height: "1px",
//         backgroundColor: "#e0e0e0",
//     }
//
//     const dividerTextStyle: React.CSSProperties = {
//         backgroundColor: "#ffffff",
//         color: "#555",
//         padding: "0 16px",
//         fontSize: "14px",
//         position: "relative",
//         zIndex: 1,
//     }
//
//     const socialContainerStyle: React.CSSProperties = {
//         display: "flex",
//         justifyContent: "space-between",
//         gap: "12px",
//     }
//
//     const footerStyle: React.CSSProperties = {
//         marginTop: "32px",
//         textAlign: "center",
//         fontSize: "12px",
//         color: "#555",
//     }
//
//     const rowStyle: React.CSSProperties = {
//         display: "flex",
//         gap: "16px",
//         marginBottom: "20px",
//     }
//
//     const colStyle: React.CSSProperties = {
//         flex: 1,
//     }
//
//     return (
//         <div style={containerStyle}>
//             <Link to='/'>
//                 <button
//                     onClick={onBack}
//                     style={backButtonStyle}
//                     onMouseEnter={(e) => (e.currentTarget.style.color = "#0056b3")}
//                     onMouseLeave={(e) => (e.currentTarget.style.color = "#007bff")}
//                 >
//                     ← Quay lại
//                 </button>
//             </Link>
//             <div style={cardStyle}>
//                 <div style={headerStyle}>
//                     <h1 style={titleStyle}>HaRIP Store</h1>
//                     <p style={subtitleStyle}>
//                         {isLogin ? "Đăng nhập vào tài khoản của bạn" : "Tạo tài khoản mới"}
//                     </p>
//                 </div>
//
//                 <form onSubmit={handleSubmit}>
//                     {!isLogin && (
//                         <div style={rowStyle}>
//                             <div style={colStyle}>
//                                 <div style={inputGroupStyle}>
//                                     <label htmlFor="firstName" style={labelStyle}>
//                                         Họ
//                                     </label>
//                                     <input
//                                         id="firstName"
//                                         name="firstName"
//                                         type="text"
//                                         value={formData.firstName}
//                                         onChange={handleInputChange}
//                                         required={!isLogin}
//                                         style={inputStyle}
//                                         placeholder="Nhập họ"
//                                     />
//                                 </div>
//                             </div>
//                             <div style={colStyle}>
//                                 <div style={inputGroupStyle}>
//                                     <label htmlFor="lastName" style={labelStyle}>
//                                         Tên
//                                     </label>
//                                     <input
//                                         id="lastName"
//                                         name="lastName"
//                                         type="text"
//                                         value={formData.lastName}
//                                         onChange={handleInputChange}
//                                         required={!isLogin}
//                                         style={inputStyle}
//                                         placeholder="Nhập tên"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//
//                     <div style={inputGroupStyle}>
//                         <label htmlFor="email" style={labelStyle}>
//                             Email
//                         </label>
//                         <input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                             style={inputStyle}
//                             placeholder="your@email.com"
//                         />
//                     </div>
//
//                     <div style={inputGroupStyle}>
//                         <label htmlFor="password" style={labelStyle}>
//                             Mật khẩu
//                         </label>
//                         <input
//                             id="password"
//                             name="password"
//                             type="password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             required
//                             style={inputStyle}
//                             placeholder="••••••••"
//                         />
//                     </div>
//
//                     {!isLogin && (
//                         <div style={inputGroupStyle}>
//                             <label htmlFor="confirmPassword" style={labelStyle}>
//                                 Xác nhận mật khẩu
//                             </label>
//                             <input
//                                 id="confirmPassword"
//                                 name="confirmPassword"
//                                 type="password"
//                                 value={formData.confirmPassword}
//                                 onChange={handleInputChange}
//                                 required={!isLogin}
//                                 style={inputStyle}
//                                 placeholder="••••••••"
//                             />
//                         </div>
//                     )}
//
//                     {isLogin && (
//                         <div style={forgotPasswordStyle}>
//                             <a href="#" style={forgotLinkStyle}>
//                                 Quên mật khẩu?
//                             </a>
//                         </div>
//                     )}
//
//                     <button type="submit" style={buttonStyle}>
//                         {isLogin ? "Đăng nhập" : "Đăng ký"}
//                     </button>
//                 </form>
//
//                 <div style={toggleStyle}>
//                     {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
//                     <button
//                         type="button"
//                         onClick={() => setIsLogin(!isLogin)}
//                         style={{
//                             ...linkStyle,
//                             marginLeft: "8px",
//                             background: "none",
//                             border: "none",
//                             fontSize: "14px",
//                         }}
//                     >
//                         {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
//                     </button>
//                 </div>
//
//                 <div style={dividerStyle}>
//                     <div style={dividerLineStyle}></div>
//                     <span style={dividerTextStyle}>Hoặc</span>
//                 </div>
//
//                 <div style={socialContainerStyle}>
//                     <button type="button" style={socialButtonStyle}>
//                         Google
//                     </button>
//                     <button type="button" style={socialButtonStyle}>
//                         Facebook
//                     </button>
//                 </div>
//
//                 <div style={footerStyle}>
//                     <p>
//                         Bằng cách tiếp tục, bạn đồng ý với{" "}
//                         <a href="#" style={{ color: "#007bff", textDecoration: "underline" }}>
//                             Điều khoản dịch vụ
//                         </a>{" "}
//                         và{" "}
//                         <a href="#" style={{ color: "#007bff", textDecoration: "underline" }}>
//                             Chính sách bảo mật
//                         </a>{" "}
//                         của chúng tôi.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }
