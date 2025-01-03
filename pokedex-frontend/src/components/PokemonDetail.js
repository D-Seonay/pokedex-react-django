import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaCircle, FaStar, FaRegPlayCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PokemonDetail = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [statAnimation, setStatAnimation] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const [spriteType, setSpriteType] = useState('normal');
    const location = useLocation();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/pokemons/${id}/`)
            .then((response) => {
                const data = response.data;
                let moves = [];
                let evolutions = [];
                try {
                    const movesString = data.moves.replace(/'/g, '"');
                    moves = JSON.parse(movesString);
                } catch (e) {
                    console.error('Invalid JSON for moves:', e);
                }

                try {
                    const evolutionsString = data.evolutions.replace(/'/g, '"');
                    evolutions = JSON.parse(evolutionsString);
                } catch (e) {
                    console.error('Invalid JSON for evolutions:', e);
                }

                setPokemon({ ...data, moves, evolutions });

                setTimeout(() => setStatAnimation(true), 500);
            })
            .catch((error) => console.error(error));
    }, [id]);

    if (!pokemon) {
        return <p className="text-center text-white">Loading...</p>;
    }

    const renderStatBar = (value, color) => (
        <div className="w-full bg-gray-700 rounded-full h-3 mb-1">
            <div
                className={`h-3 rounded-full ${color} transition-all duration-1000`}
                style={{ width: statAnimation ? `${(value / 255) * 100}%` : '0%' }}
            ></div>
        </div>
    );

    const getSprite = () => {
        if (spriteType === 'shiny') {
            return pokemon.chromatique_sprite;
        }
        if (spriteType === 'animated') {
            return pokemon.animated_front_sprite;
        }
        return pokemon.sprite;
    };

    const navigateToNextPokemon = () => {
        // Logique pour naviguer vers le prochain Pokémon
        const nextId = parseInt(id) + 1;
        window.location.href = `/${nextId}`;
    };

    const navigateToPrevPokemon = () => {
        // Logique pour naviguer vers le Pokémon précédent
        const prevId = parseInt(id) - 1;
        window.location.href = `/${prevId}`;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans p-6">
            <div className="max-w-lg mx-auto bg-gray-800 rounded-lg shadow-md p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <Link to="/" className="text-gray-400 hover:text-gray-200">
                        ← Back
                    </Link>
                    <h1 className="text-xl font-bold">{`#${pokemon.number.toString().padStart(3, '0')}`}</h1>
                </div>

                {/* Navigation des Pokémon */}
                <div className="flex justify-between mb-6">
                    <button
                        onClick={navigateToPrevPokemon}
                        className="p-2 rounded-md text-white hover:bg-gray-700"
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        onClick={navigateToNextPokemon}
                        className="p-2 rounded-md text-white hover:bg-gray-700"
                    >
                        <FaArrowRight />
                    </button>
                </div>

                {/* Sprite avec effet blur */}
                <motion.div
                    className="relative flex justify-center mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="absolute inset-0 w-36 h-36 bg-gray-500 blur-xl rounded-full animate-pulse left-[150px]" />
                    <img
                        src={getSprite()}
                        alt={pokemon.name}
                        className="relative z-10 w-36 h-36"
                    />
                </motion.div>

                {/* Type de sprite */}
                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        className={`px-4 py-2 rounded-md ${spriteType === 'normal' ? 'bg-gray-600 text-white' : 'bg-gray-500'} flex items-center`}
                        onClick={() => setSpriteType('normal')}
                    >
                        <FaCircle className="inline-block mr-2" />
                        Normal
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${spriteType === 'shiny' ? 'bg-gray-600 text-white' : 'bg-gray-500'} flex items-center`}
                        onClick={() => setSpriteType('shiny')}
                    >
                        <FaStar className="inline-block mr-2" />
                        Shiny
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${spriteType === 'animated' ? 'bg-gray-600 text-white' : 'bg-gray-500'} flex items-center`}
                        onClick={() => setSpriteType('animated')}
                    >
                        <FaRegPlayCircle className="inline-block mr-2" />
                        Animated
                    </button>
                </div>

                {/* Pokémon Info */}
                <h2 className="text-3xl font-bold text-center">{pokemon.name}</h2>
                <p className="text-center text-gray-400">{pokemon.types}</p>

                {/* Stats */}
                {activeTab === 'about' && (
                    <div className="mt-6">
                        <div className="mb-4">
                            <p className="flex justify-between">
                                <span>Attack</span>
                                <span>{pokemon.attack}</span>
                            </p>
                            {renderStatBar(pokemon.attack, 'bg-red-500')}
                        </div>
                        <div className="mb-4">
                            <p className="flex justify-between">
                                <span>Defense</span>
                                <span>{pokemon.defense}</span>
                            </p>
                            {renderStatBar(pokemon.defense, 'bg-blue-500')}
                        </div>
                        <div className="mb-4">
                            <p className="flex justify-between">
                                <span>Sp. Atk</span>
                                <span>{pokemon.special_attack}</span>
                            </p>
                            {renderStatBar(pokemon.special_attack, 'bg-purple-500')}
                        </div>
                        <div className="mb-4">
                            <p className="flex justify-between">
                                <span>Sp. Def</span>
                                <span>{pokemon.special_defense}</span>
                            </p>
                            {renderStatBar(pokemon.special_defense, 'bg-green-500')}
                        </div>
                        <div className="mb-4">
                            <p className="flex justify-between">
                                <span>Speed</span>
                                <span>{pokemon.speed}</span>
                            </p>
                            {renderStatBar(pokemon.speed, 'bg-yellow-500')}
                        </div>
                    </div>
                )}

                {/* Tabs Section */}
                <div className="mt-6">
                    <div className="flex justify-around text-gray-400 text-sm">
                        <button
                            className={`hover:text-white ${activeTab === 'about' && 'text-white border-b-2 border-white rounded-t-md'}`}
                            onClick={() => setActiveTab('about')}
                        >
                            About
                        </button>
                        <button
                            className={`hover:text-white ${activeTab === 'moves' && 'text-white border-b-2 border-white rounded-t-md'}`}
                            onClick={() => setActiveTab('moves')}
                        >
                            Moves
                        </button>
                        <button
                            className={`hover:text-white ${activeTab === 'evolutions' && 'text-white border-b-2 border-white rounded-t-md'}`}
                            onClick={() => setActiveTab('evolutions')}
                        >
                            Evolutions
                        </button>
                        <button
                            className={`hover:text-white ${activeTab === 'general' && 'text-white border-b-2 border-white rounded-t-md'}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General
                        </button>
                    </div>
                </div>

                {/* Contenu des onglets */}
                <div className="mt-6 text-sm">
                    {activeTab === 'about' && (
                        <div>
                            <p className="text-gray-300">{pokemon.description}</p>
                        </div>
                    )}

                    {activeTab === 'moves' && (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Available Moves:</h3>
                            <ul className="list-disc pl-5">
                                {pokemon.moves.map((move, index) => (
                                    <li key={index} className="text-gray-300">
                                        {move}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'evolutions' && (
                        <div>
                            <h3 className="text-lg font-bold mb-2">Evolutions:</h3>
                            {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                                <div className="space-y-4 flex flex-col">
                                    {pokemon.evolutions.map((evolution, index) => {
                                        // Vérifie si l'ID de l'évolution correspond à l'URL actuelle
                                        const isActive = location.pathname === `/${evolution.id}`;
                                        return (
                                            <Link 
                                                to={`/${evolution.id}`} 
                                                key={index} 
                                                className={`flex items-center space-x-4 min-w-max ${isActive ? 'bg-gray-900' : 'bg-gray-700'} p-2 rounded-md hover:bg-gray-600`}
                                            >
                                                <img
                                                    src={evolution.sprite}
                                                    alt={evolution.name}
                                                    className="w-12 h-12 rounded-full"
                                                />
                                                <span className={`ml-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>{evolution.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-300">No evolutions available</p>
                            )}
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <div>
                            <p className="text-gray-300">Base Experience: {pokemon.base_experience}</p>
                            <p className="text-gray-300">Capture Rate: {pokemon.capture_rate}</p>
                            <p className="text-gray-300">Habitat: {pokemon.habitat}</p>
                            <p className="text-gray-300">Abilities: {pokemon.abilities}</p>
                        </div>
                    )}
                </div>

                {/* Audio */}
                <div className="mt-6 text-center">
                    <audio controls>
                        <source src={pokemon.cry_url} type="audio/ogg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
