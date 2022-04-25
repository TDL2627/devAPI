const Developer = require("../models/developer");


async function getDeveloper(req, res, next) {
    let developer;
    try {
      developer = await Developer.findById(req.params.id);
  
      if (!developer) res.status(404).json({ message: "Could not find developer" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.developer = developer;
    next();
  }

  module.exports = getDeveloper;