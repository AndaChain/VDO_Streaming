// file system module to perform file operations
/*
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
*/





/*
const fs = require('fs');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({ log: true });
//ffmpeg -i video.mkv -vn -acodec copy audio_only.mkv

(async () => {
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'video.mkv', await fetchFile('video/video.mkv'));
  await ffmpeg.run('-i', 'video.mkv', '-an', '-acodec', 'copy', 'out.mp4'); //read from test.mp4 to out.mp4
  await fs.promises.writeFile('video/out.mp4', ffmpeg.FS('readFile', './out.mp4'));
  process.exit(0);
})();
*/

/*
(async () => {
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'video.mkv', await fetchFile('video/video.mkv'));
  await ffmpeg.run('-i', 'video.mkv', '-map', '0:v', '-r', '25', 'out.mp4');
  ffmpeg.FS('readdir', '/').filter((p) => p.endsWith('.mp4')).forEach(async (p) => {
    fs.writeFileSync(p, ffmpeg.FS('readFile', p));
  });
  process.exit(0);
})();
*/


    /*
    resolution(size){
		var _command = ffmpeg(this.pathToSourceFile);
		_command.outputOptions([
		  '-an',
		  '-acodec',
		  'copy',
		]).size(size).save('video/'+ this.fileoutname +'_'+size+'_output.mp4');
	}
	*/


/*
const childProcess = require('child_process');


  childProcess.exec('bash shell_test.sh')
*/

var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var pathToSourceFile = __dirname + '\\video\\Polkka_rock.mp4'
var command = ffmpeg(pathToSourceFile);

// 1280x720
// 640x480
// 480x360

// 640x360
// 320x180
// 160x90

//var ffmpeg = require('fluent-ffmpeg');

/*
var size = '1280x720'
command.videoCodec('libvpx') //libvpx-vp9 could be used too
        .videoBitrate(3000, true) //Outputting a constrained 1Mbit VP8 video stream
        .outputOptions(
                '-flags', '+global_header', //WebM won't love if you if you don't give it some headers
                '-psnr') //Show PSNR measurements in output. Anything above 40dB indicates excellent fidelity
        .size(size).noVideo()
        .save('video/'+size+'_output.webm');

		var _command = ffmpeg(pathToSourceFile);
		_command.videoCodec('libvpx')
        .noVideo()
        .save('video/audio.webm');
*/
/*
const fluent = require('fluent-ffmpeg');

const executeFfmpeg = args => {
    let command = fluent().output(' '); // pass "Invalid output" validation
    command._outputs[0].isFile = false; // disable adding "-y" argument
    command._outputs[0].target = ""; // bypass "Unable to find a suitable output format for ' '"
    command._global.get = () => { // append custom arguments
        return typeof args === "string" ? args.split(' ') : args;
    };
    return command;
};
var path = __dirname + '\\video'
// -i video.mkv -vn -acodec copy audio_only.mkv
var com = "-f webm_dash_manifest -i "+path+"\\160x90_output.webm -f webm_dash_manifest -i "+path+"\\320x180_output.webm -f webm_dash_manifest -i "+path+"\\640x360_output.webm -f webm_dash_manifest -i "+path+"\\audio.webm "+"-c copy -map 0 -map 1 -map 2 -map 3"+" -f webm_dash_manifest -adaptation_sets"+" 'id=0,streams=0,1,2,id=1,streams=3' "+path+"\\manifest.mpd"
// var comm = '-f webm_dash_manifest -i 160x90_output.webm -f webm_dash_manifest -i 320x180_output.webm -f webm_dash_manifest -i 640x360_output.webm -f webm_dash_manifest -i audio.webm -c copy -map 0 -map 1 -map 2 -map 3 -f webm_dash_manifest -adaptation_sets "id=0,streams=0,1,2 id=1,streams=3" manifest.mpd'
executeFfmpeg(com)
    .run();
*/
/*
var mpd_generator = require("mpd-generator");

var data = {
  path: __dirname+"/video",
  inputFile: "video",
  format: ".mkv",
};

mpd_generator.main(data);
*/

		/*
        exec('mse_json_manifest '+path+filename+'_160x90_output.webm > '+path+filename+'_160x90_output.webm.json', (error, stdout, stderr) => {
            if(error){
              console.error(`exec error: ${error}`);
              return;
            }
            console.log("160x90 Done")
          });

        exec('mse_json_manifest '+path+filename+'_320x180_output.webm > '+path+filename+'_320x180_output.webm.json', (error, stdout, stderr) => {
            if(error){
              console.error(`exec error: ${error}`);
              return;
            }
            console.log("320x180 Done")
          });
          
        exec('mse_json_manifest '+path+filename+'_640x360_output.webm > '+path+filename+'_640x360_output.webm.json', (error, stdout, stderr) => {
            if(error){
              console.error(`exec error: ${error}`);
              return;
            }
            console.log("640x360 Done")
          });
		*/
const { exec } = require('node:child_process');
console.log("running")

class manifestgen{
    constructor(filename){
		var path = __dirname + '\\video\\'
        exec('mse_json_manifest '+path+'160x90_output.webm > '+path+'160x90_output.webm.json', (error, stdout, stderr) => {
            if(error){
              console.error(`exec error: ${error}`);
              return;
            }
            console.log("160x90 Done")
          });

        exec('mse_json_manifest '+path+'320x180_output.webm > '+path+'320x180_output.webm.json', (error, stdout, stderr) => {
            if(error){
              console.error(`exec error: ${error}`);
              return;
            }
            console.log("320x180 Done")
          });
          
        exec('mse_json_manifest '+path+'640x360_output.webm > '+path+'640x360_output.webm.json', (error, stdout, stderr) => {
            if(error){
              console.error(`exec error: ${error}`);
              return;
            }
            console.log("640x360 Done")
          });
    
    }
}
module.exports = manifestgen;
