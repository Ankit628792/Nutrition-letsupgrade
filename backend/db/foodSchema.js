const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    Name: String,
    Calories: Number,
    Protein: Number,
    Carbs: Number,
    Fats: Number,
    Fibre: Number,
    Weight: Number
});
const foodModel = new mongoose.model("food", foodSchema);

module.exports = foodModel ;