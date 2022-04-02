// จะเอาเฉพาะ streaming มาไว้ในนี้
// เพื่อจะเอาไปทำเป็น algorithm ต่อไป


// ส่วนแรกเป็นการกำหนด ขนาดของ CHUNK, CHUNK เริ่มต้น, CHUNK จุดสิ้นสุด และ ความยาว
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);


// ส่วนสองเตรียมยัดพวกค่าที่กำหนดไปตอนส่วนแรกไปใน code ของ HTTP ที่เป็น headers (code 206)
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mkv",
  };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);

// ลองเปลี่ยน framwork
