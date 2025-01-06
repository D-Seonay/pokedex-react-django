import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PokemonList from './components/pokedex/PokemonList';
import PokemonDetail from './components/pokedex/PokemonDetail';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoute from './components/Auth/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Pokemondle from './components/Pokemondle';
import ItemList from './components/Items/ItemList';
import ItemDetail from './components/Items/ItemDetail';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import FeaturesIncoming from './components/FeatureIncoming';


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

                <Route path="/profile/edit" element={
                    <PrivateRoute>
                        <EditProfile />
                    </PrivateRoute>
                } />

                <Route path="/features-incoming" element={
                    <PrivateRoute>
                        <FeaturesIncoming />
                    </PrivateRoute>
                } />

                <Route path="/teams" element={
                    <PrivateRoute>
                        <FeaturesIncoming />
                    </PrivateRoute>
                } />

                <Route path="/leaderboard" element={
                    <PrivateRoute>
                        <FeaturesIncoming />
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
