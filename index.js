const express = require('express');
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose")
const app = express();
const developerRouter = require("./routes/developers");

// mongo db connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use("/developers", developerRouter);

app.set("port", process.env.port || 2627);

app.get("/", function(req, res){
    res.send("WELCOME TO TDL2627 API");
  });

const port = process.env.PORT || 2627;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });