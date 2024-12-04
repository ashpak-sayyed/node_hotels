const express = require("express");
const app = express();
const Database = require("./db.js");
const Person = require("./models/person.js");
const Menu = require("./models/menu.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Root route is working");
});

// Import Route files.
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
app.use("/person",personRoutes);
app.use("/menu",menuRoutes);


app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
