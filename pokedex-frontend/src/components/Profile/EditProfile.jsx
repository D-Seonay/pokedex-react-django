import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pokemonList, setPokemonList] = useState([]); // Liste des Pokémon avec sprites
    const [dropdownOpen, setDropdownOpen] = useState(false); // État du menu déroulant
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        favorite_pokemon: "",
    });
    const [profilePicture, setProfilePicture] = useState(null); // État pour l'image de profil

    const navigate = useNavigate();

    // Récupération des données utilisateur et des Pokémon
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No authentication token found.");
                    setLoading(false);
                    return;
                }

                // Récupération des données utilisateur
                const userResponse = await axios.get("http://localhost:8000/api/user/profile/", {
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                setUser(userResponse.data);
                setFormData({
                    username: userResponse.data.username,
                    email: userResponse.data.email,
                    favorite_pokemon: userResponse.data.profile?.favorite_pokemon || "",
                });

                // Récupération des Pokémon depuis l'API
                const pokemonResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
                const pokemonDetails = await Promise.all(
                    pokemonResponse.data.results.map(async (pokemon) => {
                        const details = await axios.get(pokemon.url);
                        return {
                            name: pokemon.name,
                            sprite: details.data.sprites.front_default,
                        };
                    })
                );
                setPokemonList(pokemonDetails);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data. Please try again later. " + err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFavoriteSelect = (pokemonName) => {
        setFormData({
            ...formData,
            favorite_pokemon: pokemonName,
        });
        setDropdownOpen(false); // Fermer le menu déroulant après la sélection
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            setError("No authentication token found.");
            return;
        }

        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email);
        form.append("favorite_pokemon", formData.favorite_pokemon);

        // Ajoutez l'image de profil si elle est présente
        if (profilePicture) {
            form.append("profile_picture", profilePicture);
        }

        try {
            await axios.put(
                "http://localhost:8000/api/user/profile/update/",
                form,
                {
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "multipart/form-data", // Spécifiez que c'est du multipart
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

                    {/* Favorite Pokémon */}
                    <div>
                        <label className="block text-gray-300 font-bold mb-2" htmlFor="favorite_pokemon">
                            Favorite Pokémon
                        </label>
                        <div className="relative">
                            <button
                                type="button"
                                className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {formData.favorite_pokemon
                                    ? formData.favorite_pokemon.charAt(0).toUpperCase() +
                                      formData.favorite_pokemon.slice(1)
                                    : "Select your favorite Pokémon"}
                            </button>

                            {dropdownOpen && (
                                <div className="absolute z-10 w-full bg-gray-800 rounded-lg shadow-md mt-2 max-h-60 overflow-y-auto">
                                    {pokemonList.map((pokemon) => (
                                        <div
                                            key={pokemon.name}
                                            className={`flex items-center px-4 py-2 cursor-pointer ${
                                                formData.favorite_pokemon === pokemon.name
                                                    ? "bg-blue-600"
                                                    : "hover:bg-gray-700"
                                            }`}
                                            onClick={() => handleFavoriteSelect(pokemon.name)}
                                        >
                                            <img
                                                src={pokemon.sprite}
                                                alt={pokemon.name}
                                                className="w-8 h-8 mr-3"
                                            />
                                            <span>
                                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="block text-gray-300 font-bold mb-2" htmlFor="profile_picture">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profile_picture"
                            name="profile_picture"
                            accept="image/*"
                            onChange={(e) => setProfilePicture(e.target.files[0])}
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
