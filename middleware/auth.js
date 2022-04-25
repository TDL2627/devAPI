require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
  
    const token = authHeader && authHeader.split(" ")[1];
    if (!token || token == null)
      return res.status(401).send({ message: "Developer not logged in" });
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, developer) => {
      if (err) res.status(403).send({ message: err.message });
      req.developer = developer;
      return next();
    });
  }
  
  module.exports = authenticateToken;
  