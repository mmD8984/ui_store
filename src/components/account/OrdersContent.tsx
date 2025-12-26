import { useState } from "react";
import OrderFilters from "@/components/account/order/OrderFilters";
import OrdersList from "@/components/account/order/OrdersList";

interface Product {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    orderId: number;
    date: string;
    status: "confirming" | "shipping" | "delivered" | "canceled" | "returned";
    products: Product[];
    total: number;
}

export default function OrdersContent() {
    const [filter, setFilter] = useState<string>("all");

    const orders: Order[] = [
        {
            orderId: 12345,
            date: "20/12/2025",
            status: "shipping",
            products: [
                { name: "MacBook Pro 14 M3 Max", quantity: 1, price: 79990000 },
            ],
            total: 79990000,
        },
        {
            orderId: 12346,
            date: "18/12/2025",
            status: "delivered",
            products: [
                { name: "iPhone 15 Pro", quantity: 2, price: 29990000 },
            ],
            total: 59980000,
        },
        {
            orderId: 12347,
            date: "15/12/2025",
            status: "canceled",
            products: [
                { name: "AirPods Pro 2", quantity: 1, price: 7990000 },
            ],
            total: 7990000,
        },
    ];

    const filteredOrders = orders.filter(order => {
        if (filter === "all") return true;
        return order.status === filter;
    });

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between mb-5">
                <h2 className="h1 fw-bold mb-0">Đơn hàng của tôi</h2>
                <OrderFilters filter={filter} onChange={setFilter} />
            </div>

            <div className="row g-4">
                <OrdersList orders={filteredOrders} />
            </div>
        </div>
    );
}
