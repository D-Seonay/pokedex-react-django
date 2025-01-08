import React, { useEffect, useState } from "react";
import axios from "axios";

const TypeEffectivenessTable = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/type");
                const typeData = response.data.results;

                const detailedTypes = await Promise.all(
                    typeData.map(async (type) => {
                        const typeResponse = await axios.get(type.url);
                        return {
                            name: type.name,
                            damageRelations: typeResponse.data.damage_relations,
                        };
                    })
                );

                setTypes(detailedTypes);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching types:", err);
                setError("Failed to fetch type data.");
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Type Effectiveness Table</h1>

            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border border-gray-700 w-full text-sm">
                    <thead>
                        <tr>
                            <th className="border border-gray-700 px-4 py-2">Type</th>
                            <th className="border border-gray-700 px-4 py-2">Double Damage To</th>
                            <th className="border border-gray-700 px-4 py-2">Half Damage To</th>
                            <th className="border border-gray-700 px-4 py-2">No Damage To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map((type) => (
                            <tr key={type.name} className="odd:bg-gray-800 even:bg-gray-700">
                                <td className="border border-gray-700 px-4 py-2 capitalize font-bold">
                                    {type.name}
                                </td>
                                <td className="border border-gray-700 px-4 py-2">
                                    {type.damageRelations.double_damage_to.length > 0
                                        ? type.damageRelations.double_damage_to
                                              .map((t) => t.name)
                                              .join(", ")
                                        : "None"}
                                </td>
                                <td className="border border-gray-700 px-4 py-2">
                                    {type.damageRelations.half_damage_to.length > 0
                                        ? type.damageRelations.half_damage_to
                                              .map((t) => t.name)
                                              .join(", ")
                                        : "None"}
                                </td>
                                <td className="border border-gray-700 px-4 py-2">
                                    {type.damageRelations.no_damage_to.length > 0
                                        ? type.damageRelations.no_damage_to
                                              .map((t) => t.name)
                                              .join(", ")
                                        : "None"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TypeEffectivenessTable;
    