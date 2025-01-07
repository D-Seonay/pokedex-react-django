import React from "react";
import { Link } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile/Profile";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Bienvenue sur Pokédex</h1>
            <p className="text-center">
                <Link to="/pokemons" className="text-blue-500">
                    Voir la liste des Pokémons
                </Link>
            </p>
            <p className="text-center">
                <Link to="/items" className="text-blue-500">
                    Voir la liste des objets
                </Link>
            </p>
            <p className="text-center">
                <Link to="/pokemondle" className="text-blue-500">
                    Jouer à Pokémondle
                </Link>
            </p>
            <div className="mt-4">
                <Profile />
            </div>
            <div className="mt-4">
                <Leaderboard />
            </div>
        </div>
    );
};

export default Home;
