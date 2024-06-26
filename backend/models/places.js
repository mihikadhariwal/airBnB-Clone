const mongoose = require("mongoose");

const { Schema } = mongoose;

const PlaceSchema = mongoose.Schema({
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user
});

const PlaceModel = mongoose.model("PlaceModel", PlaceSchema);

module.exports = PlaceModel;
