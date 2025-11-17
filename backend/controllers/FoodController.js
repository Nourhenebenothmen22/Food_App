const FoodModels = require('../models/Food');

// CREATE - Ajouter un nouvel aliment
exports.addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const image_filename = req.file.filename;

    const food = new FoodModels({
      name: req.body.name,
      description: req.body.description,  
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });

    const savedFood = await food.save();
    res.status(201).json(savedFood);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// READ - Tous les aliments
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await FoodModels.find();
    res.status(200).json(foods); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

// READ - Un aliment par ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await FoodModels.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Modifier un aliment
exports.updateFood = async (req, res) => {
  try {
    const food = await FoodModels.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // Mise à jour des champs si fournis
    food.name = req.body.name || food.name;
    food.description = req.body.description || food.description;
    food.price = req.body.price || food.price;
    food.category = req.body.category || food.category;

    // Mise à jour de l'image si un fichier est uploadé
    if (req.file) {
      food.image = req.file.filename; // ou req.file.originalname si tu veux garder le nom original
    }

    const updatedFood = await food.save();
    res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Supprimer un aliment
exports.deleteFood = async (req, res) => {
  try {
    const food = await FoodModels.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
