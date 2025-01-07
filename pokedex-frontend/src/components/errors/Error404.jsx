import React from "react";
import { TbBarrierBlock } from "react-icons/tb";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            {/* Titre de la page */}
            <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
            <h2 className="text-2xl font-medium mb-6 text-gray-300">
                Accès refusé ! <span className="text-yellow-500">Ronflex</span> bloque la route !
            </h2>

            {/* Illustration avec un message humoristique */}
            <div className="flex flex-col items-center">
                <TbBarrierBlock className="text-7xl text-yellow-500 mb-4 animate-bounce" />
                <p className="text-lg text-gray-400 text-center max-w-md">
                    "C'est pas que je veux pas... mais si tu veux passer, il faudra un meilleur chemin ou avoir la pokéflûte !"
                </p>
            </div>

            {/* Bouton pour retourner à l'accueil */}
            <Link
                to="/"
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-200"
            >
                Retourner à l'accueil
            </Link>

            {/* Citation humoristique */}
            <footer className="mt-6 text-gray-500 text-sm italic">
                "By the mighty will of Snorlax, cette page n'existe pas !" 
            </footer>
        </div>
    );
};

export default Error404;
