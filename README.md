
# 🍬 sweetCorner – Épicerie Sucrée en Ligne

Bienvenue sur **sweetCorner**, une application web d’épicerie sucrée proposant une large sélection de produits gourmands tels que chocolats, biscuits, boissons, cakes, donuts, macarons ...

## 👥 Rôles Utilisateurs

- **Visiteur** : peut naviguer  sans authentification, consulter les produits, leurs descriptions et leurs prix.
- **Client** : peut s’inscrire/se connecter pour consulter les produits, leurs descriptions et leurs prix.
- **Admin** : a un accès complet pour gérer les produits, les unités, les catégories (ajouter, modifier, supprimer).

## 🚀 Installation & Lancement du Projet

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/SAT020202/sweet-corner-repo
   cd sweetCorner
   ```

2. **Installation côté backend (Laravel) :**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```
   REMARQUE : Il faut Modifier le fichier .env pour configurer la connexion à la base de données

3. **Installation côté frontend (React) :**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

   L’application sera disponible sur `http://localhost:3000` pour le frontend, et `http://localhost:8000` pour le backend (API Laravel).

## 🛠 Technologies Utilisées

- **Frontend** : React, HTML5, CSS3
- **Backend** : Laravel (PHP Framework)
- **Base de données** : MySQL
- **API REST** : communication entre React et Laravel via des requêtes HTTP (AXIOS)
- **Autres outils** : Composer, npm, Laravel Migrations

## 🧩 Fonctionnalités

### 🎯 Visiteur :
- Voir tous les produits disponibles, triés par catégories.
- Consulter les descriptions, prix, images des produits.

### 👤 Client :
- S’inscrire / Se connecter
- Naviguer dans les catégories
- Voir les détails des produits

### 🔧 Admin :
- Ajouter / Modifier / Supprimer :
  - Produits
  - Catégories
  - UnitésProduits
-  la gestion automatique des quantités :
   La quantité disponible des produits est mise à jour dynamiquement en fonction des unités associées à chaque produit. 

## 📂 Structure du Projet

```
/backend       → Application Laravel (API, Models, Routes)
/frontend      → Application React (interface utilisateur)
/README.md     → Ce fichier
```



