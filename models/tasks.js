const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  point: {
    type: Number,
    default: 0,
  },
  when: {
    type: Date,
    default: Date.now,
  },
  requirement: {
    type: String,
  },
});
const Takopoint = mongoose.model("takopoint", Schema);
module.exports = Takopoint;
