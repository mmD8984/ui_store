import React from "react"
import { Button, Card, CardContent } from "@mui/material"
import { CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"

export default function CheckoutSuccessPage() {
    const orderId = `#ORD-${Date.now().toString().slice(-8)}`

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <header className="bg-light py-3">
                <div className="container text-center">
                    <h2 className="mb-0">ShopName</h2>
                </div>
            </header>

            {/* Main */}
            <main className="flex-fill d-flex align-items-center justify-content-center py-5">
                <div className="container">
                    <Card className="mx-auto" style={{ maxWidth: "500px" }}>
                        <CardContent className="text-center pt-4">
                            <div className="mx-auto d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10" style={{ width: "64px", height: "64px" }}>
                                <CheckCircle className="text-success" size={40} />
                            </div>

                            <h1 className="mt-4 fw-bold fs-4">Đặt hàng thành công!</h1>
                            <p className="mt-3 text-secondary">
                                Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn và sẽ xử lý trong thời gian sớm nhất.
                            </p>
                            <p className="mt-2 text-secondary small">
                                Mã đơn hàng: <span className="fw-bold font-monospace">{orderId}</span>
                            </p>

                            <div className="mt-4 d-grid gap-2">
                                <Button
                                    component={Link}
                                    to="/products"
                                    variant="contained"
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: 500,
                                        backgroundColor: "#FF0800",
                                        "&:hover": { backgroundColor: "#32CD32" },
                                    }}
                                >
                                    Tiếp tục mua sắm
                                </Button>

                                <Button
                                    component={Link}
                                    to="/"
                                    variant="outlined"
                                    sx={{
                                        borderRadius: 2,
                                        fontWeight: 500,
                                        color: "#FF0800",
                                        borderColor: "#FF0800",
                                        "&:hover": {
                                            backgroundColor: "#FF0800",
                                            color: "#fff",
                                            borderColor: "#FF0800",
                                        },
                                    }}
                                >
                                    Về trang chủ
                                </Button>
                            </div>

                            <p className="mt-3 text-secondary small">
                                Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-light py-3 mt-auto">
                <div className="container text-center">
                    <small>© 2025 ShopName. All rights reserved.</small>
                </div>
            </footer>
        </div>
    )
}
