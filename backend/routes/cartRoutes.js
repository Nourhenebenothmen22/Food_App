const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const router = express.Router();

// Ajouter / Retirer via POST
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
// Changer POST en GET avec paramètre
router.get('/get/:userId', getCart);

module.exports = router;