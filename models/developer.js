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
    password: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    portfolio: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      github: {
        type: String,
        required: true,
      },
      role: {
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