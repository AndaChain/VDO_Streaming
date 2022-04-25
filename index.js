const express = require("express"); // เฟม work ของ nodejs
const Streaming_read_index = require("./Streaming_read_index.js");
const Streaming_index = require("./Streaming_index.js");
const Streaming = require("./Streaming.js");
const app = express();
const fs = require("fs");

//Use http://localhost:8000/ to acess the file.

app.get("/",function(req,res){
  res.redirect("/index/mongodb_group5.mp4") // แบบนี้ไปหน้าตามลิงค์
  // res.sendFile(__dirname + "/index.html");
})

app.get("/index/:filename", function (req, res ) {
  filename = req.params.filename;
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
  const range = req.headers.range
  var dir = __dirname + "/video/" + filename
  //new Streaming_index(dir);
  //new Streaming_read_index(req, res, range, dir);
  new Streaming(req, res, range, dir);
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
