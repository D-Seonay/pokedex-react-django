import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import StarsBg from "../ux/StarsBg";
import FloatingCard from "../ux/FloatingCard";

const Login = () => {
    const [username, setIdentifier] = useState("");
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
            const { token } = response.data;
            localStorage.setItem("token", token);
            navigate("/");
            refreshPage();
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
            {/* Arrière-plan étoiles */}
            <StarsBg />

            {/* Carte flottante avec animation */}
            <FloatingCard>
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    Login
                </h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-gray-400 mb-2">
                            Email or Username
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            value={username}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white"
                            placeholder="Enter your email or username"
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
                            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 font-semibold"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </FloatingCard>

            {/* Pied de page */}
            <div className="absolute bottom-4 text-center w-full text-gray-500 text-sm z-10">
                    This is a demo project for educational purposes. Not affiliated with Nintendo.
            </div>
        </div>
    );
};

export default Login;
