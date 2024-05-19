const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  curStock: {
    type: String,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8
  },
  stocks: [
    {
      name: {
        type: String, 
        min: 1
      },
      symbol: {
        type: String,
        max: 10,
        min: 1
      },
    }
  ]
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;