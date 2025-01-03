import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { TbPokeball } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // À ajuster selon l'état réel de l'authentification
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navigate = useNavigate();
    const refreshPage = () => {
        window.location.reload();
    };

    const handleLogout = () => {
        // Supprimer le token du stockage local
        localStorage.removeItem("authToken");

        // Rediriger vers la page de connexion
        navigate("/login");
        refreshPage();
    };

    return (
        // Si l'utilisateur n'est pas connecté, on cache la navbar
        <nav className={isAuthenticated ? "bg-gray-900 text-white p-4 shadow-md" : "hidden"}>
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                {/* Logo ou Titre de la Navbar */}
                <div className="flex items-center space-x-2">
                    <TbPokeball className="text-3xl text-yellow-500" />
                    <h1 className="text-xl font-bold">Pokédex</h1>
                </div>

                {/* Menu de navigation */}
                <div className="flex space-x-6">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <FaHome className="text-lg" />
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/about"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <FaInfoCircle className="text-lg" />
                        <span>About</span>
                    </Link>
                    <Link
                        to="/pokemons"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <TbPokeball className="text-lg" />
                        <span>Pokémon</span>
                    </Link>
                    <Link
                        to="/contact"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <FaEnvelope className="text-lg" />
                        <span>Contact</span>
                    </Link>
                </div>

                {/* Gestion du compte utilisateur */}
                {isAuthenticated && (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                        >
                            <FaUser className="text-lg" />
                        </button>

                        {/* Menu déroulant */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-gray-800 text-white shadow-lg rounded-md w-48">
                                <ul>
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 hover:bg-gray-700"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/my-teams"
                                            className="block px-4 py-2 hover:bg-gray-700"
                                        >
                                            My Teams
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-700"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
