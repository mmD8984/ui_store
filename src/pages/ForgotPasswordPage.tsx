import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Divider,
    Link,
    Snackbar,
    Alert,
    Paper,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { sendPasswordReset } from "../firebase/firebaseAuth";

interface FormData {
    account: string;
}

const ForgotPasswordPage = () => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [submitted, setSubmitted] = useState(false);


    const onSubmit = async (data: FormData) => {
        await sendPasswordReset(data.account);
        setSnackbar({
            open: true,
            message: "Yêu cầu đặt lại mật khẩu đã được gửi!",
            severity: "success",
        });
        setSubmitted(true);
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
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 2,
                    width: "100%",
                    maxWidth: 450,
                    boxShadow: "0 10px 20px rgba(0, 123, 255, 0.15)",
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={700}
                    color="black"
                    sx={{ mb: 2, textAlign: "center" }}
                >
                    Quên mật khẩu
                </Typography>
                {!submitted ? (
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2, textAlign: "center" }}
                        >
                            Nhập email hoặc số điện thoại để nhận liên kết đặt lại mật khẩu.
                        </Typography>

                        <Controller
                            name="account"
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
                                    error={!!errors.account}
                                    helperText={errors.account?.message}
                                />
                            )}
                        />

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
                            Gửi yêu cầu
                        </Button>

                        <Divider sx={{ my: 3 }}>Hoặc</Divider>

                        <Box sx={{ textAlign: "center" }}>
                            <Link
                                component={RouterLink}
                                to="/auth"
                                underline="hover"
                                sx={{
                                    color: "#FF0800",
                                    fontSize: 14,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    "&:hover": { color: "#32CD32" },
                                }}
                            >
                                <ArrowBack fontSize="small" sx={{ mr: 0.5 }} />
                                Quay lại đăng nhập
                            </Link>
                        </Box>
                    </form>
                ) : (
                    <Box textAlign="center">
                        <Typography variant="h6" gutterBottom>
                            Yêu cầu đã được gửi
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            Vui lòng kiểm tra email hoặc tin nhắn SMS để đặt lại mật khẩu.
                        </Typography>
                        <Button
                            component={RouterLink}
                            to="/auth"
                            sx={{
                                bgcolor: "black",
                                color: "white",
                                fontWeight: 600,
                                "&:hover": { bgcolor: "#32CD32" },
                            }}
                        >
                            Quay lại đăng nhập
                        </Button>
                    </Box>
                )}
            </Paper>

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

export default ForgotPasswordPage;
