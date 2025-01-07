import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScoreManager = () => {
  const [score, setScore] = useState(0); // Score actuel
  const [amount, setAmount] = useState(''); // Montant à ajouter/supprimer
  const [error, setError] = useState(''); // Message d'erreur
  const [success, setSuccess] = useState(''); // Message de succès

  // Fonction pour récupérer le score de l'utilisateur connecté
  const fetchScore = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Aucun token d\'authentification trouvé.');
            return;
        }
      const response = await axios.get('http://localhost:8000/api/user/profile/', {
        headers: { 
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json", 
        },

      });
      setScore(response.data.profile.score);
    } catch (err) {
      setError('Erreur lors de la récupération du score.');
    }
  };

  // Fonction pour ajouter un score
  const handleAddScore = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/user/score/add/',
        { score: parseInt(amount) },
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        }
      );
      setScore(response.data.new_score);
      setSuccess('Score ajouté avec succès.');
      setAmount('');
    } catch (err) {
      setError('Erreur lors de l\'ajout du score.');
    }
  };

  // Fonction pour supprimer un score
  const handleRemoveScore = async () => {
    try {
      const response = await axios.post(
        '/api/user/score/remove/',
        { score: parseInt(amount) },
        {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        }
      );
      setScore(response.data.new_score);
      setSuccess('Score supprimé avec succès.');
      setAmount('');
    } catch (err) {
      setError('Erreur lors de la suppression du score.');
    }
  };

  // Charger le score à l'initialisation
  useEffect(() => {
    fetchScore();
  }, []);

  return (
    <div className="score-manager p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Gestion du Score</h1>
      <div className="mb-4">
        <p className="text-lg">
          Score actuel : <span className="font-semibold">{score}</span>
        </p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className="mt-4">
        <input
          type="number"
          placeholder="Entrez un montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />
        <div className="flex gap-4">
          <button
            onClick={handleAddScore}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Ajouter
          </button>
          <button
            onClick={handleRemoveScore}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreManager;
