require("dotenv").config;

const auth = require("../middleware/auth");
const express = require("express");
const Developer = require ('../models/developer')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getDeveloper = require("../middleware/finders");
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

  // GET ONE developer 2.0
  router.get("/1/", auth, async (req, res, next) => {
    try {
      const developer = await Developer.findBy(req.developer._id)
    res.status(201).json(developer)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
//  added
 router.post("/", async (req, res, next) => {
  const { fullname, email, number,password, portfolio, github, avatar, role } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const developer = new Developer({
    fullname,
    email,
    number,
    portfolio,
    role,
    github,
    avatar,
    password: hashedPassword
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
router.put("/:id", getDeveloper, async (req, res, next) => {
  const { fullname, email, role, number,password, portfolio, github, avatar } = req.body;
  if (fullname) res.developer.fullname = fullname;
  if (email) res.developer.email = email;
  if (github) res.developer.github = github;
  if (number) res.developer.number =number;
  if (portfolio) res.developer.portfolio = portfolio;
  if (avatar) res.developer.avatar = avatar;
  if (role) res.developer.role = role;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    res.developer.password = hashedPassword;
  }
  try {
    const updatedDeveloper = await res.developer.save();
    res.status(201).send(updatedDeveloper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete
router.delete("/:id", getDeveloper, async (req, res, next) => {
  try {
    await res.developer.remove();
    res.json({ message: "Deleted developer" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


  // LOGIN developer with email + password
  router.patch("/", async (req, res, next) => {
    const { email, password } = req.body;
    const developer = await Developer.findOne({ email });
 
    if (!developer) res.status(404).json({ message: "Could not find developer" });
    if (await bcrypt.compare(password, developer.password)) {
      try {
        const access_token = jwt.sign(
          JSON.stringify(developer),
          process.env.JWT_SECRET_KEY
        );


        res.status(201).json({ jwt: access_token , developer });
      } catch (error) {
        res.status(500).json({ message: error.message }); 
      }
    } else {
      res
        .status(400)
        .json({ message: "Email and password combination do not match" });
    }
  });



 module.exports = router;