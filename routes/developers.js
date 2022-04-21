const express = require("express");
const router = express.Router();

router.get("/developers", function(req, res){
    let time=[
        {name:"Abdul Malik",pic:'me.jpg',linkGit: "https://github.com/TDL2627/quiz", linkLive: "https://tdl2627-quiz.herokuapp.com/" },
        {name:"Abdul Malik",pic:'me.jpg',linkGit: "https://github.com/TDL2627/quiz", linkLive: "https://tdl2627-quiz.herokuapp.com/" },
        {name:"Abdul Malik",pic:'me.jpg',linkGit: "https://github.com/TDL2627/quiz", linkLive: "https://tdl2627-quiz.herokuapp.com/" }
      ]
      res.send(time)
 });

 module.exports = router;