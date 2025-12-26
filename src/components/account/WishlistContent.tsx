import ProductCard from "@/common/ProductCard"; // chỉnh path cho đúng dự án

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
}

export default function WishlistContent() {
    // 👉 mock data, sau này thay bằng API
    const wishlistProducts: Product[] = [
        {
            id: 1,
            name: "iPhone 15 Pro Max 256GB",
            category: "Apple",
            price: 29990000,
            originalPrice: 32990000,
            rating: 4.8,
            reviews: 124,
            image: "/iphone15.jpg",
        },
        {
            id: 2,
            name: "MacBook Pro M3",
            category: "Apple",
            price: 39990000,
            originalPrice: 42990000,
            rating: 4.9,
            reviews: 89,
            image: "/macbook.jpg",
        },
        {
            id: 3,
            name: "Samsung Galaxy S24 Ultra",
            category: "Samsung",
            price: 26990000,
            originalPrice: 29990000,
            rating: 4.7,
            reviews: 77,
            image: "/s24.jpg",
        },
    ];

    return (
        <div>
            <h2 className="h1 fw-bold mb-5">Sản phẩm yêu thích</h2>

            <div className="row g-4">
                {wishlistProducts.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-lg-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
