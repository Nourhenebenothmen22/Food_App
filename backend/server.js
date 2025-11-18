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

const connectDB = require('./config/db');

// ------------------------- CONFIG -------------------------
dotenv.config();
connectDB();

const app = express();

// ------------------------- MIDDLEWARES GÉNÉRAUX -------------------------
app.use(helmet({
  // Désactive la protection CSP pour les images en développement
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Configuration CORS complète
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));

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
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ------------------------- ROUTES STATIQUES -------------------------
// IMPORTANT: Configuration spécifique pour les fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    // Headers CORS pour les images
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
  }
}));

// Route racine
app.get('/', (req, res) => {
  console.log(chalk.green('Route / visitée'));
  res.send('Backend sécurisé et prêt ✅');
});

// API Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/food', require('./routes/FoodRoutes'));

// ------------------------- ERROR HANDLING -------------------------
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(chalk.red('Error:'), err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// ------------------------- START SERVER -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.blue(`🚀 Server running on port ${PORT} ✅`));
});