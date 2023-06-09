require("dotenv").config();
const { mongoUrl, mongoOptions } = require("../config");
const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}
/**
 @function createConnection
 
 @returns {Promise<void>}
 */

const createConnection = async () => {
  console.log(mongoUrl);
  await mongoose.connect(mongoUrl, mongoOptions);
};

module.exports = {
  createConnection,
};
