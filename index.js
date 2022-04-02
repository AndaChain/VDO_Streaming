const express = require("express"); // เฟม work ของ nodejs
const Streaming = require("./Streaming.js");
const app = express();
const fs = require("fs");

//Use http://localhost:8000/ to acess the file.

app.get("/",function(req,res){
  // res.redirect("/video/test.mp3") แบบนี้ไปหน้าตามลิงค์
  res.sendFile(__dirname + "/index.html");
})

app.get("/video", function (req, res) {
  new Streaming(req , res , __dirname + "/video/test.mp3");
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
