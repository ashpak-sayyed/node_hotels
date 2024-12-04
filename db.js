const mongoose = require("mongoose");
require("dotenv").config();

// connection.
main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/hotels"); // local
  await mongoose.connect(process.env.DB_URL); // online
}

module.exports = main;