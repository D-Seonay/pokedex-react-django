import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Section des liens */}
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-6 mb-4 sm:mb-0">
          <Link to="/" className="hover:text-yellow-500 transition-all duration-300">Home</Link>
          <Link to="/about" className="hover:text-yellow-500 transition-all duration-300">About</Link>
          <Link to="/pokemons" className="hover:text-yellow-500 transition-all duration-300">Pokémon</Link>
          <Link to="/contact" className="hover:text-yellow-500 transition-all duration-300">Contact</Link>
        </div>

        {/* Section des réseaux sociaux */}
        <div className="flex space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-all duration-300">
            <FaGithub className="text-2xl" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-all duration-300">
            <FaLinkedin className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-4">
        &copy; 2025 Pokédex. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
