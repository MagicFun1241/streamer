const {
    RtmpStream
} = require("../lib");

const stream = new RtmpStream({
    input: "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4",
    output: "rtmp://...",
    key: "..."
});

stream.start();