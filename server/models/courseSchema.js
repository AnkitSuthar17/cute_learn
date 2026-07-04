const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  duration: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      enum: ["day(s)", "week(s)", "month(s)", "year(s)"],
      required: true,
    },
  },
  price: {
    type: String,
    required: true,
  },
});

const courseSchema = new mongoose.Schema({
  allsubjects: [
    {
      subjectID: {
        type: String,
        required: true,
      },
      prices: {
        type: [priceSchema],
        default: [
          { duration: { value: 1, unit: "day(s)" }, price: "₹300" },
          { duration: { value: 1, unit: "week(s)" }, price: "₹1000" },
          { duration: { value: 1, unit: "month(s)" }, price: "₹3500" },
          { duration: { value: 45, unit: "day(s)" }, price: "₹5000" },
          { duration: { value: 6, unit: "month(s)" }, price: "₹18500" },
          { duration: { value: 1, unit: "year(s)" }, price: "₹34000" },
        ],
      },
    },
  ],
  skilldevelopment: [
    {
      subjectID: {
        type: String,
        required: true,
      },
      prices: {
        type: [priceSchema],
        default: [
          { duration: { value: 1, unit: "day(s)" }, price: "₹300" },
          { duration: { value: 1, unit: "week(s)" }, price: "₹1000" },
          { duration: { value: 1, unit: "month(s)" }, price: "₹3500" },
          { duration: { value: 45, unit: "day(s)" }, price: "₹5000" },
          { duration: { value: 6, unit: "month(s)" }, price: "₹18500" },
          { duration: { value: 1, unit: "year(s)" }, price: "₹34000" },
        ],
      },
    },
  ],
  customcourses: [
    {
      subjectID: {
        type: String,
        required: true,
      },
      prices: {
        type: [priceSchema],
        default: [
          { duration: { value: 1, unit: "day(s)" }, price: "₹300" },
          { duration: { value: 1, unit: "week(s)" }, price: "₹1000" },
          { duration: { value: 1, unit: "month(s)" }, price: "₹3500" },
          { duration: { value: 45, unit: "day(s)" }, price: "₹5000" },
          { duration: { value: 6, unit: "month(s)" }, price: "₹18500" },
          { duration: { value: 1, unit: "year(s)" }, price: "₹34000" },
        ],
      },
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
