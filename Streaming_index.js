const fs = require("fs");

class Streaming_index{
		constructor(dir_file){
			//const range = req.headers.range; // bytes=26961489-
			const videoPath = dir_file;
			const videoSize = fs.statSync(videoPath).size;
			const json_data = {"start":[],"end":[],"videoStream":[]};
			for(var range_=0; range_<videoSize; range_ = range_ + 10 ** 6){
					const CHUNK_SIZE = 10 ** 6; // 1MB
					const start = range_;
					const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
					const contentLength = end - start + 1;
					json_data.start.push(start)
					json_data.end.push(end)
					
					//res.writeHead(206, headers);
			  
					const videoStream = fs.createReadStream(videoPath, { start, end });
					json_data.videoStream.push(videoStream)
					//console.log(json_data)
					//videoStream.pipe(res);
			}
			
			
			var jsonContent = JSON.stringify(json_data);
			fs.writeFile("Indexing.json", jsonContent, 'utf8', function (err) {
				if (err) {
					console.log("An error occured while writing JSON Object to File.");
					return console.log(err);
				}
				console.log("JSON file has been saved.");
			});
			

		}
}
module.exports = Streaming_index
