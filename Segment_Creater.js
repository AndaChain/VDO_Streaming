var ffmpeg = require('fluent-ffmpeg');

class Segment_Creater{
    constructor(dir_file){
		this.pathToSourceFile = dir_file
		var _command = ffmpeg(this.pathToSourceFile);
		_command.videoCodec('libvpx')
        .noVideo()
        .save('video/audio.webm');
    }
    
    resolution(size){
		var _command = ffmpeg(this.pathToSourceFile);
		_command.outputOptions([
		  '-an',
		  '-acodec',
		  'copy',
		]).size(size).save('video/'+size+'_output.mp4');
	}
	
    resolution_webm(size){
		var _command = ffmpeg(this.pathToSourceFile);
		_command.videoCodec('libvpx') //libvpx-vp9 could be used too
        .videoBitrate(3000, true) //Outputting a constrained 1Mbit VP8 video stream
        .outputOptions(
                '-flags', '+global_header', //WebM won't love if you if you don't give it some headers
                '-psnr') //Show PSNR measurements in output. Anything above 40dB indicates excellent fidelity
        .on('start', function(progress) {
              console.log('Start...');
        })
        .on('end', function(err, stdout, stderr) {
              console.log('End...');
        }) 
        .size(size)
        .noAudio()
        .save('video/'+size+'_output.webm');
	}
    
}
module.exports = Segment_Creater;
