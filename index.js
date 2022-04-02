const express = require("express"); // เฟม work ของ nodejs
const app = express();
const fs = require("fs");

//Use http://localhost:8000/index/filename to acess the file.

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
  res.redirect("/index/test.mp3")
})

app.get("/index/:filename", function (req, res ) {
  res.sendFile(__dirname + "/index.html");
  filename = req.params.filename;
  //const range2 = req.headers;
  //console.log(range2)
  //const videoStream2 = fs.createReadStream(filename);
  //console.log(videoStream2)
  // https://stackoverflow.com/questions/4696283/what-are-res-and-req-parameters-in-express-functions
  // **req** is an object containing information about the HTTP request that raised the event.
  // In response to req, you use **res** to send back the desired HTTP response.
  
  //console.log(req) // Incoming Message
  
  //console.log("**********************************************************************************************************************************************************************")
  
  //console.log(res) // Server Response
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range; // bytes=26961489-
  
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = filename;
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
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});
