const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserModel = require("./models/users.js");
const PlaceModel = require("./models/places.js");
const multer = require("multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware/authenticateToken.js");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, "your_jwt_secret_key");
};

mongoose
  .connect("mongodb://127.0.0.1:27017/airbnb_users")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

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
      // res.status(200).json(userDoc);
      const token = generateToken(userDoc);
      console.log("generated token from login", token);
      res.status(200).json({ token, user: userDoc });
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

app.post("/places", authenticateToken, async (req, res) => {
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
    price,
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
    price,
    user: req.user.id, // Store the user ID from the JWT
  });
  res.json(PlaceDoc);
});

// Get Places Route
app.get("/places", authenticateToken, async (req, res) => {
  try {
    const places = await PlaceModel.find({ user: req.user.id });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

app.put("/places/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
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
    price,
  } = req.body;

  try {
    const updatedPlace = await PlaceModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        address,
        photos,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      }
      // { new: true } // This option returns the updated document
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.get("/allplaces", async (req, res) => {
  try {
    const places = await PlaceModel.find({});
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Error fetching places", error });
  }
});

app.get("/singleplace/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
