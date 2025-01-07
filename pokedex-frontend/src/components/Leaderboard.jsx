import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/leaderboard/");
                setLeaderboard(response.data);
                console.log("Leaderboard data:", response.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch leaderboard.");
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
                <ul className="space-y-4">
                    {leaderboard.map((user, index) => (
                        <li
                            key={index}
                            className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                        >
                        <span className="text-lg font-bold">
                            {index + 1 === 1 && "🥇"}
                            {index + 1 === 2 && "🥈"}
                            {index + 1 === 3 && "🥉"}
                            {index + 1 > 3 && `${index + 1}.`} {user.username}
                        </span>
                            <span className="text-sm text-gray-300">
                                Score: {user.score}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <Link to="/score-manager" className="block text-center mt-4 text-blue-500">
                Gérer mon score
            </Link>
        </div>
    );
};

export default Leaderboard;
