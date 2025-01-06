import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { TbPokeball } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineTeam } from "react-icons/ai";
import { FaRankingStar } from "react-icons/fa6";


const Navbar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);  // Pour gérer l'ouverture du menu sur mobile
    const [userMenuOpen, setUserMenuOpen] = useState(false);  // Pour gérer le menu utilisateur déroulant
    const userMenuRef = useRef(null);  // Référence pour le menu utilisateur
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

                // Récupérer les données utilisateur
                const response = await axios.get("http://localhost:8000/api/user/profile/", {
                    headers: {
                        "Authorization": `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const userData = response.data;
                setUser(userData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user data. Please try again later.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        // Fonction pour fermer le menu utilisateur si on clique en dehors
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        // Ajouter l'écouteur d'événement
        document.addEventListener("mousedown", handleClickOutside);

        // Nettoyage de l'événement lors du démontage du composant
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                {/* Logo avec SVG Pokéball */}
                <Link to="/" className="text-2xl font-bold text-yellow-500 flex items-center space-x-2">
                    <TbPokeball className="h-8 w-8 text-yellow-500" />
                    <span className="text-lg">My Pokedex</span>
                </Link>

                {/* Icônes de navigation - menu normal */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <FaHome className="inline-block mr-2" /> Home
                    </Link>
                    {/* <Link to="/about" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <FaInfoCircle className="inline-block mr-2" /> About
                    </Link> */}
                    <Link to="/pokemons" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <TbPokeball className="inline-block mr-2" /> Pokémon
                    </Link>
                    <Link to="/items" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <TbPokeball className="inline-block mr-2" /> Items
                    </Link>
                    <Link to="/pokemondle" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <TbPokeball className="inline-block mr-2" /> Pokemondle
                    </Link>
                    {/* <Link to="/contact" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <FaEnvelope className="inline-block mr-2" /> Contact
                    </Link> */}
                </div>

                {/* Bouton profil utilisateur */}
                <div className="flex items-center space-x-4 relative">
                    {user ? (
                        <div>
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center space-x-2"
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                                    <img
                                        src={`http://localhost:8000${user.profile?.profile_picture}`}
                                        alt={`${user.username}'s profile`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span>{user.username}</span>
                            </button>

                            {/* Menu déroulant utilisateur */}
                            {userMenuOpen && (
                                <div ref={userMenuRef} className="absolute right-0 mt-2 bg-gray-800 p-2 rounded shadow-lg w-48">
                                    <Link
                                        to="/profile"
                                        className="block text-sm text-white hover:text-yellow-500 p-2"
                                    >
                                        <IoMdSettings className="inline-block mr-2" />
                                        Paramètres
                                    </Link>
                                    <Link
                                        to="/teams"
                                        className="block text-sm text-white hover:text-yellow-500 p-2"
                                    >
                                        <AiOutlineTeam className="inline-block mr-2" />
                                        Mes équipes
                                    </Link>
                                    <Link
                                        to="/leaderboard"
                                        className="block text-sm text-white hover:text-yellow-500 p-2"
                                    >
                                        <FaRankingStar className="inline-block mr-2" />
                                        Classement
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block text-sm text-white hover:text-yellow-500 p-2 w-full text-left"
                                    >
                                        <FiLogOut className="inline-block mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="text-xl hover:text-yellow-500 transition-all duration-300"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Menu mobile */}
                <button
                    className="md:hidden text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Menu mobile */}
            {menuOpen && (
                <div className="md:hidden bg-gray-800 p-4 space-y-4">
                    <Link to="/" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <FaHome className="inline-block mr-2" /> Home
                    </Link>
                    {/* <Link to="/about" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <FaInfoCircle className="inline-block mr-2" /> About
                    </Link> */}
                    <Link to="/pokemons" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <TbPokeball className="inline-block mr-2" /> Pokémon
                    </Link>
                    <Link to="/pokemondle" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        Pokédle
                        <TbPokeball className="inline-block ml-2" />
                    </Link>
                    {/* <Link to="/contact" className="text-xl hover:text-yellow-500 transition-all duration-300">
                        <FaEnvelope className="inline-block mr-2" /> Contact
                    </Link> */}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
