require("dotenv").config;

const express = require("express");
const Developer = require ('../models/developer')
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

 router.post("/", async (req, res, next) => {
  const { fullname, email, number, portfolio, github } = req.body;
  let developer;
(  developer = new Developer({
        fullname,
        email,
        number,
        portfolio,
        github
      
      }))
  try {
    const newDeveloper = await developer.save();
    res.status(201).json(newDeveloper);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});





 module.exports = router;