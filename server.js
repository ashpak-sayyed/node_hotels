require("dotenv").config();
const express = require("express");
const app = express();
const Database = require("./db.js");
const Person = require("./models/person.js");
const Menu = require("./models/menu.js");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Root route is working");
});

// Import Route files.
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
app.use("/person",personRoutes);
app.use("/menu",menuRoutes);


app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
