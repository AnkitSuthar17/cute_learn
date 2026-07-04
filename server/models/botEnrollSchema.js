const mongoose = require('mongoose');

const botEnrollSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // Converts email to lowercase
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Email validation
    },
    countryCode: {
      type: String,
      required: true,
      match: [/^\+\d{1,4}$/, "Please enter a valid country code"], // Country code validation (e.g., +91, +1)
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"], // Phone number validation
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    idea: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('BotEnroll', botEnrollSchema);