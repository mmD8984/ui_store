import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "@/router/PrivateRoute.tsx"

const HomePage = lazy(() => import("../pages/HomePage"));
const ProductsPage = lazy(() => import("../pages/ProductsPage"));
const ProductDetail = lazy(() => import("../pages/ProductDetailPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const ForgotPasswordPage = lazy(() => import("../pages/ForgotPasswordPage"));
const AccountPage = lazy(() => import("../pages/AccountPage"));
const ImagePage = lazy(() => import("../pages/ImagePage"));

const Router = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<PrivateRoute> <CartPage /> </PrivateRoute>} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/reset" element={<ForgotPasswordPage />} />
                    <Route path="/account" element={<PrivateRoute> <AccountPage /> </PrivateRoute>} />
                    <Route path="/upload" element={<ImagePage />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
