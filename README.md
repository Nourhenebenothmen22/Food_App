# 🍔 Food App Backend

Bienvenue dans le backend de **Food App**, une API Node.js avec MongoDB pour gérer les utilisateurs et les aliments.

---

## 🚀 Stack Utilisée

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-D14836?style=for-the-badge&logo=mail-dot-ru&logoColor=white)](https://nodemailer.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSONwebtokens&logoColor=white)](https://jwt.io/)
[![Multer](https://img.shields.io/badge/Multer-7A57C2?style=for-the-badge&logo=upload&logoColor=white)](https://www.npmjs.com/package/multer)

---

## 📂 Structure du projet

backend/
│
├── 🗂️ config/
│   ├── 🗃️ db.js          # Configuration MongoDB
│   └── 🗃️ mailer.js      # Configuration email
│
├── 🎮 controllers/
│   ├── 🎯 authController.js
│   └── 🎯 FoodController.js
│
├── 🛡️ middlewares/
│   ├── 🔐 authMiddleware.js
│   └── ✅ authValidation.js
│
├── 🗃️ models/
│   ├── 📄 Food.js
│   └── 📄 User.js
│
├── 🛣️ routes/
│   ├── 🚦 authRoutes.js
│   └── 🚦 FoodRoutes.js
│
├── 📧 templates/
│   ├── ✉️ otpTemplate.js
│   └── ✉️ welcomeTemplate.js
│
├── 🔧 utils/
│   └── 🎫 generateToken.js
│
├── 📁 uploads/           # 📸 Dossier des images
├── 🚀 server.js          # ⚡ Point d'entrée
├── 📋 package.json
└── 🔐 .env

