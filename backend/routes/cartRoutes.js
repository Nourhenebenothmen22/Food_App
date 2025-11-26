const express = require('express');
const { addToCart,removeFromCart } = require('../controllers/cartController');
const router = express.Router();

// Ajouter / Retirer via POST
router.post('/add', addToCart);
router.post('/remove',removeFromCart )


module.exports = router;
