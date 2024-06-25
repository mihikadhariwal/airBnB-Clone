const mongoose = require("mongoose");
const { Schema } = mongoose;

const Users = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const UserModel = mongoose.model("User", Users);

module.exports = UserModel;
