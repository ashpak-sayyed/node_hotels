const mongoose = require("mongoose");

// Create menu schema.
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  taste: {
    type: String,
    enum: ["spicy", "sweet", "sour"],
    required: true,
  },

  isDrink: {
    type: Boolean,
    default: false,
  },

  ingredient: {
    type: [String],
    default: [],
  },

  numOfSale : {
    type : Number,
    default : 0,
  },
});


// Create model/collection.
const Menu = mongoose.model("Menu" , menuItemSchema);
module.exports = Menu;