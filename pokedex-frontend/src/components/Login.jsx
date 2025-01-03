import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setIdentifier] = useState(""); // Peut être un email ou un username
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const refreshPage = () => {
        window.location.reload();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/login/", {
                username,
                password,
            });
            const { token } = response.data; // Récupère le token si l'authentification réussit
            localStorage.setItem("token", token); // Stocke le token dans le localStorage
            localStorage.setItem("authToken", token); // Stocke le token dans le localStorage
            navigate("/"); // Redirige vers la page d'accueil
            refreshPage();
        } catch (err) {
            setError("Invalid credentials. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-gray-400 mb-2">
                            Username or Email
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            value={username}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter your username or email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-400 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
