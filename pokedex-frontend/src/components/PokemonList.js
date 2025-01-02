import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/pokemons/')
            .then((response) => setPokemons(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans p-6">
            <h1 className="text-4xl font-bold text-center mb-10">Pokédex</h1>

            {/* Grid des cartes */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {pokemons.length === 0 ? (
                    <p className="text-center col-span-full">Loading...</p>
                ) : (
                    pokemons.map((pokemon) => (
                        <li
                            key={pokemon.id}
                            className="relative p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
                        >
                            <Link to={`/${pokemon.id}`} className="text-white no-underline">
                                {/* Sprite */}
                                <div className="flex justify-center">
                                    <img
                                        src={pokemon.sprite}
                                        alt={pokemon.name}
                                        className="w-20 h-20 mb-3"
                                    />
                                </div>

                                {/* Détails du Pokémon */}
                                <div className="text-center">
                                    <p className="text-lg font-bold">
                                        #{pokemon.number} - {pokemon.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {pokemon.types}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PokemonList;
