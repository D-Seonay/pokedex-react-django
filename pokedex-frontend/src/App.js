import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/:id" element={<PokemonDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
