import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimer le token du stockage local
        localStorage.removeItem("authToken");

        // Rediriger vers la page de connexion
        navigate("/login");
    };

    return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default LogoutButton;