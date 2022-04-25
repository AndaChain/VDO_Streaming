const fs = require("fs");

class Streaming_read_index{
		constructor(req, res, range, dir_file){
			//const range = req.headers.range; // bytes=26961489-
			//console.log("00000000000000")
			if (!range) {
				res.status(400).send("Requires Range header");
			}
			
			const _range = Number(range.replace(/\D/g, ""));
			fs.readFile('Indexing.json', (err, data) => {
					if (err) throw err;
					let json_read = JSON.parse(data);
					var index = Math.floor(_range/10 ** 6) // CHUNK_SIZE = 10 ** 6
					var start = json_read.start[index]
					var end = json_read.end[index]
					//const videoStream = json_read.videoStream[index]
					
					const videoSize = fs.statSync(dir_file).size;
					
					const contentLength = end - start + 1;
					const headers = {
					"Content-Range": `bytes ${start}-${end}/${videoSize}`,
					"Accept-Ranges": "bytes",
					"Content-Length": contentLength,
					};
			  
					res.writeHead(206, headers);
			  
					const videoStream = fs.createReadStream(dir_file, { start, end });
					console.log(start, end)
					videoStream.pipe(res);
					
			});
		}
}
module.exports = Streaming_read_index
