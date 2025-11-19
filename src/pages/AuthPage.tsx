import React, {useState} from "react"
import { Link } from "react-router-dom";
import {Box, Divider, TextField, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

interface AuthPageProps {
    onBack?: () => void
}

const AuthPage = ({onBack}: AuthPageProps) => {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(isLogin){
            alert("Đăng nhập thành công!")
        } else {
            if (formData.password !== formData.confirmPassword) {
                alert("Mật khẩu không khớp!")
                return
            }
            alert("Đăng ký thành công!")
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div style = {{minHeight: "100vh", backgroundColor: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",}}>
            <Link to='/'>
                <button
                    onClick={onBack}
                    style={{position: "absolute", top: "24px", left: "24px", background: "none", border: "none", color: "#FF0800", fontSize: "20px", cursor: "pointer", transition: "color 0.2s",}}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#32CD32")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#FF0800")}>
                    <ArrowBack fontSize="small" sx={{ mr: 0.5 }} /> Quay lại
                </button>
            </Link>
            <div className="container-fluid">
                <div className="row min-vh-100">
                    {/* Left hero / branding */}
                    <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center hero-col">
                        <Box className="text-center" px={4}>
                            <div className="d-flex justify-content-center text-decoration-none text-dark mb-5">
                                <Box sx={{bgcolor: "common.black", width: 120, height: 60, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",}}>
                                    <Typography variant="subtitle1" sx={{ color: "yellow", fontWeight: "bold", fontSize: 32 }}>
                                        Van Ha
                                    </Typography>
                                </Box>
                                <Typography variant="h2" sx={{ fontWeight: "bold", ml: 1, display: { xs: "none", sm: "block" } }}>
                                    Store
                                </Typography>
                            </div>
                            <Typography variant="h3" component="h1" fontWeight="bold" sx={{mb: 3, lineHeight: 1.3, "@media (min-width:600px)": { fontSize: "2.5rem" },}}>
                                Mua sắm vui – giá tốt mỗi ngày
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Đăng nhập để theo dõi đơn hàng, lưu mã giảm giá và trải nghiệm tốt nhất.
                            </Typography>
                        </Box>
                    </div>
                    {/* Right form */}
                    <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                        <div style={{backgroundColor: "#ffffff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "40px", boxShadow: "0 10px 20px rgba(0, 123, 255, 0.15)", width: "100%", maxWidth: "450px",}}>
                            <div style={{textAlign: "center", marginBottom: "16px",}}>
                                <p style={{color: "#000", fontSize: "20px", fontWeight: "bold"}}>
                                    {isLogin ? "Đăng nhập vào tài khoản của bạn" : "Tạo tài khoản mới"}
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <TextField fullWidth label="Họ và Tên" name="name" value={formData.name} onChange={handleInputChange} margin="dense" size="small" variant="outlined" sx={{"& .MuiInputLabel-root": { color: "#555" }, "& .MuiOutlinedInput-input": { color: "#555" }, "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" }, "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#555" },}}/>
                                )}
                                <TextField fullWidth label="Số điện thoại" name="phone" value={formData.phone} onChange={handleInputChange} margin="dense" size="small" variant="outlined" sx={{"& .MuiInputLabel-root": { color: "#555" }, "& .MuiOutlinedInput-input": { color: "#555" }, "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" }, "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#555" },}}/>

                                {!isLogin && (
                                    <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleInputChange} margin="dense" size="small" variant="outlined" sx={{"& .MuiInputLabel-root": { color: "#555" }, "& .MuiOutlinedInput-input": { color: "#555" }, "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" }, "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#555" },}}/>
                                )}
                                <TextField fullWidth label="Mật khẩu" name="password" value={formData.password} onChange={handleInputChange} margin="dense" size="small" variant="outlined" sx={{"& .MuiInputLabel-root": { color: "#555" }, "& .MuiOutlinedInput-input": { color: "#555" }, "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" }, "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#555" },}}/>
                                {!isLogin && (
                                    <TextField fullWidth label="Xác nhận mật khẩu" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} margin="dense" size="small" variant="outlined" sx={{"& .MuiInputLabel-root": { color: "#555" }, "& .MuiOutlinedInput-input": { color: "#555" }, "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" }, "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#555" },}}/>
                                )}
                                {isLogin && (
                                    <div style={{textAlign: "right", marginBottom: "24px",}}>
                                        <Link to="/reset" style={{color: "#FF0800", fontSize: "14px", textDecoration: "none", cursor: "pointer", transition: "color 0.2s",}}>
                                            Quên mật khẩu?
                                        </Link>
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    style={{
                                        width: "100%",
                                        padding: "0.875rem",
                                        marginTop: "16px",
                                        backgroundColor: "black",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#32CD32")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "black")}
                                >
                                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                                </button>
                            </form>
                            <div style={{textAlign: "center", fontSize: "14px",}}>
                                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    style={{color: "#FF0800", textDecoration: "none", fontWeight: "500", cursor: "pointer", marginLeft: "8px", background: "none", border: "none", fontSize: "14px",}}>
                                    {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                                </button>
                            </div>
                            <Divider sx={{ my: 3 }}>Hoặc</Divider>
                            <div style={{display: "flex", justifyContent: "space-between", gap: "12px",}}>
                                <button type="button" style={{width: "48%", padding: "12px", backgroundColor: "#f9f9f9", color: "#000", border: "1px solid #000", borderRadius: "8px", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.2s, border-color 0.2s",}}>
                                    Google
                                </button>
                                <button type="button" style={{width: "48%", padding: "12px", backgroundColor: "#f9f9f9", color: "#000", border: "1px solid #000", borderRadius: "8px", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.2s, border-color 0.2s",}}>
                                    Facebook
                                </button>
                            </div>
                            {!isLogin && (
                                <div style={{marginTop: "32px", textAlign: "center", fontSize: "12px", color: "#555",}}>
                                    <p>
                                        Bằng cách tiếp tục, bạn đồng ý với{" "}
                                        <a href="#" style={{ color: "#007bff", textDecoration: "underline" }}>
                                            Điều khoản dịch vụ
                                        </a>{" "}
                                        và{" "}
                                        <a href="#" style={{ color: "#007bff", textDecoration: "underline" }}>
                                            Chính sách bảo mật
                                        </a>{" "}
                                        của chúng tôi.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AuthPage
