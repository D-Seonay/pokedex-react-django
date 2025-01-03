import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaEnvelope, FaUser } from 'react-icons/fa';
import { TbPokeball } from 'react-icons/tb';
import { RxHamburgerMenu } from "react-icons/rx";

import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // À ajuster selon l'état réel de l'authentification
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Etat pour ouvrir et fermer le menu burger

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const navigate = useNavigate();
    const refreshPage = () => {
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
        refreshPage();
    };

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md relative">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                {/* Logo ou Titre de la Navbar */}
                <div className="flex items-center space-x-2">
                    <TbPokeball className="text-3xl text-yellow-500" />
                    <h1 className="text-xl font-bold">Pokédex</h1>
                </div>

                {/* Menu burger pour mobile */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden text-white focus:outline-none"
                >
                    <RxHamburgerMenu className="w-8 h-8" />
                </button>

                {/* Menu de navigation (pour mobile et desktop) */}
                <div className={`lg:flex space-x-6 ${menuOpen ? 'hidden' : 'hidden'} lg:block`}>
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
                        to="/pokemondle"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <TbPokeball className="text-lg" />
                        <span>Pokédle</span>
                    </Link>
                    <Link
                        to="/contact"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300"
                    >
                        <FaEnvelope className="text-lg" />
                        <span>Contact</span>
                    </Link>
                </div>
            </div>

            {/* Menu burger plein écran */}
            {menuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center space-y-6">
                    <button
                        onClick={toggleMenu}
                        className="absolute top-4 right-4 text-white text-3xl"
                    >
                        <RxHamburgerMenu />
                    </button>
                    <Link
                        to="/"
                        className="text-2xl text-white hover:text-yellow-500 transition-all duration-300"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-2xl text-white hover:text-yellow-500 transition-all duration-300"
                    >
                        About
                    </Link>
                    <Link
                        to="/pokemons"
                        className="text-2xl text-white hover:text-yellow-500 transition-all duration-300"
                    >
                        Pokémon
                    </Link>
                    <Link
                        to="/pokemondle"
                        className="text-2xl text-white hover:text-yellow-500 transition-all duration-300"
                    >
                        Pokédle
                    </Link>
                    <Link
                        to="/contact"
                        className="text-2xl text-white hover:text-yellow-500 transition-all duration-300"
                    >
                        Contact
                    </Link>
                    {/* Gestion du compte utilisateur */}
                    {isAuthenticated && (
                        <div className="text-white mt-6">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2"
                            >
                                <FaUser className="text-xl" />
                                <span>Account</span>
                            </button>

                            {/* Menu déroulant */}
                            {dropdownOpen && (
                                <div className="mt-4 flex flex-col items-center space-y-2">
                                    <Link
                                        to="/profile"
                                        className="text-white text-lg hover:text-yellow-500 transition-all duration-300"
                                        onClick={toggleMenu}
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        to="/my-teams"
                                        className="text-white text-lg hover:text-yellow-500 transition-all duration-300"
                                        onClick={toggleMenu}
                                    >
                                        My Teams
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-500 text-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
