🍔 Food App - Backend API
<div align="center">
https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white
https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white
https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white
https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white

API RESTful robuste pour une application de commande de plats en ligne

</div>
✨ Fonctionnalités Principales
🔐 Sécurité & Authentification
✅ Inscription et connexion sécurisées

✅ JWT pour l'authentification

✅ Réinitialisation de mot de passe via OTP

✅ Protection des routes avec middlewares

✅ Hashage des mots de passe avec bcrypt

🍕 Gestion des Produits
✅ CRUD complet des plats alimentaires

✅ Upload d'images avec Multer

✅ Catégorisation des produits

✅ Gestion des stocks et prix

👥 Gestion des Utilisateurs
✅ Profils utilisateurs et administrateurs

✅ Panier d'achat persistant

✅ Historique des commandes

✅ Rôles et permissions

📧 Communication
✅ Emails de bienvenue avec Nodemailer

✅ Notifications OTP par SMS (Twilio)

✅ Templates d'emails personnalisés

🏗️ Architecture du Projet
bash
backend/
│
├── ⚙️ config/
│   ├── 🗃️ db.js                 # Configuration MongoDB
│   └── 🗃️ mailer.js             # Configuration email
│
├── 🎯 controllers/
│   ├── 🎯 authController.js      # Gestion authentification
│   └── 🎯 FoodController.js      # Gestion des plats
│
├── 🔐 middlewares/
│   ├── 🔐 authMiddleware.js      # Vérification JWT
│   └── ✅ authValidation.js      # Validation des données
│
├── 📊 models/
│   ├── 📄 Food.js               # Schéma des plats
│   └── 📄 User.js               # Schéma utilisateurs
│
├── 🛣️ routes/
│   ├── 🛣️ authRoutes.js          # Routes authentification
│   └── 🛣️ FoodRoutes.js          # Routes des plats
│
├── ✉️ templates/
│   ├── ✉️ otpTemplate.js         # Template OTP
│   └── ✉️ welcomeTemplate.js     # Template bienvenue
│
├── 🛠️ utils/
│   └── 🎫 generateToken.js       # Génération tokens
│
├── 📸 uploads/                   # Stockage images
├── 🚀 server.js                  # Point d'entrée
├── 📋 package.json
└── 🔒 .env                       # Variables d'environnement
🛠️ Stack Technique Complète
<div align="center">
⚙️ Core Backend
Technologie	Utilisation	Version
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" width="120">	Runtime JavaScript	20.x
<img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" width="120">	Framework Web	4.x
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" width="120">	Base de données	7.x
<img src="https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongodb&logoColor=white" width="120">	ODM MongoDB	8.x
🔐 Sécurité
Technologie	Utilisation
<img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" width="120">	Tokens d'authentification
<img src="https://img.shields.io/badge/Bcrypt-6f42c1?style=flat-square&logo=bcrypt&logoColor=white" width="120">	Hashage mots de passe
<img src="https://img.shields.io/badge/Helmet-4A4A4A?style=flat-square&logo=helmet&logoColor=white" width="120">	Sécurisation headers
📧 Communication
Technologie	Utilisation
<img src="https://img.shields.io/badge/Nodemailer-D14836?style=flat-square&logo=nodemailer&logoColor=white" width="120">	Envoi d'emails
<img src="https://img.shields.io/badge/Twilio-F22F46?style=flat-square&logo=twilio&logoColor=white" width="120">	Envoi de SMS
🛠️ Développement
Technologie	Utilisation
<img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=white" width="120">	Hot reload
<img src="https://img.shields.io/badge/Multer-F46519?style=flat-square&logo=multer&logoColor=white" width="120">	Upload fichiers
<img src="https://img.shields.io/badge/CORS-ff6f00?style=flat-square&logo=cors&logoColor=white" width="120">	Cross-origin requests
</div>
🚀 Installation & Démarrage
📋 Prérequis
Node.js 18+

MongoDB (local ou Atlas)

Compte email (pour Nodemailer)

Compte Twilio (pour les SMS - optionnel)

⚡ Installation Rapide
bash
# 1. Cloner le repository
git clone https://github.com/votre-username/food-app-backend.git
cd food-app-backend

# 2. Installer les dépendances
npm install

# 3. Configuration environnement
cp .env.example .env
# Éditer le fichier .env avec vos configurations
🔧 Configuration Environnement
env
# ========================
# 🚀 CONFIGURATION SERVEUR
# ========================
PORT=4000
NODE_ENV=development

