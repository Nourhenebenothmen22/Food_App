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
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ------------------------- CORS -------------------------
// Autoriser localhost pour dev + Netlify pour prod
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5000',
  'https://nomadiceats.netlify.app'
];

app.use(cors({
  origin: function(origin, callback) {
    // autoriser les requêtes sans origin (Postman ou serveur)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ------------------------- BODY PARSERS -------------------------
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
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: { error: 'Trop de requêtes, réessayez plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ------------------------- ROUTES STATIQUES -------------------------
app.use('/images', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
  }
}));

// ------------------------- ROUTES -------------------------
app.get('/', (req, res) => {
  console.log(chalk.green('Route / visitée'));
  res.send('Backend sécurisé et prêt ✅');
});

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/food', require('./routes/FoodRoutes'));
app.use('/api/v1/cart', require('./routes/cartRoutes'));
app.use('/api/v1/order', require('./routes/OrderRoutes'));

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
