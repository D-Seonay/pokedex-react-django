import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <PrivateRoute>
                <Navbar />
            </PrivateRoute>
            <Routes>

                <Route path="/" element={
                    <PrivateRoute>
                        <PokemonList />
                    </PrivateRoute>
                } />
                <Route path="/:id" element={
                    <PrivateRoute>
                        <PokemonDetail />
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
