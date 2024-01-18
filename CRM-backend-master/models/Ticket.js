const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  desc: {
    type: String,
    min: 3,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  status: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  category: {
    type: String
    ,
    required: true,
    max: 255,
    min: 2,
  },
  priority: {
    type: String,
    required: true,
    max: 255,
    min: 2,
  },
  assignee: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  ,
  conversation: {
    type: Array,
    default: [] // You can initialize it with an empty array
  },
  history: {
    type: Array,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
