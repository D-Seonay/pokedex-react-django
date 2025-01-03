import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/pokemons/')
            .then((response) => setPokemons(response.data))
            .catch((error) => console.error(error));
    }, []);

    // Fonction pour filtrer les pokémons
    const filteredPokemons = pokemons.filter((pokemon) => {
        const query = searchQuery.toLowerCase();
        const nameMatch = pokemon.name.toLowerCase().includes(query);
        const typeMatch = pokemon.types.toLowerCase().includes(query);
        const numberMatch = pokemon.number.toString().includes(query);
        return nameMatch || typeMatch || numberMatch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans p-6">
            <h1 className="text-4xl font-bold text-center mb-10">Pokédex</h1>
            <LogoutButton />

            {/* Barre de recherche */}
            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Rechercher un Pokémon..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-2/3 sm:w-1/2 md:w-1/3 p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Grid des cartes */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredPokemons.length === 0 ? (
                    <p className="text-center col-span-full">Aucun Pokémon trouvé...</p>
                ) : (
                    filteredPokemons.map((pokemon) => (
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
