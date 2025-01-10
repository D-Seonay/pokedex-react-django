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
import Leaderboard from './components/Leaderboard';
import ScoreManager from './components/ScoreManager';
import Error404 from './components/errors/Error404';
import TypeEffectivenessTable from './components/TypeEffectivenessTable';
import StarsBg from './components/ux/StarsBg';

const Layout = ({ children }) => (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        <StarsBg />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
    </div>
);


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><PrivateRoute><Home /></PrivateRoute></Layout>} />
                <Route path="/pokemons" element={<Layout><PrivateRoute><PokemonList /></PrivateRoute></Layout>} />
                <Route path="/pokemons/:id" element={<Layout><PrivateRoute><PokemonDetail /></PrivateRoute></Layout>} />
                <Route path="/items" element={<Layout><PrivateRoute><ItemList /></PrivateRoute></Layout>} />
                <Route path="/items/:id" element={<Layout><PrivateRoute><ItemDetail /></PrivateRoute></Layout>} />
                <Route path="/pokemondle" element={<Layout><PrivateRoute><Pokemondle /></PrivateRoute></Layout>} />
                <Route path="/profile" element={<Layout><PrivateRoute><Profile /></PrivateRoute></Layout>} />
                <Route path="/profile/edit" element={<Layout><PrivateRoute><EditProfile /></PrivateRoute></Layout>} />
                <Route path="/features-incoming" element={<Layout><PrivateRoute><FeaturesIncoming /></PrivateRoute></Layout>} />
                <Route path="/teams" element={<Layout><PrivateRoute><FeaturesIncoming /></PrivateRoute></Layout>} />
                <Route path="/leaderboard" element={<Layout><PrivateRoute><Leaderboard /></PrivateRoute></Layout>} />
                <Route path="/score-manager" element={<Layout><PrivateRoute><ScoreManager /></PrivateRoute></Layout>} />
                <Route path="/type-effectiveness" element={<Layout><PrivateRoute><TypeEffectivenessTable /></PrivateRoute></Layout>} />
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/login" element={<Layout><Login /></Layout>} />
                <Route path="*" element={<Layout><Error404 /></Layout>} />
            </Routes>
        </Router>
    );
};

export default App;
