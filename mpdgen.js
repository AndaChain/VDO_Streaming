const { exec } = require('node:child_process');

class mpdgen{
    constructor(filename){
		var path = __dirname + '\\video\\'
        exec('ffmpeg.exe -f webm_dash_manifest -i '+path+filename+'_160x90_output.webm -f webm_dash_manifest -i '+path+filename+'_320x180_output.webm -f webm_dash_manifest -i '+path+filename+'_640x360_output.webm -f webm_dash_manifest -i '+path+filename+'_audio.webm -c copy -map 0 -map 1 -map 2 -map 3 -f webm_dash_manifest -adaptation_sets "id=0,streams=0,1,2 id=1,streams=3" '+path+filename+'_manifest.webm', (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
          });
    }
}
module.exports = mpdgen;
