const { body, validationResult } = require('express-validator');

// Règles de validation pour l'inscription
const registerValidation = [
  body('name')
    .notEmpty().withMessage('Le nom est requis')
    .isLength({ min: 3 }).withMessage('Le nom doit contenir au moins 3 caractères'),

  body('email')
    .notEmpty().withMessage('L’email est requis')
    .isEmail().withMessage('L’email doit être valide'),

  body('password')
    .notEmpty().withMessage('Le mot de passe est requis')
    .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une majuscule')
    .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une minuscule')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    .matches(/[!@#$%^&*]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial'),

  body('role')
    .notEmpty().withMessage('Le rôle est requis')
    .isIn(['user', 'admin']).withMessage('Le rôle doit être "user" ou "admin"')
];

// Middleware pour vérifier les erreurs de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidation,
  validate
};
