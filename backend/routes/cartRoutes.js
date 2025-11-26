const express = require('express');
const { addToCart} = require('../controllers/cartController');
const router = express.Router();

// Ajouter / Retirer via POST
router.post('/add', addToCart);


module.exports = router;
