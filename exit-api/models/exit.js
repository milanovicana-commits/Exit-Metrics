const mongoose = require("mongoose");

const ExitSchema = new mongoose.Schema({
  id: Number,
  name: String,
  dept: String,
  role: String,
  hire: String,
  leave: String,
  type: String,
  newco: String,
  seniority: String,
  reason: String,
  nps: String,
  note: String,
  createdAt: String
});

module.exports = mongoose.model("Exit", ExitSchema);