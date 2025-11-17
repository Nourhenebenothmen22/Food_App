🍔 Food App Backend - API RESTful

Bienvenue dans le dépôt du backend de Food App, une API robuste conçue pour gérer une plateforme complète de commande de plats en ligne, incluant la gestion des utilisateurs, des administrateurs et des produits alimentaires.

Ce projet est la base de données et la logique métier de notre application Full Stack.

✨ Fonctionnalités Clés

Ce backend fournit des endpoints sécurisés et optimisés pour :

Gestion des Utilisateurs & Authentification : Inscription, connexion, profils utilisateurs, réinitialisation de mot de passe (via OTP par e-mail).

Sécurité : Utilisation de JSON Web Tokens (JWT) pour l'authentification et l'autorisation.

Catalogue d'Aliments : CRUD complet (Créer, Lire, Mettre à jour, Supprimer) des produits alimentaires.

Administration : Un panneau d'administration est supporté pour la gestion des produits et des utilisateurs.

Téléchargement de Fichiers : Gestion du téléchargement d'images de produits grâce à Multer.

🚀 Stack Technique (La Base de l'API)



🏗️ Structure du Projet

Le projet suit une architecture MVC (Model-View-Controller) modifiée, garantissant clarté et maintenabilité.

backend/
│
├── 🗂️ config/             # ⚙️ Configuration (DB, E-mail)
│   ├── 🗃️ db.js
│   └── 🗃️ mailer.js
│
├── 🎮 controllers/        # 🎯 Logique métier des routes (Handlers)
│   ├── 🎯 authController.js
│   └── 🎯 FoodController.js
│
├── 🛡️ middlewares/        # 🔐 Fonctions d'interception (Auth, Validation)
│   ├── 🔐 authMiddleware.js
│   └── ✅ authValidation.js
│
├── 🗃️ models/             # 📄 Schémas de données MongoDB (Mongoose)
│   ├── 📄 Food.js
│   └── 📄 User.js
│
├── 🛣️ routes/             # 🚦 Définition des URL d'API
│   ├── 🚦 authRoutes.js
│   └── 🚦 FoodRoutes.js
│
├── 📧 templates/          # ✉️ Modèles d'e-mails
│   ├── ✉️ otpTemplate.js
│   └── ✉️ welcomeTemplate.js
│
├── 🔧 utils/              # 🛠️ Utilitaires (Génération de Tokens)
│   └── 🎫 generateToken.js
│
├── 📁 uploads/            # 📸 **Important:** Dossier de stockage des images
├── 🚀 **server.js** # ⚡ Point d'entrée de l'application (Démarrage du serveur)
├── 📋 package.json
└── 🔐 **.env** # Variables d'environnement (Clés Secrètes, URL DB)


🛠️ Installation et Démarrage

Pré-requis

Node.js (v18+)

MongoDB (local ou instance cloud comme Atlas)

Étapes

Cloner le dépôt :

git clone [URL_DU_DEPOT]
cd food-app-backend


Installer les dépendances :

npm install


Configuration des Variables d'Environnement :
Créez un fichier .env à la racine du projet et remplissez-le avec vos clés :

PORT=5000
MONGO_URI=[Votre_URL_de_Connexion_MongoDB]
JWT_SECRET=[Une_Clé_Secrète_Longue_et_Complexe]
EMAIL_USER=[Votre_Email_Nodemailer]
EMAIL_PASS=[Votre_Mot_de_Passe_ou_Clé_d'Application]


Démarrer le serveur :

En mode développement (avec Nodemon pour le rechargement automatique) :

npm run dev


En mode production :

npm start


L'API sera accessible à l'adresse http://localhost:5000/api/v1/

🔗 Liens

Frontend Associé : [Lien vers le dépôt du Frontend (si disponible)]

Documentation API (Swagger/Postman) : [Lien vers la documentation des endpoints (si disponible)]

🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une Pull Request.

<p align="center">
Développé avec 💙 par [Votre Nom/Pseudo]
</p>
