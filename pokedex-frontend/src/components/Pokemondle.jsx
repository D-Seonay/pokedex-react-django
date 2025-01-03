import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonGame = () => {
    const [pokemons, setPokemons] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(null);
    const [guessedPokemon, setGuessedPokemon] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [debugMode, setDebugMode] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/pokemons/')
            .then((response) => {
                setPokemons(response.data);
                setCurrentPokemon(response.data[Math.floor(Math.random() * response.data.length)]);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleGuess = (guess) => {
        if (guesses.length >= 15) {
            alert("Vous avez atteint la limite de 15 propositions !");
            return;
        }

        const pokemon = pokemons.find(pokemon => pokemon.name.toLowerCase() === guess.toLowerCase());
        if (pokemon && !guesses.some(guess => guess.name.toLowerCase() === pokemon.name.toLowerCase())) {
            setGuesses([...guesses, pokemon]);
        } else {
            alert("Ce Pokémon a déjà été deviné !");
        }
    };

    const getCellClass = (attribute, value) => {
        if (!currentPokemon) return '';
        if (currentPokemon[attribute] === value) return 'bg-green-500';
        if (attribute === 'types' || attribute === 'color' || attribute === 'habitat') {
            return currentPokemon[attribute]?.toLowerCase() === value?.toLowerCase() ? 'bg-orange-500' : 'bg-red-500';
        }
        return 'bg-red-500';
    };

    const renderGuesses = () => {
        return guesses.map((pokemon, index) => (
            <tr key={index} className="text-center">
                <td className={`p-2 ${getCellClass('name', pokemon.name)}`}>{pokemon.name}</td>
                <td className={`p-2 ${getCellClass('height', pokemon.height)}`}>{pokemon.height}</td>
                <td className={`p-2 ${getCellClass('weight', pokemon.weight)}`}>{pokemon.weight}</td>
                <td className={`p-2 ${getCellClass('types', pokemon.types)}`}>{pokemon.types}</td>
                <td className={`p-2 ${getCellClass('habitat', pokemon.habitat)}`}>{pokemon.habitat}</td>
                <td className={`p-2 ${getCellClass('evolution_level', pokemon.evolution_level)}`}>{pokemon.evolution_level}</td>
                <td className={`p-2 ${getCellClass('color', pokemon.color)}`}>{pokemon.color}</td>
            </tr>
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans p-6">
            <h1 className="text-4xl font-bold text-center mb-10">Pokédle</h1>

            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setDebugMode(!debugMode)}
                    className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                    {debugMode ? 'Masquer Pokémon' : 'Afficher Pokémon'}
                </button>
            </div>

            {debugMode && currentPokemon && (
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold">Pokémon à deviner :</h2>
                    <p>Nom : {currentPokemon.name}</p>
                    <img src={currentPokemon.sprite} alt={currentPokemon.name} className="w-32 h-32 mx-auto mt-4" />
                </div>
            )}

            <div className="mb-8 flex justify-center">
                <input
                    type="text"
                    value={guessedPokemon}
                    onChange={(e) => setGuessedPokemon(e.target.value)}
                    className="w-2/3 sm:w-1/2 md:w-1/3 p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Devinez un Pokémon..."
                />
                <button
                    onClick={() => handleGuess(guessedPokemon)}
                    className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Deviner
                </button>
            </div>

            <div className="mb-8">
                <h2 className="text-xl mb-4">Propositions :</h2>
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-2">Nom</th>
                            <th className="p-2">Taille</th>
                            <th className="p-2">Poids</th>
                            <th className="p-2">Types</th>
                            <th className="p-2">Habitat</th>
                            <th className="p-2">Évolution</th>
                            <th className="p-2">Couleur</th>
                        </tr>
                    </thead>
                    <tbody>{renderGuesses()}</tbody>
                </table>
            </div>
        </div>
    );
};

export default PokemonGame;
