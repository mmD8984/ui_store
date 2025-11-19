import React, { useState } from 'react';
import {
    Paper,
    Box,
    TextField,
    Button,
    Typography,
    Divider,
    Link,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const ForgotPasswordPage = () => {
    const [account, setAccount] = useState('');
    const [errors, setErrors] = useState<{ account?: string }>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const e: typeof errors = {};
        if (!account.trim()) e.account = 'Vui lòng nhập email hoặc số điện thoại';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        // TODO: gọi API gửi mail/SMS reset password
        setSubmitted(true);
    };

    return (
        <div className="container-fluid forgot-page">
            <div className="row min-vh-100 d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <Paper elevation={3} className="forgot-card" sx={{ p: { xs: 3, md: 4 } }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Typography variant="h6" fontWeight={700} color="black">
                                Quên mật khẩu
                            </Typography>
                        </Box>

                        {!submitted ? (
                            <form onSubmit={onSubmit} noValidate>
                                <Typography variant="body2" color="text.secondary" mb={2}>
                                    Nhập email hoặc số điện thoại để nhận liên kết đặt lại mật khẩu.
                                </Typography>

                                <TextField
                                    label="Email hoặc số điện thoại"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    error={!!errors.account}
                                    helperText={errors.account}
                                    margin="normal"
                                    fullWidth
                                    sx={{"& .MuiInputLabel-root": { color: "#555" }, "& .MuiOutlinedInput-input": { color: "#555" }, "& .MuiOutlinedInput-root fieldset": { borderColor: "#555" }, "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: "#555" },}}
                                />

                                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                    Gửi yêu cầu
                                </Button>

                                <Divider sx={{ my: 3 }} />

                                <Box display="flex" justifyContent="center">
                                    <Link href="/login" underline="hover" color="#32CD32" display="flex" alignItems="center">
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
                                <Button variant="contained" color="primary" href="/auth">
                                    Quay lại đăng nhập
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage
