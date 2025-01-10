import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("token");

    // Redirection vers /login si l'utilisateur n'est pas authentifié, sauf pour /register
    if (!isAuthenticated && location.pathname !== "/register") {
        return (
            <Navigate 
                to="/login" 
                replace 
                state={{ from: location }} 
            />
        );
    }

    return children;
};

export default PrivateRoute;
