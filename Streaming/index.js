const Player = require("./streaming");
const Timer = require("./timer");
const path = require("path");

const playerElement = document.getElementById("videoPlayer");
const video_id = playerElement.getAttribute("data-player-id");
/*
var base_video_url = path.join(window.location.href,"/..")

if(window.location.href.split("/") > 4){
	//const url = new URL(base_video_url).getPath();
	var obj = new URL(base_video_url)
	base_video_url = obj.pathname
}
else{
	base_video_url = ""
}
*/
console.log( "////////" )
console.log( window.location.href.split("/") )
console.log( "////////" )
const player = new Player(video_id);

playerElement.src = player.objectUrl;
playerElement.addEventListener("error", (err) => console.log(err));

let timer = new Timer(playerElement.duration);

playerElement.addEventListener("play", () => {
	console.log("playplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplayplay")
	timer.start();
});

playerElement.addEventListener("ended", () => {
	console.log("endedendedendedendedendedendedendedendedendedendedendedendedendedendedendedendedendedended")
	timer.end();
	timer.setVideoDuration(playerElement.duration);
	console.log("Lag Ratio: " + timer.lagRatio);
});
