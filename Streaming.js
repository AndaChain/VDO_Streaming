const fs = require("fs");

class Streaming{
		constructor(req, res, range, dir_file){
			if (!range) {
				res.status(400).send("Requires Range header");
			}
		  
				const videoPath = dir_file;
				const videoSize = fs.statSync(videoPath).size;
		  
				const CHUNK_SIZE = 10 ** 6; // 1MB
				const start = Number(range.replace(/\D/g, ""));
				console.log(start, videoSize - 1)
				const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
				const contentLength = end - start + 1;
				const headers = {
				"Content-Range": `bytes ${start}-${end}/${videoSize}`,
				"Accept-Ranges": "bytes",
				"Content-Length": contentLength,
				};
				
				res.writeHead(206, headers);
				
				const videoStream = fs.createReadStream(videoPath, { start, end });
				
				console.log(videoStream)
				videoStream.pipe(res);
				
		}
}
module.exports = Streaming
