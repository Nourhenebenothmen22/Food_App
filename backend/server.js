const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const chalk = require('chalk');

const app = express();

// Middleware général
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5000', methods: ['GET','POST'] }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(compression());
app.use(morgan('dev'));
function sanitizeInput(obj) {
  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      // Supprime les caractères < et > pour éviter le XSS
      obj[key] = obj[key].replace(/</g, "&lt;").replace(/>/g, "&gt;");
    } else if (typeof obj[key] === 'object') {
      sanitizeInput(obj[key]);
    }
  }
  return obj;
}

app.use((req, res, next) => {
  if (req.body) sanitizeInput(req.body);
  next();
});


// Rate limiting
const limiter = rateLimit({ windowMs: 15*60*1000, max: 20, message: 'Trop de requêtes' });
app.use(limiter);

// Routes
app.get('/', (req, res) => {
  console.log(chalk.green('Route / visitée'));
  res.send('Backend sécurisé et prêt ✅');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.blue(`Server running on port ${PORT}`));
});
