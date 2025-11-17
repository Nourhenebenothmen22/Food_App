# 🍔 Food App Backend

Backend de l'application Food App, développé avec **Node.js** et **Express**, utilisant **MongoDB** pour la gestion de la base de données et plusieurs autres outils pour la sécurité, l'authentification et l'envoi de notifications.

---

## 🗂 Structure du projet

backend/
├── 📂 config/
│   ├── db.js          # Configuration MongoDB
│   └── mailer.js      # Configuration email
├── 📂 controllers/
│   ├── authController.js
│   └── FoodController.js
├── 📂 middlewares/
│   ├── authMiddleware.js
│   └── authValidation.js
├── 📂 models/
│   ├── Food.js
│   └── User.js
├── 📂 routes/
│   ├── authRoutes.js
│   └── FoodRoutes.js
├── 📂 templates/
│   ├── otpTemplate.js
│   └── welcomeTemplate.js
├── 📂 utils/
│   └── generateToken.js
├── 📂 uploads/        # Dossier des images
├── 🚀 server.js       # Point d'entrée
├── 📄 package.json
└── 🔒 .env

---

## 🚀 Technologies utilisées

| Technologie | Utilité |
|-------------|---------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) | Exécution serveur backend |
| ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) | Framework pour créer l'API REST |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) | Base de données NoSQL |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongodb&logoColor=white) | Modélisation des données MongoDB |
| ![Nodemailer](https://img.shields.io/badge/Nodemailer-D14836?style=for-the-badge&logo=nodemailer&logoColor=white) | Envoi d'emails |
| ![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white) | Envoi SMS / OTP |
| ![Bcrypt.js](https://img.shields.io/badge/Bcrypt-6f42c1?style=for-the-badge) | Hashage des mots de passe |
| ![Helmet](https://img.shields.io/badge/Helmet-4A4A4A?style=for-the-badge) | Sécurisation des headers HTTP |
| ![Cors](https://img.shields.io/badge/CORS-ff6f00?style=for-the-badge) | Gestion des requêtes cross-origin |
| ![Morgan](https://img.shields.io/badge/Morgan-0A0A0A?style=for-the-badge) | Logger des requêtes HTTP |
| ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white) | Redémarrage automatique serveur en dev |

---

## ⚡ Installation

1. Cloner le repo :

```bash
git clone <votre-repo>
cd backend
