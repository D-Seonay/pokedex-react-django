import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        favorite_pokemon: "",
    });

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

                setUser(response.data);
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    favorite_pokemon: response.data.profile?.favorite_pokemon || "",
                });
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user data. Please try again later. " + err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authentication token found.");
                return;
            }

            await axios.put(
                "http://localhost:8000/api/user/profile/update/",
                formData,
                {
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            navigate("/profile"); // Redirection vers la page du profil
        } catch (err) {
            console.error(err);
            setError("Failed to update profile. Please try again later.");
        }
    };

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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
                    <p className="text-gray-400">Update your profile information</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-bold mb-2" htmlFor="favorite_pokemon">
                            Favorite Pokémon
                        </label>
                        <input
                            type="text"
                            id="favorite_pokemon"
                            name="favorite_pokemon"
                            value={formData.favorite_pokemon}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
