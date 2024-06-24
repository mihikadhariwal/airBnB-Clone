const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema } = mongoose;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/airbnb_users")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const Users = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const UserModel = mongoose.model("User", Users);

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
      res
        .status(200)
        .json({ user: { name: userDoc.name, email: userDoc.email } });
      //   res.status(200).send({ message: "Login successful!" });
      //   console.log("found");
    } else {
      res
        .status(401)
        .send({ message: "Login failed! Invalid email or password." });
      //   console.log("not found");
    }
  } catch (error) {
    res.status(500).send({ message: "An error occurred during login!" });
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
