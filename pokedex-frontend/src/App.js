import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Pokemondle from './components/Pokemondle';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import Profile from './components/Profile';

const App = () => {
    return (
        <Router>
            <PrivateRoute>
                <Navbar />
            </PrivateRoute>
            <Routes>

                <Route path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path="/pokemons" element={
                    <PrivateRoute>
                        <PokemonList />
                    </PrivateRoute>
                } />
                <Route path="/pokemons/:id" element={
                    <PrivateRoute>
                        <PokemonDetail />
                    </PrivateRoute>
                } />

                <Route path="/items" element={
                    <PrivateRoute>
                        <ItemList />
                    </PrivateRoute>
                } />

                <Route path="/items/:id" element={
                    <PrivateRoute>
                        <ItemDetail />
                    </PrivateRoute>
                } />

                <Route path="/pokemondle" element={
                    <PrivateRoute>
                        <Pokemondle />
                    </PrivateRoute>
                } />

                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <PrivateRoute>
                <Footer />
            </PrivateRoute>
        </Router>
    );
};

export default App;
