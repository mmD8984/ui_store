import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import React from "react";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps ) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/auth" replace />;

    return children;
};

export default PrivateRoute;
