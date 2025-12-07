// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Log de l'URI (sans le mot de passe si tu veux éviter de l'afficher complet)
    console.log("🔌 Trying to connect to MongoDB with URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected successfully 🎉");

    // Logs supplémentaires pour vérifier la connexion
    const conn = mongoose.connection;
    console.log("📡 Mongo host:", conn.host);
    console.log("🗄️ Mongo database:", conn.name);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message, "💥");
    process.exit(1);
  }
};

module.exports = connectDB;
