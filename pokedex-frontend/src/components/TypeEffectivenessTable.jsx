import React, { useState, useEffect } from "react";
import axios from "axios";

const TypeEffectivenessTable = () => {
    const [types, setTypes] = useState([]);
    const [damageMatrix, setDamageMatrix] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTypeData = async () => {
            try {
                const response = await axios.get("https://pokeapi.co/api/v2/type/");
                const allTypes = response.data.results;

                const filteredTypes = allTypes.filter(
                    (type) => type.name !== "stellar" && type.name !== "unknown"
                );

                const damageData = {};
                const typesWithId = [];

                for (const type of filteredTypes) {
                    const typeResponse = await axios.get(type.url);
                    const relations = typeResponse.data.damage_relations;

                    damageData[type.name] = {
                        id: typeResponse.data.id,
                        double: relations.double_damage_to.map((t) => t.name),
                        half: relations.half_damage_to.map((t) => t.name),
                        none: relations.no_damage_to.map((t) => t.name),
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/${typeResponse.data.id}.png`,
                    };

                    typesWithId.push({
                        name: type.name,
                        id: typeResponse.data.id,
                    });
                }

                typesWithId.sort((a, b) => a.id - b.id);

                setTypes(typesWithId);
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
        return 1;
    };

    if (loading) {
        return <div className="text-center text-white">Loading Type Chart...</div>;
    }

    return (
        <div className="overflow-x-auto w-full h-full bg-gray-900 p-3">
            <table className="table-auto border-collapse border border-gray-700 text-xs sm:text-sm text-center text-white bg-gray-900 rounded-lg w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-700 bg-gray-800 px-2 sm:px-4 py-2">
                            Defense ↓ / Attack →
                        </th>
                        {types.map((type) => (
                            <th
                                key={type.name}
                                className="border border-gray-700 bg-gray-800 px-1 sm:px-1 py-2"
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        src={damageMatrix[type.name]?.sprite}
                                        alt={type.name}
                                    />
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {types.map((defenseType) => (
                        <tr key={defenseType.name}>
                            <td className="border border-gray-700 bg-gray-800 px-2 sm:px-4 py-2">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={damageMatrix[defenseType.name]?.sprite}
                                        alt={defenseType.name}
                                    />
                                </div>
                            </td>
                            {types.map((attackType) => (
                                <td
                                    key={`${defenseType.name}-${attackType.name}`}
                                    className={`border border-gray-700 px-2 sm:px-4 py-2 ${
                                        getDamageMultiplier(attackType.name, defenseType.name) === 2
                                            ? "bg-red-500"
                                            : getDamageMultiplier(attackType.name, defenseType.name) === 0.5
                                            ? "bg-blue-500"
                                            : getDamageMultiplier(attackType.name, defenseType.name) === 0
                                            ? "bg-gray-500"
                                            : "bg-green-500"
                                    }`}
                                >
                                    {getDamageMultiplier(attackType.name, defenseType.name)}
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
