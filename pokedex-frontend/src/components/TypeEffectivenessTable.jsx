import React, { useState, useEffect } from "react";
import axios from "axios";

const TypeEffectivenessTable = () => {
    const [types, setTypes] = useState([]);
    const [damageMatrix, setDamageMatrix] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTypeData = async () => {
            try {
                // Récupérer la liste des types
                const response = await axios.get("https://pokeapi.co/api/v2/type/");
                const allTypes = response.data.results.map(type => type.name);

                // Filtrer les types pour exclure "shadow" et "unknown"
                const filteredTypes = allTypes.filter(type => type !== "stellar" && type !== "unknown");

                // Récupérer les relations de dégâts pour chaque type filtré
                const damageData = {};
                for (const typeName of filteredTypes) {
                    const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${typeName}`);
                    const relations = typeResponse.data.damage_relations;

                    damageData[typeName] = {
                        double: relations.double_damage_to.map(t => t.name),
                        half: relations.half_damage_to.map(t => t.name),
                        none: relations.no_damage_to.map(t => t.name),
                    };
                }

                setTypes(filteredTypes);
                setDamageMatrix(damageData);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch type data:", error);
                setLoading(false);
            }
        };

        fetchTypeData();
    }, []);

    const getDamageMultiplier = (attackType, defenseType) => {
        if (damageMatrix[attackType]?.double.includes(defenseType)) return 2;
        if (damageMatrix[attackType]?.half.includes(defenseType)) return 0.5;
        if (damageMatrix[attackType]?.none.includes(defenseType)) return 0;
        return 1; // Par défaut
    };

    if (loading) {
        return <div className="text-center text-white">Loading Type Chart...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-700 w-full text-sm text-center text-white">
                <thead>
                    <tr>
                        <th className="border border-gray-700 bg-gray-800 px-4 py-2">Defense ↓ / Attack →</th>
                        {types.map(type => (
                            <th
                                key={type}
                                className="border border-gray-700 bg-gray-800 px-4 py-2 capitalize"
                            >
                                {type}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {types.map(defenseType => (
                        <tr key={defenseType}>
                            <td className="border border-gray-700 bg-gray-800 px-4 py-2 capitalize">
                                {defenseType}
                            </td>
                            {types.map(attackType => (
                                <td
                                    key={`${defenseType}-${attackType}`}
                                    className={`border border-gray-700 px-4 py-2 ${
                                        getDamageMultiplier(attackType, defenseType) === 2
                                            ? "bg-red-500"
                                            : getDamageMultiplier(attackType, defenseType) === 0.5
                                            ? "bg-blue-500"
                                            : getDamageMultiplier(attackType, defenseType) === 0
                                            ? "bg-gray-500"
                                            : "bg-green-500"
                                    }`}
                                >
                                    {getDamageMultiplier(attackType, defenseType)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TypeEffectivenessTable;
