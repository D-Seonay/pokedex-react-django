import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    // Vérifie si l'utilisateur est authentifié (par exemple, via un token stocké)
    const isAuthenticated = !!localStorage.getItem("authToken");

    // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
