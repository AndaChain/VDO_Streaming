// file system module to perform file operations
const fs = require('fs');
 
json_headers = {
					"Content-Range": "bytes ${start}-${end}/${videoSize}",
					"Accept-Ranges": "bytes",
					"Content-Length": 123,
					}
const headers = {"data":[json_headers]};

for(i=0; i<2; i++){
    headers["data"].push(json_headers)
}

// stringify JSON Object
var jsonContent = JSON.stringify(headers);
//console.log(jsonContent);
 
fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
    console.log("JSON file has been saved.");
});

var num = 51000000/10**6
console.log(Math.floor(num))

