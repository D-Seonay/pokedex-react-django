import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonGame = () => {
    const [pokemons, setPokemons] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(null);
    const [guessedPokemon, setGuessedPokemon] = useState('');
    const [similarity, setSimilarity] = useState(null);
    const [guesses, setGuesses] = useState([]);

    useEffect(() => {
        // Charger la liste des pokemons depuis l'API
        axios.get('http://127.0.0.1:8000/api/pokemons/')
            .then((response) => {
                setPokemons(response.data);
                setCurrentPokemon(response.data[Math.floor(Math.random() * response.data.length)]);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleGuess = (guess) => {
        const pokemon = pokemons.find(pokemon => pokemon.name.toLowerCase() === guess.toLowerCase());
        if (pokemon && !guesses.some(guess => guess.pokemon.name.toLowerCase() === pokemon.name.toLowerCase())) {
            const similarityScore = calculateSimilarity(pokemon);
            setSimilarity(similarityScore);

            // Ajouter la tentative à l'historique des tentatives avec toutes les données du Pokémon
            setGuesses([...guesses, { pokemon, similarity: similarityScore }]);
        } else {
            alert("Ce Pokémon a déjà été deviné !");
        }
    };

    // Calcul de la similarité entre le Pokémon deviné et le Pokémon actuel
    const calculateSimilarity = (guessedPokemon) => {
        let similarityScore = 0;

        // Comparer le nom
        if (guessedPokemon.name && currentPokemon.name && guessedPokemon.name.toLowerCase() === currentPokemon.name.toLowerCase()) {
            similarityScore += 2;  // Bonus élevé pour le nom
        }

        // Comparer la taille
        if (guessedPokemon.height === currentPokemon.height) {
            similarityScore += 1;
        }

        // Comparer le poids
        if (guessedPokemon.weight === currentPokemon.weight) {
            similarityScore += 1;
        }

        // Comparer le type
        if (guessedPokemon.types && currentPokemon.types && guessedPokemon.types.toLowerCase() === currentPokemon.types.toLowerCase()) {
            similarityScore += 1;
        }

        // Comparer l'habitat
        if (guessedPokemon.habitat && currentPokemon.habitat && guessedPokemon.habitat.toLowerCase() === currentPokemon.habitat.toLowerCase()) {
            similarityScore += 1;
        }

        // Comparer le niveau d'évolution
        if (guessedPokemon.evolution_level === currentPokemon.evolution_level) {
            similarityScore += 1;
        }

        // Comparer la couleur
        if (guessedPokemon.color && currentPokemon.color && guessedPokemon.color.toLowerCase() === currentPokemon.color.toLowerCase()) {
            similarityScore += 1;
        }

        return similarityScore;
    };

    // Fonction pour afficher un tableau avec les tentatives
    const renderGuesses = () => {
        return guesses.map((guess, index) => {
            return (
                <tr key={index}>
                    <td className="p-2 flex items-center">
                        <img src={guess.pokemon.sprite} alt={guess.pokemon.name} className="w-8 h-8 mr-2" />
                        {guess.pokemon.name}
                    </td>
                    <td className="p-2">{guess.pokemon.height}</td>
                    <td className="p-2">{guess.pokemon.weight}</td>
                    <td className="p-2">{guess.pokemon.types}</td>
                    <td className="p-2">{guess.pokemon.habitat}</td>
                    <td className="p-2">{guess.pokemon.evolution_level}</td>
                    <td className="p-2">{guess.pokemon.color}</td>
                    <td className="p-2">{guess.similarity}</td>
                    <td className="p-2">
                        {renderCommonAttributes(guess.pokemon)}
                    </td>
                </tr>
            );
        });
    };

    // Fonction pour rendre les points communs avec surbrillance verte
    const renderCommonAttributes = (guessedPokemon) => {
        const commonAttributes = [];

        // Vérifications avant de comparer
        if (guessedPokemon.name && currentPokemon.name && guessedPokemon.name.toLowerCase() === currentPokemon.name.toLowerCase()) {
            commonAttributes.push('name');
        }
        if (guessedPokemon.height === currentPokemon.height) {
            commonAttributes.push('height');
        }
        if (guessedPokemon.weight === currentPokemon.weight) {
            commonAttributes.push('weight');
        }
        if (guessedPokemon.types && currentPokemon.types && guessedPokemon.types.toLowerCase() === currentPokemon.types.toLowerCase()) {
            commonAttributes.push('types');
        }
        if (guessedPokemon.habitat && currentPokemon.habitat && guessedPokemon.habitat.toLowerCase() === currentPokemon.habitat.toLowerCase()) {
            commonAttributes.push('habitat');
        }
        if (guessedPokemon.evolution_level === currentPokemon.evolution_level) {
            commonAttributes.push('evolution_level');
        }
        if (guessedPokemon.color && currentPokemon.color && guessedPokemon.color.toLowerCase() === currentPokemon.color.toLowerCase()) {
            commonAttributes.push('color');
        }

        return commonAttributes.length ? (
            <span style={{ color: '#28a745' }}>
                {commonAttributes.join(', ')}
            </span>
        ) : (
            <span>Aucun attribut commun</span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-sans p-6">
            <h1 className="text-4xl font-bold text-center mb-10">Pokédle</h1>

            {/* Entrée pour deviner un Pokémon */}
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

            {/* Affichage de la barre de propositions avec un tableau détaillé */}
            <div className="mb-8">
                <h2 className="text-xl mb-4">Propositions :</h2>
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr>
                            <th className="p-2">Pokémon</th>
                            <th className="p-2">Taille</th>
                            <th className="p-2">Poids</th>
                            <th className="p-2">Types</th>
                            <th className="p-2">Habitat</th>
                            <th className="p-2">Niveau d'Évolution</th>
                            <th className="p-2">Couleur</th>
                            <th className="p-2">Points communs</th>
                            <th className="p-2">Attributs en commun</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderGuesses()}
                    </tbody>
                </table>
            </div>

            {/* Affichage de la similarité */}
            {similarity !== null && (
                <div className="text-center mt-4">
                    <p>Points communs : {similarity}</p>
                </div>
            )}
        </div>
    );
};

export default PokemonGame;
