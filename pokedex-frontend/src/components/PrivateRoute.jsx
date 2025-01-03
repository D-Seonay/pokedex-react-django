import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("authToken");

    // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page autre que /register, redirige vers la page de connexion
    if (!isAuthenticated && location.pathname !== "/register") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
