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
  service: {
    type: String,
    required: true,
  },
explain: {
    type: String,
},
  when: {
    type: Date,
    default: Date.now,
  },
});
const Tasks = mongoose.model("tasks", Schema);
module.exports = Tasks;
