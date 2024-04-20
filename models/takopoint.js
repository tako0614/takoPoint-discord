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
  lastGetPoint: {
    type: Date,
  },
});
const Takopoint = mongoose.model("takopoint", Schema);

module.exports = Takopoint;
