const express = require("express"); // create the router
const bcrypt = require("bcryptjs"); // hash the pwd
const jwt = require("jsonwebtoken"); // token generation
const User = require("../models/User"); //users in DB

const router = express.Router(); //define routes in app

router.post("/register", async (req, res) => {
  //POST request to /register Listener
  console.log("register router hit");
  try {
    const { name, email, password } = req.body; //pulls user info from request body
    console.log("data recived");
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return (
        res.status(400).json({ message: "User already exists" }),
        console.log("user already exists")
      );

    const hashedPassword = await bcrypt.hash(password, 10); //hashes the pwd using bcrypt by 10 salt rounds

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: user._id }); //response with new user ID if successfull
    console.log("User created:", user._id);
  } catch (err) {
    //catches any unexpected errors
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  //POST request to /login Listener
  console.log("login router hit");
  try {
    const { email, password } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //compare password with hashed version
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Login successful!");
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
