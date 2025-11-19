import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    TextField,
    Typography,
    Button,
    Snackbar,
    Alert,
    Divider,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";

interface AuthPageProps {
    onBack?: () => void;
}

interface FormData {
    phone: string;
    email?: string;
    password: string;
    confirmPassword?: string;
    name?: string;
}

const AuthPage = ({ onBack }: AuthPageProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        if (isLogin) {
            setSnackbar({
                open: true,
                message: "Đăng nhập thành công!",
                severity: "success",
            });
        } else {
            if (data.password !== data.confirmPassword) {
                setSnackbar({
                    open: true,
                    message: "Mật khẩu không khớp!",
                    severity: "error",
                });
                return;
            }
            setSnackbar({
                open: true,
                message: "Đăng ký thành công!",
                severity: "success",
            });
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Link to="/">
                <Button
                    onClick={onBack}
                    startIcon={<ArrowBack />}
                    sx={{
                        position: "absolute",
                        top: 24,
                        left: 24,
                        color: "#FF0800",
                        fontSize: "16px",
                        "&:hover": { color: "#32CD32" },
                    }}
                >
                    Quay lại
                </Button>
            </Link>

            <Box
                sx={{
                    bgcolor: "#fff",
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    p: 4,
                    boxShadow: "0 10px 20px rgba(0, 123, 255, 0.15)",
                    width: "100%",
                    maxWidth: 450,
                }}
            >
                <Typography
                    sx={{ textAlign: "center", mb: 2, fontSize: 20, fontWeight: "bold" }}
                >
                    {isLogin ? "Đăng nhập vào tài khoản của bạn" : "Tạo tài khoản mới"}
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {!isLogin && (
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Họ và Tên"
                                    margin="dense"
                                    size="small"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    )}

                    <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "Số điện thoại là bắt buộc" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Số điện thoại"
                                margin="dense"
                                size="small"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        )}
                    />

                    {!isLogin && (
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Email là bắt buộc",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Email không hợp lệ",
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email"
                                    margin="dense"
                                    size="small"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                    )}

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Mật khẩu là bắt buộc" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                type="password"
                                label="Mật khẩu"
                                margin="dense"
                                size="small"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />

                    {!isLogin && (
                        <Controller
                            name="confirmPassword"
                            control={control}
                            rules={{
                                required: "Xác nhận mật khẩu là bắt buộc",
                                validate: (value) =>
                                    value === watch("password") || "Mật khẩu không khớp",
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="password"
                                    label="Xác nhận mật khẩu"
                                    margin="dense"
                                    size="small"
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            )}
                        />
                    )}

                    {isLogin && (
                        <Box sx={{ textAlign: "right", mb: 3 }}>
                            <Link
                                to="/reset"
                                style={{
                                    color: "#FF0800",
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    transition: "color 0.2s",
                                }}
                            >
                                Quên mật khẩu?
                            </Link>
                        </Box>
                    )}


                    <Button
                        type="submit"
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.5,
                            bgcolor: "black",
                            color: "white",
                            fontWeight: 600,
                            "&:hover": { bgcolor: "#32CD32" },
                        }}
                    >
                        {isLogin ? "Đăng nhập" : "Đăng ký"}
                    </Button>
                </form>

                <Box sx={{ textAlign: "center", mt: 2, fontSize: 14 }}>
                    {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
                    <Button
                        onClick={() => setIsLogin(!isLogin)}
                        sx={{ color: "#FF0800", ml: 1, fontSize: 14 }}
                    >
                        {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }}>Hoặc</Divider>

                <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                    <Button
                        type="button"
                        variant="outlined"
                        sx={{
                            width: "48%",
                            bgcolor: "#f9f9f9",
                            color: "#000",
                            borderColor: "#000",
                            borderRadius: 2,
                            fontSize: 14,
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": {
                                bgcolor: "#eee",
                                borderColor: "#32CD32",
                            },
                        }}
                    >
                        Google
                    </Button>

                    <Button
                        type="button"
                        variant="outlined"
                        sx={{
                            width: "48%",
                            bgcolor: "#f9f9f9",
                            color: "#000",
                            borderColor: "#000",
                            borderRadius: 2,
                            fontSize: 14,
                            textTransform: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": {
                                bgcolor: "#eee",
                                borderColor: "#32CD32",
                            },
                        }}
                    >
                        Facebook
                    </Button>
                </Box>

                {!isLogin && (
                    <Box sx={{ mt: 4, textAlign: "center", fontSize: 12, color: "#555" }}>
                        <Typography variant="body2">
                            Bằng cách tiếp tục, bạn đồng ý với{" "}
                            <Link to="#" style={{ color: "#007bff", textDecoration: "underline" }}>
                                Điều khoản dịch vụ
                            </Link>{" "}
                            và{" "}
                            <Link to="#" style={{ color: "#007bff", textDecoration: "underline" }}>
                                Chính sách bảo mật
                            </Link>{" "}
                            của chúng tôi.
                        </Typography>
                    </Box>
                )}

            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
};

export default AuthPage;
