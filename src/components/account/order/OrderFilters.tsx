interface OrderFiltersProps {
    filter: string;
    onChange: (value: string) => void;
}

export default function OrderFilters({ filter, onChange }: OrderFiltersProps) {
    const filters = ["all","confirming","shipping","delivered","canceled","returned"];
    const labels: Record<string,string> = {
        all: "Tất cả",
        confirming: "Đang xác nhận",
        shipping: "Đang giao",
        delivered: "Đã giao",
        canceled: "Đã hủy",
        returned: "Trả hàng"
    };

    return (
        <div className="btn-group btn-group-sm" role="group">
            {filters.map(f => (
                <button
                    key={f}
                    className={`btn ${filter === f ? "btn-outline-dark fw-semibold" : "btn-outline-secondary"}`}
                    onClick={() => onChange(f)}
                >
                    {labels[f]}
                </button>
            ))}
        </div>
    );
}
