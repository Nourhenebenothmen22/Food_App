const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const router = express.Router();

// Add / Remove via POST
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
// Change POST to GET with parameter
router.get('/get/:userId', getCart);

module.exports = router;