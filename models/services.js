const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  point: {
    type: Number,
  },
  explain: {
    type: String,
  },
});
const services = mongoose.model("services", Schema);

module.exports = services;
