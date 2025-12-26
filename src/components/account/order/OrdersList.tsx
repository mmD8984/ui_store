import OrderItem from "@/components/account/order/OrderItem";

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

interface OrdersListProps {
    orders: Order[];
}

export default function OrdersList({ orders }: OrdersListProps) {
    if (orders.length === 0) {
        return (
            <div className="col-12 text-center text-muted py-5">
                Không có đơn hàng nào.
            </div>
        );
    }

    return (
        <>
            {orders.map(order => (
                <div key={order.orderId} className="col-12">
                    <OrderItem
                        orderId={order.orderId}
                        date={order.date}
                        status={order.status}
                        products={order.products}
                        total={order.total}
                    />
                </div>
            ))}
        </>
    );
}
