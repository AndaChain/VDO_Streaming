const Queue = require("./queue");

var player = document.getElementById("videoPlayer");

player.addEventListener("error", (err) => console.log(err));

var mse = new (window.MediaSource || window.WebKitMediaSource());
mse.addEventListener("sourceopen", function (evt) {
	console.log("Source opened", this);

	var videoSourceBuffer = this.addSourceBuffer('video/webm; codecs="vp9"');
	var audioSourceBuffer = this.addSourceBuffer('audio/webm; codecs="vorbis"')

	let audioQueue = new Queue();
	let videoQueue = new Queue();

	function appendBufFromQueue(srcBuffer, queue) {
		queue.pipingToSourceBuffer = true;
		let buf = queue.popFirst();

		return Boolean(buf) && (srcBuffer.appendBuffer(buf) || true);
	}

	videoSourceBuffer.addEventListener("updateend", function() {
		if(!appendBufFromQueue(this, videoQueue)) videoQueue.pipingToSourceBuffer = false;
	});

	audioSourceBuffer.addEventListener("updateend", function() {
		if(!appendBufFromQueue(this, audioQueue)) audioQueue.pipingToSourceBuffer = false;
	});

	fetch("/seyeon/640x360_750k.webm", {
		headers: {
			range: "0-"
		}
	})
	.then((response) => {
		var reader = response.body.getReader();

		(function readData() {
			reader.read()
			.then((buffer) => {
				videoQueue.push(buffer.value);
				if(!videoQueue.pipingToSourceBuffer) {
					console.log("called: ", videoSourceBuffer, videoQueue.pipingToSourceBuffer);
					appendBufFromQueue(videoSourceBuffer, videoQueue);
				}

				if(!buffer.done) readData();
			});
		})()
	});

	fetch("/seyeon/audio.webm", {
		headers: {
			range: "0-"
		}
	})
	.then((response) => {
		var reader = response.body.getReader();

		(function readData() {
			reader.read()
			.then((buffer) => {
				audioQueue.push(buffer.value);
				if(!audioQueue.pipingToSourceBuffer) {
					console.log("called: ", audioSourceBuffer, audioQueue.pipingToSourceBuffer);
					appendBufFromQueue(audioSourceBuffer, audioQueue);
				}

				if(!buffer.done) readData();
			});
		})()
	});
});

player.src = URL.createObjectURL(mse);