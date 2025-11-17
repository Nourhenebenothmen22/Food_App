const express = require('express');
const router = express.Router();
const FoodController = require('../controllers/FoodController');
const multer = require('multer');
const path = require('path');

// Multer config pour upload image
const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    allowed.test(path.extname(file.originalname).toLowerCase()) &&
    allowed.test(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Only images are allowed'));
  }
});

// CRUD Food
router.post('/', upload.single('image'), FoodController.addFood);
router.get('/', FoodController.getAllFoods);
router.get('/:id', FoodController.getFoodById);
router.put('/:id', upload.single('image'), FoodController.updateFood);
router.delete('/:id', FoodController.deleteFood);

module.exports = router;
