# Pokédex React-Django

Un projet complet de Pokédex utilisant un frontend React et un backend Django, conteneurisés avec Docker pour une gestion simplifiée.

## Prérequis

- Docker et Docker Compose installés
- Node.js (pour les tests ou modifications locales du frontend)
- Python 3.x et pip (pour les tests ou modifications locales du backend)

---

## Structure du projet

```
.
├── backend/        # Code source du backend Django
├── frontend/       # Code source du frontend React
├── docker-compose.yml  # Fichier de configuration Docker Compose
└── README.md       # Documentation du projet
```

---

## Installation

### 1. Clôner le dépôt
```bash
git clone https://github.com/D-Seonay/pokedex-react-django
cd pokedex-react-django
```

### 2. Lancer les conteneurs Docker
```bash
docker-compose up --build
```

Ce fichier Docker Compose configure deux services :
- **backend** : Serveur Django accessible à `http://localhost:8000`
- **frontend** : Application React accessible à `http://localhost:3000`

---

## Frontend

### Développement local
Pour travailler sur l'interface utilisateur sans Docker :

```bash
cd frontend
npm install
npm start
```
Accédez à `http://localhost:3000`.


## Backend

### Développement local
Pour développer ou tester Django sans Docker :

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Accédez à `http://localhost:8000`.


### Gestion des migrations
Si des changements sont effectués dans les modèles Django, créez les migrations et appliquez-les :

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## API Endpoints

- `POST /api/register/` : Inscription d'un utilisateur
- `GET /api/pokemon/` : Liste des Pokémon
- `GET /api/pokemon/<id>/` : Détails d'un Pokémon

Pour tester les endpoints, vous pouvez utiliser un outil comme [Postman](https://www.postman.com/) ou [cURL](https://curl.se/).

---

## Fonctionnalités principales

### Frontend
- Interface utilisateur moderne en React avec Tailwind CSS
- Recherche et navigation dans la liste des Pokémon
- Inscription et connexion des utilisateurs

### Backend
- API RESTful avec Django REST Framework
- Gestion des utilisateurs et authentification
- Base de données SQLite

### Docker
- Conteneurisation des deux services pour une gestion simplifiée
- Isolation des environnements frontend et backend

---

## Déploiement

Pour déployer le projet sur un serveur, utilisez Docker Compose pour gérer les conteneurs :

```bash
docker-compose -f docker-compose.prod.yml up --build
```


## Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. Commitez vos modifications
   ```bash
   git commit -m "Ajout de ma fonctionnalité"
   ```
4. Poussez votre branche
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
5. Créez une Pull Request

