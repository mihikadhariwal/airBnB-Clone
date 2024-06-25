const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserModel = require("./models/users.js");
const PlaceModel = require("./models/places.js");
const multer = require("multer");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect("mongodb://127.0.0.1:27017/airbnb_users")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// const Users = mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
// });
// const UserModel = mongoose.model("User", Users);

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userDoc = await UserModel.create({
    name,
    email,
    password,
  });
  //   console.log(name, email, password);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDoc = await UserModel.findOne({ email, password });

    if (userDoc) {
      res.status(200).json(userDoc);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

const photosMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const {
    title,
    description,
    address,
    photos,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  const PlaceDoc = await PlaceModel.create({
    title,
    description,
    address,
    photos,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  });
  res.json(PlaceDoc);
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
