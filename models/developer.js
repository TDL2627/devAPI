const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    number: {
      type: String,
      required: true,
    },
    portfolio: {
        type: String,
        required: true,
      },
      github: {
        type: String,
        required: true,
      },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    }
  });

  module.exports = mongoose.model("Developer", developerSchema);