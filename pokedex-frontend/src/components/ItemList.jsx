import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/items/");
                setItems(response.data);
                setFilteredItems(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch items. Please try again later.");
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        let filtered = items;

        // Filtrer par catégorie
        if (selectedCategory) {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Filtrer par nom de l'élément
        if (searchQuery) {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredItems(filtered);
    }, [searchQuery, selectedCategory, items]);

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

                {/* Barre de recherche */}
                <div className="mb-6 flex justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="px-4 py-2 rounded-lg bg-gray-700 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Filtre par catégorie */}
                    <select
                        className="px-4 py-2 rounded-lg bg-gray-700 text-white"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Filter by category</option>
                        {/* Vous pouvez remplir cette liste avec des catégories disponibles */}
                        <option value="standard-balls">Standard Balls</option>
                        <option value="special-balls">Special Balls</option>
                        <option value="healing">Healing</option>
                        <option value="status-cures">Status Cure</option>
                        <option value="revival">Revival</option>
                        <option value="stat-boosts">Stat Boost</option>
                        <option value="pp-recovery">PP Recovery</option>
                        <option value="evolution">Evolution</option>
                        <option value="plates">Plates</option>
                        <option value="effort-training">Effort Training</option>
                        <option value="vitamins">Vitamins</option>
                        <option value="medicine">Medicine</option>
                        <option value="picky-healing">Picky Healing</option>
                        <option value="all-mail">All Mail</option>  
                        <option value="flutes">Flutes</option>
                        <option value="mulch">Mulch</option>
                        <option value="scarves">Scarves</option>
                        <option value="loot">Loot</option>
                        <option value="gameplay">Gameplay</option>
                        <option value="event-items">Event Items</option>
                        <option value="plot-advancement">Plot Advancement</option>
                        <option value="mega-stones">Mega Stones</option>
                        <option value="z-crystals">Z-Crystals</option>
                        <option value="dex-completion">Dex Completion</option>
                        {/* Ajoutez d'autres catégories si nécessaire */}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6">
                    {filteredItems.map((item) => (
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

                                {/* Nom */}
                                <h2 className="text-xl font-bold text-center">{item.name}</h2>

                                {/* Description */}
                                <p className="text-sm text-gray-400 text-center mb-4">
                                    {item.category}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
