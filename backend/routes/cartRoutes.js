// Dans votre fichier routes/cartRoutes.js
const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.get('/get', getCart);

module.exports = router;