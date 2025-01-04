import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ItemDetail = () => {
    const { id } = useParams(); // Récupérer l'ID depuis l'URL
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/items/${id}/`);
                setItem(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch item details. Please try again later.");
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <p className="text-white text-lg">Item not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <Link to="/items" className="text-gray-400 hover:text-gray-200">
                        ← Back to List
                    </Link>
                    <h1 className="text-xl font-bold">Item Details</h1>
                </div>

                {/* Image */}
                <div className="relative flex justify-center mb-6">
                    <div className="absolute inset-0 w-36 h-36 bg-gray-700 blur-xl rounded-full animate-pulse" />
                    <img
                        src={item.sprites.default}
                        alt={item.name}
                        className="relative z-10 w-36 h-36"
                    />
                </div>

                {/* Name and Description */}
                <h2 className="text-3xl font-bold text-center mb-2">{item.name}</h2>
                <p className="text-center text-gray-400 mb-6">
                    {item.short_description || "No short description available."}
                </p>

                {/* Details Section */}
                <div className="text-sm space-y-4">
                    <p>
                        <span className="font-bold text-gray-300">Category:</span>{" "}
                        {item.category || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Price:</span>{" "}
                        {item.cost > 0 ? `$${item.cost}` : "Free"}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Fling Power:</span>{" "}
                        {item.fling_power !== null ? item.fling_power : "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Fling Effect:</span>{" "}
                        {item.fling_effect || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Attributes:</span>{" "}
                        {item.attributes.length > 0 ? item.attributes.join(", ") : "None"}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Held by Pokémon:</span>{" "}
                        {item.held_by_pokemon.length > 0
                            ? item.held_by_pokemon.join(", ")
                            : "None"}
                    </p>
                    <p>
                        <span className="font-bold text-gray-300">Description:</span>{" "}
                        {item.long_description || "No description available."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
