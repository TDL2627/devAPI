require("dotenv").config;

const auth = require("../middleware/auth");
const express = require("express");
const Developer = require ('../models/developer')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDeveloper = require("../middleware/finders")
const router = express.Router();

// get
router.get("/", async(req, res)=>{
try{
  const developers = await Developer.find();
  res.status(201).send(developers);
}catch(error){
  res.status(500).send({ message: error.message });
}
 });

//  get one
router.get("/:id", getDeveloper, (req, res, next) => {
  res.send(res.developer);
});


//  added
 router.post("/", async (req, res, next) => {
  const { fullname, email, number,password, portfolio, github } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const developer = new Developer({
    fullname,
    email,
    number,
    portfolio,
    github,
    role,
    password: hashedPassword,
  });

  try {
    const newDeveloper = await developer.save();
  try {
    const access_token = jwt.sign(
      JSON.stringify(newDeveloper),
      process.env.JWT_SECRET_KEY
    );
    res.status(201).json({jwt: access_token, developer});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
} catch (error) {
  res.status(400).json({ message: error.message });
}
});

// update




 module.exports = router;