var ffmpeg = require('fluent-ffmpeg');
const mpdgen = require("./mpdgen.js");
const jsongen = require("./jsongen.js");

class Segment_Creater{
    constructor(dir_file , fileoutname){
		this.pathToSourceFile = dir_file + fileoutname
		this.keep_sizes = []
    }

    extract_video(size){
		var path = this.pathToSourceFile // this.pathToSourceFile can not use in function 
		var _command = ffmpeg(path+".mp4");
		_command.videoCodec('libvpx') //libvpx-vp9 could be used too
        .videoBitrate(3000, true) //Outputting a constrained 3Mbit VP8 video stream
        .outputOptions(
                '-flags', '+global_header', //WebM won't love if you if you don't give it some headers
                '-psnr') //Show PSNR measurements in output. Anything above 40dB indicates excellent fidelity
        .on('start', function(progress) {
              console.log('Start...');
        })
        .on('end', function(err, stdout, stderr) {
			  new jsongen(path+'_'+size+'_output.webm')
			  console.log('End...');
        }) 
        .size(size)
        .noAudio()
        .save(path+'_'+size+'_output.webm');
	}
	
	extract_audio(){
		var path = this.pathToSourceFile
		var _command = ffmpeg(path+".mp4");
		_command.videoCodec('libvpx') //libvpx-vp9 could be used too
        .videoBitrate(3000, true) //Outputting a constrained 3Mbit VP8 video stream
        .outputOptions(
                '-flags', '+global_header', //WebM won't love if you if you don't give it some headers
                '-psnr') //Show PSNR measurements in output. Anything above 40dB indicates excellent fidelity
        .on('start', function(progress) {
              console.log('Start...');
        })
        .on('end', function(err, stdout, stderr) {
			  new jsongen(path+'_audio.webm')
              console.log('End...');
        })
        .noVideo()
        .save(path+'_audio.webm');
	}
}
module.exports = Segment_Creater;
