import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");  // Vérifier si le token est bien présent
                console.log("Token:", token);
                if (!token) {
                    setError("No authentication token found.");
                    setLoading(false);
                    return;
                }

                // Envoi du token avec la bonne syntaxe
                const response = await axios.get("http://localhost:8000/api/user/profile/", {
                    headers: {
                        "Authorization": `Token ${token}`,  // Utilisez "Token" au lieu de "Bearer"
                        "Content-Type": "application/json",
                    },
                });

                setUser(response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user data. Please try again later." + err);
                setLoading(false);
            }
        };

        fetchUserData();  // Appel pour récupérer les données
    }, []);  // Effect au chargement du composant

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-white text-lg">User data not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">{user.username}'s Profile</h1>
                    <p className="text-gray-400">Welcome back, trainer!</p>
                </div>

                {/* Profile Info */}
                <div className="text-sm space-y-4 mb-6">
                    <p>
                        <span className="font-bold text-gray-300">Score:</span> {user.profile?.score || "Not available"}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Favorite Pokémon:</span> {user.profile?.favorite_pokemon || "None set"}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Email:</span> {user.email}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Username:</span> {user.username}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Teams:</span>
                    </p>
                    <ul className="list-disc list-inside">
                        {user.teams && user.teams.length > 0 ? (
                            user.teams.map((team, index) => (
                                <li key={index}>{team.name}</li>
                            ))
                        ) : (
                            <li>No teams found.</li>
                        )}
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 text-center">
                    <Link
                        to="/edit-profile"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