# ========================
# 🗃️ BASE DE DONNÉES
# ========================
MONGODB_URI=mongodb://localhost:27017/foodapp

# ========================
# 🔐 AUTHENTIFICATION JWT
# ========================
JWT_SECRET=votre_super_secret_jwt_tres_long_et_securise
JWT_EXPIRE=30d

# ========================
# 📧 CONFIGURATION EMAIL
# ========================
EMAIL_SERVICE=gmail
EMAIL_PORT=587
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_application

# ========================
# 📱 CONFIGURATION SMS
# ========================
TWILIO_ACCOUNT_SID=votre_account_sid_twilio
TWILIO_AUTH_TOKEN=votre_auth_token_twilio
TWILIO_PHONE_NUMBER=+1234567890

# ========================
# 📁 UPLOAD FICHIERS
# ========================
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
UPLOAD_PATH=./uploads
🏃‍♂️ Démarrage
bash
# 🎯 Mode Développement (avec rechargement automatique)
npm run dev

# 🚀 Mode Production
npm start

# 🧪 Lancer les tests
npm test
📡 Endpoints API
🔐 Authentification
Méthode	Endpoint	Description	Auth Requise
POST	/api/auth/register	Inscription utilisateur	❌
POST	/api/auth/login	Connexion utilisateur	❌
POST	/api/auth/logout	Déconnexion	✅
POST	/api/auth/forgot-password	Mot de passe oublié	❌
POST	/api/auth/reset-password	Réinitialisation mot de passe	❌
GET	/api/auth/profile	Profil utilisateur	✅
🍕 Gestion des Plats
Méthode	Endpoint	Description	Auth Requise
GET	/api/foods	Liste tous les plats	❌
GET	/api/foods/:id	Détails d'un plat	❌
POST	/api/foods	Créer un nouveau plat	✅ (Admin)
PUT	/api/foods/:id	Modifier un plat	✅ (Admin)
DELETE	/api/foods/:id	Supprimer un plat	✅ (Admin)
GET	/api/foods/category/:category	Plats par catégorie	❌
🛒 Fonctionnalités Utilisateur
Méthode	Endpoint	Description	Auth Requise
POST	/api/cart/add	Ajouter au panier	✅
GET	/api/cart	Voir le panier	✅
PUT	/api/cart/update	Modifier le panier	✅
DELETE	/api/cart/remove	Retirer du panier	✅
POST	/api/orders	Passer commande	✅
GET	/api/orders/history	Historique commandes	✅
🧪 Tests & Qualité
bash
# Structure des tests
__tests__/
├── unit/                 # Tests unitaires
├── integration/          # Tests d'intégration API
├── fixtures/             # Données de test
└── setup.js             # Configuration des tests

# Commandes disponibles
npm test                 # Lancer tous les tests
npm run test:coverage    # Tests avec couverture
npm run test:watch       # Mode surveillance
npm run lint            # Vérification code
🔒 Mesures de Sécurité
✅ Validation des données entrantes

✅ Sanitization contre les injections

✅ Rate limiting sur les endpoints sensibles

✅ Helmet.js pour la sécurisation des headers

✅ CORS configuré de manière restrictive

✅ Hashage bcrypt pour les mots de passe

✅ JWT expiration configurable

✅ Upload sécurisé avec validation MIME type

📊 Statut du Projet
<div align="center">
https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge
https://img.shields.io/badge/tests-95%2525%2520coverage-success?style=for-the-badge
https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge
https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge

</div>
🤝 Contribution
Les contributions sont les bienvenues ! Voici comment participer :

🍴 Fork le projet

🌿 Créer une branche (git checkout -b feature/AmazingFeature)

💾 Commiter les changements (git commit -m 'Add AmazingFeature')

📤 Pousser la branche (git push origin feature/AmazingFeature)

🔀 Ouvrir une Pull Request

📋 Guidelines
Respecter le style de code existant

Ajouter des tests pour les nouvelles fonctionnalités

Mettre à jour la documentation si nécessaire

📄 Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

👨‍💻 Auteur
Votre Nom

🌐 Portfolio

📧 votre.email@domain.com

🐙 GitHub

💼 LinkedIn

🔗 Liens Utiles
Frontend Repository - Application React

API Documentation - Documentation complète des endpoints

Live Demo - Démo en ligne

<div align="center">
⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !
Développé avec ❤️ et beaucoup de ☕

</div>
