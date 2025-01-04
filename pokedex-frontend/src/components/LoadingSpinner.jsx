import React from "react";
import { TbPokeball } from 'react-icons/tb';


const LoadingSpinner = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center">
                {/* Poké Ball SVG avec animation */}
                <TbPokeball
                    className="text-red-500 animate-spin-slow text-6xl"
                    style={{ filter: "drop-shadow(0 0 10px #ff0000)" }}
                />
                {/* Texte */}
                <p className="mt-4 text-white text-lg font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
