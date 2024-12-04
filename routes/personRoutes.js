const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    await newPerson.save();
    res.status(200).json({ msg: "Data save successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (["chef", "manager", "waiter"].includes(workType)) {
      const responce = await Person.find({ work: workType });
      res.status(200).json({ msg: responce });
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    res.status(500).json({ error: "Bad request" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body; // in req.body define updateble data.
    const responce = await Person.findByIdAndUpdate(userId, updatedData, {
      new: true, //Ensures the updated version of the document is returned instead of the original.
      runValidators: true, //Ensures that Mongoose validates the updated data against the schema before saving it.
    });
    if (!responce) {
      res.status(401).json({ error: "Person Not Found!" });
    } else {
      res.status(200).json({ msg: responce });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await Person.findByIdAndDelete(userId);
    if (!result) {
      res.status(401).json({ error: "Person Not Found!" });
    } else {
      res.status(200).json({ msg: result }); 
    }
    console.log("data deleted successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});


module.exports = router;
