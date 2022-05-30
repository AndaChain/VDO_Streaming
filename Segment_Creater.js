const fs = require('fs');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

const ffmpeg = createFFmpeg({ log: true });

class Segment_Creater{
    constructor(dir_file){
        console.log(dir_file);
        (async () => {
            await ffmpeg.load();
            ffmpeg.FS('writeFile' , 'mongodb_group5.mp4' , await fetchFile( __dirname + '/video/test.mp4'))
            await ffmpeg.run('-i', 'test.avi', 'mongodb_group5.mp4');
            process.exit(0);
        })();
    }
}
module.exports = Segment_Creater;