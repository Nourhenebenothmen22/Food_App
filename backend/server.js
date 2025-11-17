// ------------------------- IMPORTS -------------------------
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/db'); // Connecteur MongoDB

// ------------------------- CONFIG -------------------------
dotenv.config();
connectDB(); // Connexion à la base MongoDB

const app = express();

// ------------------------- MIDDLEWARES GÉNÉRAUX -------------------------
app.use(helmet()); // Sécurité HTTP
app.use(cors({ origin: 'http://localhost:5000', methods: ['GET','POST'] })); // CORS
app.use(express.json({ limit: '10kb' })); // Parse JSON
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // Parse form data
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev')); // Logs serveur

// ------------------------- SANITIZE INPUT -------------------------
function sanitizeInput(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeInput(obj[key]);
    }
  }
  return obj;
}

app.use((req, res, next) => {
  if (req.body) sanitizeInput(req.body);
  next();
});

// ------------------------- RATE LIMIT -------------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Max 20 requêtes
  message: 'Trop de requêtes, réessayez plus tard'
});
app.use(limiter);

// ------------------------- ROUTES -------------------------
app.get('/', (req, res) => {
  console.log(chalk.green('Route / visitée'));
  res.send('Backend sécurisé et prêt ✅');
});

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/food', require('./routes/FoodRoutes'));

// ------------------------- START SERVER -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.blue(`🚀 Server running on port ${PORT} ✅`));
});
