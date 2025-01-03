import React, { useState } from 'react';
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState({
        name: 'John Doe', // Exemple de données utilisateur
        email: 'johndoe@example.com',
        profilePicture: 'https://via.placeholder.com/150', // Exemple d'URL d'image de profil
    });

    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimer le token ou toute donnée d'authentification
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const handleEditProfile = () => {
        // Ajouter une logique pour éditer le profil si nécessaire
        alert("Rediriger vers la page d'édition du profil.");
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {/* Section Photo de Profil */}
                <div className="flex items-center justify-center flex-col">
                    <img
                        src={userData.profilePicture}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <h2 className="text-3xl font-semibold text-gray-800">{userData.name}</h2>
                    <p className="text-gray-500">{userData.email}</p>
                </div>

                {/* Boutons Editer le Profil et Se Déconnecter */}
                <div className="mt-6 flex justify-around">
                    <button
                        onClick={handleEditProfile}
                        className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 transition duration-300"
                    >
                        <FaUserEdit className="text-xl" />
                        <span>Edit Profile</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition duration-300"
                    >
                        <FaSignOutAlt className="text-xl" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
