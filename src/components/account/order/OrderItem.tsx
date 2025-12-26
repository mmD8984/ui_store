import { Package } from "lucide-react";

interface Product {
    name: string;
    quantity: number;
    price: number;
}

interface OrderItemProps {
    orderId: number;
    date: string;
    status: "confirming" | "shipping" | "delivered" | "canceled" | "returned";
    products: Product[];
    total: number;
}

const statusBadge: Record<OrderItemProps["status"], string> = {
    confirming: "bg-secondary",
    shipping: "bg-warning text-dark",
    delivered: "bg-success",
    canceled: "bg-danger",
    returned: "bg-info text-dark",
};

const statusText: Record<OrderItemProps["status"], string> = {
    confirming: "Đang xác nhận",
    shipping: "Đang giao hàng",
    delivered: "Đã giao hàng",
    canceled: "Đã hủy",
    returned: "Trả hàng",
};

export default function OrderItem({ orderId, date, status, products, total }: OrderItemProps) {
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white pb-3 border-0">
                <div className="d-flex align-items-start justify-content-between">
                    <div>
                        <h6 className="card-title mb-1 fw-semibold">Mã đơn hàng: #ORD-{orderId}</h6>
                        <p className="card-subtitle mb-0 text-muted small">Ngày đặt: {date}</p>
                    </div>
                    <span className={`badge ${statusBadge[status]}`}>{statusText[status]}</span>
                </div>
            </div>

            <div className="card-body pt-0">
                {products.map((product, idx) => (
                    <div key={idx} className="d-flex align-items-center gap-3 py-4 border-top border-bottom border-light">
                        <div
                            className="bg-light rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: "64px", height: "64px" }}
                        >
                            <Package className="h-6 w-6 text-muted" />
                        </div>
                        <div className="flex-grow-1">
                            <p className="fw-semibold mb-1">{product.name}</p>
                            <p className="text-muted small mb-0">Số lượng: {product.quantity}</p>
                        </div>
                        <p className="fw-bold mb-0">{product.price.toLocaleString()}₫</p>
                    </div>
                ))}

                <div className="d-flex justify-content-between align-items-center pt-4">
                    <p className="text-muted small mb-0">
                        Tổng cộng:{" "}
                        <span className="text-dark fw-bold fs-4">{total.toLocaleString()}₫</span>
                    </p>
                    <div className="btn-group gap-2" role="group">
                        <button className="btn btn-outline-dark btn-sm">Chi tiết</button>

                        {/* Chỉ hiển thị Mua lại nếu đơn đã giao hoặc đã hủy/ trả hàng */}
                        {(status === "delivered" || status === "canceled" || status === "returned") && (
                            <button className="btn btn-outline-secondary btn-sm">Mua lại</button>
                        )}

                        {/* Chỉ cho đánh giá nếu đơn đã giao */}
                        {status === "delivered" && (
                            <button className="btn btn-outline-danger btn-sm">Đánh giá</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
