import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [favoritePokemonSprite, setFavoritePokemonSprite] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No authentication token found.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:8000/api/user/profile/", {
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const userData = response.data;
                setUser(userData);

                // Récupérer le sprite du Pokémon favori
                if (userData.profile?.favorite_pokemon) {
                    const pokemonResponse = await axios.get(
                        `https://pokeapi.co/api/v2/pokemon/${userData.profile.favorite_pokemon.toLowerCase()}`
                    );
                    setFavoritePokemonSprite(pokemonResponse.data.sprites.front_default);
                }

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user data. Please try again later.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

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
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-8">
                {/* Bouton Retour */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
                >
                    &larr; Retour
                </button>

                {/* Header */}
                <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                        {/* Photo de profil ou image par défaut */}
                        <img
                            src={
                                user.profile?.profile_picture
                                    ? `http://localhost:8000${user.profile.profile_picture}`
                                    : "https://via.placeholder.com/96?text=No+Image"
                            }
                            alt={`${user.username}'s profile`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{user.username}'s Profile</h1>
                        <p className="text-gray-400">Welcome back, trainer!</p>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="mt-8 text-sm space-y-4">
                    <p>
                        <span className="font-bold text-gray-300">Score:</span>{" "}
                        {user.profile.score}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Favorite Pokémon:</span>{" "}
                        {user.profile?.favorite_pokemon || "None set"}
                    </p>
                    {favoritePokemonSprite && (
                        <div className="mt-2">
                            <img
                                src={favoritePokemonSprite}
                                alt={user.profile.favorite_pokemon}
                                className="w-16 h-16"
                            />
                        </div>
                    )}
                    <p>
                        <span className="font-bold text-gray-300">Email:</span> {user.email}
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

                {/* Boutons d'action */}
                <div className="mt-6 flex space-x-4">
                    <Link
                        to="/profile/edit"
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
