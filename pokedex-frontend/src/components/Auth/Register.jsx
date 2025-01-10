import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { IoEyeSharp } from "react-icons/io5";


const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        try {
            console.log("Sending data:", { username, email, password });
            const response = await axios.post("http://localhost:8000/api/register/", {
                username,
                email,
                password,
            });
            console.log("Registration successful:", response.data);
            setSuccess("Registration successful!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to register. Please try again.";
            setError(errorMessage);
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
            {/* Arrière-plan étoiles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute bg-gradient-to-r from-blue-700 via-purple-900 to-black opacity-30 rounded-full w-[600px] h-[600px] blur-3xl top-[-200px] left-[-200px]" />
                <div className="absolute bg-gradient-to-r from-pink-500 to-purple-800 opacity-20 rounded-full w-[500px] h-[500px] blur-2xl bottom-[-150px] right-[-150px]" />
            </div>

            {/* Animation des étoiles */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {[...Array(50)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="absolute bg-white rounded-full"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        style={{
                            width: `${Math.random() * 3 + 2}px`,
                            height: `${Math.random() * 3 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Carte flottante avec animation */}
            <motion.div
                className="relative bg-black/60 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 z-10"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    Register
                </h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-400 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-400 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-400 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-400 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 text-white"
                            placeholder="Confirm your password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white focus:outline-none"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                        </div>

                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.div>

            {/* Pied de page */}
            <div className="absolute bottom-4 text-center w-full text-gray-500 text-sm z-10">
                This is a demo project for educational purposes. Not affiliated with Nintendo.
            </div>
        </div>
    );
};

export default Register;
