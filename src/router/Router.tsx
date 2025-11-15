import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
// const ProductCatalog = lazy(() => import("../pages/ProductCatalog"));
const ProductsPage = lazy(() => import("../pages/ProductsPage.tsx"));
const ProductDetail = lazy(() => import("../pages/ProductDetailPage.tsx"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
// const AuthPage = lazy(() => import("../pages/AuthPage"));

const Router = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    {/*<Route path="/auth" element={<AuthPage />} />*/}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
