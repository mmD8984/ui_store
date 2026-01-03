const VND_FORMATTER = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
    return VND_FORMATTER.format(price);
}