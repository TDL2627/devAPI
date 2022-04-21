const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const developerRouter = require("./routes/developers");

app.use(bodyParser.json());
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