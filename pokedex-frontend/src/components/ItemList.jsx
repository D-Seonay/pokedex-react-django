import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/items/");
                setItems(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch items. Please try again later.");
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

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

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Item List</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-gray-800 rounded-lg shadow-md p-4 hover:scale-105 transform transition duration-300"
                        >
                            <Link to={`/items/${item.id}`} className="no-underline">
                                {/* Image */}
                                <div className="relative flex justify-center mb-4">
                                    <div className="absolute inset-0 w-20 h-20 bg-gray-700 blur-xl rounded-full animate-pulse" />
                                    <img
                                        src={item.sprites.default}
                                        alt={item.name}
                                        className="relative z-10 w-20 h-20"
                                    />
                                </div>

                            {/* Name */}
                            <h2 className="text-xl font-bold text-center">{item.name}</h2>

                            {/* Description */}
                            <p className="text-sm text-gray-400 text-center mb-4">
                                {item.short_description}
                            </p>

                            {/* View More */}

                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
