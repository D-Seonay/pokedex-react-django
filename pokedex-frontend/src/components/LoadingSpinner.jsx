import React from "react";
import { TbPokeball } from 'react-icons/tb';

const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center">
                {/* Animation de la Poké Ball avec styles en ligne */}
                <div
                    style={{
                        animation: "spin-slow 2s linear infinite",
                        display: "inline-block",
                        filter: "drop-shadow(0 0 10px #ff0000)",
                    }}
                >
                    <TbPokeball className="text-red-500 text-6xl" />
                </div>
            </div>

            {/* Ajout de l'animation keyframes directement dans le composant */}
            <style>
                {`
                    @keyframes spin-slow {
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default LoadingSpinner;
