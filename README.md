# Pokédex React-Django

[![wakatime](https://wakatime.com/badge/user/018e9f6e-3f6e-41ca-8923-c1d7110b6f50/project/71950268-d832-4d04-be21-28f1b0398e6e.svg)](https://wakatime.com/badge/user/018e9f6e-3f6e-41ca-8923-c1d7110b6f50/project/71950268-d832-4d04-be21-28f1b0398e6e)

Le projet Pokédex React-Django est une application web complète permettant d'afficher et d'interagir avec les données des Pokémon. Le backend est développé avec Django, qui sert à gérer les utilisateurs et les données des Pokémon, tandis que le frontend est développé avec React pour offrir une expérience utilisateur dynamique. La base de données utilisée est SQLite3, qui est simple à configurer et suffira pour un projet de cette envergure.

Ce projet a pour objectif de récupérer les données des Pokémon via l'API publique PokeAPI, de les stocker dans une base de données SQLite3, puis d'exposer des endpoints via Django pour que le frontend React puisse y accéder. Le projet permet également de s'enregistrer, de se connecter, et d'afficher un tableau de scores des utilisateurs.

Une fonctionnalité supplémentaire prévue est un système de duels où les utilisateurs pourront s'affronter en utilisant leurs Pokémon. Cette fonctionnalité permettra aux utilisateurs de sélectionner leurs Pokémon favoris et de les envoyer en duel contre d'autres utilisateurs. Les résultats des duels seront stockés dans la base de données et un classement sera mis à jour en fonction des performances des joueurs. Cette fonctionnalité ajoutera une dimension compétitive et interactive au projet, renforçant l'expérience utilisateur.

Technologies utilisées
<p align="center"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React badge" /> <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django badge" /> <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite badge" /> <img src="https://img.shields.io/badge/PokeAPI-85A7F3?style=for-the-badge&logo=pokemon&logoColor=white" alt="PokeAPI badge" /> </p>

## Prérequis

- **Node.js** (version 16 ou supérieure) pour le développement et la gestion du frontend React.
- **Python 3.x** et **pip** pour l'installation des dépendances du backend Django.
- **SQLite3** (fourni par défaut avec Django, donc pas besoin d'installation supplémentaire).

---

## Structure du projet

```
.
├── pokedex_backend/        # Code source du backend Django
│   ├── manage.py           # Script principal pour gérer Django
│   ├── pokedex_backend/    # Répertoire des fichiers backend
│   ├── requirements.txt    # Dépendances Python
│   └── ...
├── pokedex_frontend/       # Code source du frontend React
│   ├── src/                # Composants React et autres fichiers frontend
│   ├── package.json        # Dépendances et scripts frontend
│   └── ...
└── README.md               # Documentation du projet
```

---

## Installation

### 1. Cloner le dépôt

Clône ce projet sur ton ordinateur local :

```bash
git clone https://github.com/D-Seonay/pokedex-react-django
cd pokedex-react-django
```

### 2. Installer et configurer le backend (Django)

#### a. Installer les dépendances Python

Va dans le répertoire `pokedex_backend` et crée un environnement virtuel Python (optionnel mais recommandé) :

```bash
cd pokedex_backend
python -m venv venv
source venv/bin/activate  # Sur Linux/macOS
venv\Scripts\activate     # Sur Windows
```

Ensuite, installe les dépendances Python :

```bash
pip install -r requirements.txt
```

#### b. Configurer la base de données SQLite

Django utilise SQLite3 par défaut, donc il n'y a pas besoin de configuration supplémentaire. Cependant, si tu souhaites vérifier ou personnaliser le fichier de configuration de la base de données, tu peux le faire dans le fichier `pokedex_backend/settings.py` sous la section `DATABASES`.

#### c. Appliquer les migrations

Crée les tables nécessaires dans la base de données SQLite en exécutant les migrations :

```bash
python manage.py migrate
```

#### d. Récupérer les données de Pokémon

Une fois les migrations appliquées, tu peux récupérer les données de Pokémon depuis l'API PokeAPI en exécutant la commande suivante :

```bash
python manage.py fetch_pokemon_data
```

Cette commande récupérera les données des premiers 151 Pokémon et les insérera dans la base de données SQLite.

#### e. Démarrer le serveur Django

Démarre le serveur Django :

```bash
python manage.py runserver
```

Accède à l'API backend sur [http://localhost:8000](http://localhost:8000).

---

### 3. Installer et configurer le frontend (React)

#### a. Installer les dépendances Node.js

Va dans le répertoire `pokedex-frontend` et installe les dépendances pour le frontend :

```bash
cd pokedex-frontend
npm install
```

#### b. Démarrer le serveur de développement React

Démarre le serveur React :

```bash
npm start
```

Accède à l'application frontend sur [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

Voici une liste des principaux endpoints de l'API backend Django :

### Authentification

- **`POST /api/register/`** : Inscription d'un utilisateur
- **`POST /api/login/`** : Connexion d'un utilisateur

### Utilisateur

- **`GET /api/user/profile/`** : Récupère les informations du profil utilisateur
- **`GET /api/user/profile/update/`** : Met à jour les informations du profil utilisateur

### Leaderboard

- **`GET /api/leaderboard/`** : Affiche le tableau des scores des utilisateurs

### Pokémon

- **`GET /api/pokemon/`** : Liste tous les Pokémon
- **`GET /api/pokemon/<id>/`** : Détails d'un Pokémon spécifique

### Items

- **`GET /api/items/`** : Liste des items
- **`GET /api/items/<id>/`** : Détails d'un item spécifique

---

## Gestion des migrations

Si des changements sont effectués dans les modèles Django, crée des migrations et applique-les :

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Gestion des données

Pour récupérer les données des Pokémon ou des objets (items), utilise les commandes suivantes :

```bash
python manage.py fetch_pokemon_data    # Récupère les données des Pokémon
python manage.py fetch_items_data     # Récupère les données des Items
```

Ces commandes appellent l'API externe de PokeAPI et récupèrent les informations pour les insérer dans la base de données SQLite.

---
