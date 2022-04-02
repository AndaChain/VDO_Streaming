const express = require("express"); // เฟม work ของ nodejs
const app = express();
const fs = require("fs");

//Use http://localhost:8000/index/filename to acess the file.

app.get("/",function(req,res){
  res.redirect("/video/test.mp3")
})

app.get("/video/:filename", function (req, res ) {
  res.sendFile(__dirname + "/video.html");
  filename = req.params.filename;
});

app.get("/video", function (req, res) {
  data_streaming(req , res , filename);
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});

function data_streaming(req , res , filename){
  const range = req.headers.range; // bytes=26961489-
  
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "video/"+filename;
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-" อันนี้ของ Range // bytes=26961489- เปลี่ยนเป็น 26961489
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
}