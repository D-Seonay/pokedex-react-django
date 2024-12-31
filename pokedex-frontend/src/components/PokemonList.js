import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/pokemons/')
            .then(response => setPokemons(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Pokédex</h1>
            <ul>
                {pokemons.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    pokemons.map(pokemon => (
                        <li key={pokemon.name}>{pokemon.name}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PokemonList;
