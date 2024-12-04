const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");

// Create Item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newItem = new Menu(data);
    await newItem.save();
    res.status(200).json(newItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Find all Item's.
router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

//Available test is item's.
router.get("/:test", async (req, res) => {
  try {
    const newTeste = req.params.test;
    if (["sour", "sweet", "spicy"].includes(newTeste)) {
      const data = await Menu.find({ taste: newTeste });
      res.status(200).json({ msg: data });
    } else {
      res.status(401).json({ error: "item not found!" });
    }
  } catch (err) {
    res.status(500).json({ error: "Bad Request!" });
  }
});

// Update Item.
router.patch("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = req.body;
    const result = await Menu.findByIdAndUpdate(itemId, updatedItem, {
      new: true,
      runValidators: true,
    });

    if (!result) {
      res.status(401).json({ error: "Item not found" });
    } else {
      res.status(200).json({ msg: result });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Item
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Menu.findByIdAndDelete(userId);
    if (!result) {
      res.status(401).json({ error: "Item not found" });
    } else {
      res.status(200).json({ msg: result });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
