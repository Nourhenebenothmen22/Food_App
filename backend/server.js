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

// ------------------------- CORS AMÉLIORÉ -------------------------
// Configuration CORS optimisée pour dev local + Netlify + Render
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174', 
  'http://localhost:5000',
  'https://mytomatoapp.netlify.app',
  'https://food-app-solo.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    // 1. Autoriser les requêtes SANS origin (Postman, serveur-à-serveur, proxy Netlify)
    if (!origin) {
      return callback(null, true);
    }
    
    // 2. Vérifier si l'origine est dans la liste autorisée
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // 3. Autoriser les sous-domaines Netlify (important pour les prévisualisations)
    if (origin.includes('.netlify.app')) {
      return callback(null, true);
    }
    
    // 4. En développement, tout autoriser (optionnel mais pratique)
    if (process.env.NODE_ENV === 'development') {
      console.log(chalk.yellow(`⚠️  Autorisation CORS en dev pour: ${origin}`));
      return callback(null, true);
    }
    
    // 5. Sinon, refuser
    console.log(chalk.red(`❌ CORS bloqué pour: ${origin}`));
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  credentials: true,
  exposedHeaders: ['Content-Type', 'Authorization', 'Content-Length']
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

// ------------------------- ROUTES STATIQUES POUR IMAGES -------------------------
app.use('/images', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '7d', // Cache de 7 jours
  setHeaders: (res, filePath) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=604800');
    res.setHeader('Vary', 'Origin');
  }
}));

// ------------------------- ROUTE DE SANTÉ POUR NETLIFY -------------------------
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'food-app-backend'
  });
});

// ------------------------- ROUTES -------------------------
app.get('/', (req, res) => {
  console.log(chalk.green('Route / visitée depuis:'), req.headers.origin || 'direct');
  res.json({ 
    message: 'Backend sécurisé et prêt ✅',
    endpoints: {
      auth: '/api/v1/auth',
      food: '/api/v1/food',
      cart: '/api/v1/cart',
      order: '/api/v1/order',
      images: '/images/{filename}',
      health: '/health'
    },
    cors: {
      allowedOrigins: allowedOrigins,
      acceptsNetlify: true
    }
  });
});

// ------------------------- API ROUTES -------------------------
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/food', require('./routes/FoodRoutes'));
app.use('/api/v1/cart', require('./routes/cartRoutes'));
app.use('/api/v1/order', require('./routes/OrderRoutes'));

// ------------------------- ERROR HANDLING -------------------------
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(chalk.red('❌ Error:'), err.message);
  console.error(err.stack);
  
  // Gestion spécifique des erreurs CORS
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      message: 'Origin not allowed',
      yourOrigin: req.headers.origin,
      allowedOrigins: allowedOrigins
    });
  }
  
  res.status(500).json({ 
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { 
      error: err.message,
      stack: err.stack 
    })
  });
});

// ------------------------- START SERVER -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.blue(`🚀 Server running on port ${PORT} ✅`));
  console.log(chalk.cyan(`🌍 CORS configuré pour:`));
  allowedOrigins.forEach(origin => console.log(chalk.cyan(`   - ${origin}`)));
  console.log(chalk.cyan(`📁 Images servies depuis: ${path.join(__dirname, 'uploads')}`));
});