const { exec } = require('node:child_process');

class jsongen{
    constructor(path){
        exec('mse_json_manifest '+path+' > '+path+'.json', (error, stdout, stderr) => {
            if(error){
              console.error(`exec error: ${error}`);
              return;
            }
            console.log("Done...")
          });
    }
}
module.exports = jsongen;
