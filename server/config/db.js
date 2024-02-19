const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase() {
  console.log("Connecting to the database...");
  const mongoURL = process.env.mongoURL;

  try {
    await mongoose.connect(mongoURL);

    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error("Error connecting to the database");
  }
}

module.exports = connectToDatabase;
