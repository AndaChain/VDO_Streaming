const express = require("express"); // เฟม work ของ nodejs
const Streaming_read_index = require("./Streaming_read_index.js");
const Streaming_index = require("./Streaming_index.js");
const Streaming = require("./Streaming.js");
const app = express();
const fs = require("fs");
const Create_Segment = require("./Segment_Creater.js"); 
const mpdgen = require("./mpdgen.js");

//Use http://localhost:8000/ to acess the file.

app.get("/",function(req,res){
  res.redirect("/index/Polkka_rock.mp4") // แบบนี้ไปหน้าตามลิงค์
  // res.sendFile(__dirname + "/index.html");
})

app.get("/index/:filename", function (req, res ) {
  filename = req.params.filename;
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
  const range = req.headers.range
  var dir = __dirname + "/video/" + filename;
  //new Streaming_index(dir);
  //new Streaming_read_index(req, res, range, dir);
  new Streaming(req, res, range, dir);
});

app.get("/CreateIndex",function(req,res){
  new Streaming_index(__dirname+"/index/Polkka_rock.mp4");
  res.redirect("/");
});

app.get("/CreateSegment",function(req,res){
  var segment = new Create_Segment(__dirname+"\\video\\Polkka_rock.mp4" , "Polkka_rock");
  segment.resolution_webm('640x360')
  segment.resolution_webm('320x180')
  segment.resolution_webm('160x90')
  
  res.redirect("/");
})

app.get("/CreateMPD" , function(req,res){
  new mpdgen("Polkka_rock");
})

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});

