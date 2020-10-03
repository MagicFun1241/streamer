const {
    RtmpStream
} = require("../lib");

const stream = new RtmpStream({
    input: "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4",
    output: "rtmp://stream2.vkuserlive.com:443/vlive.501708.eyJuIjoiR1BDeEtlNVhhUEkiLCJhIjoibGl2ZSIsInNuIjoiYVdROVIxQkRlRXRsTlZoaFVFa21jMmxuYmoxdVdsZGlhRE5rU1hFdlNWQlVSM1pJVjBsMU5FNVJQVDA9IiwidXIiOjI0MTI3Nzg5NSwidCI6MTYwMTY3MDQwM30",
    key: "GPCxKe5XaPI"
});

stream.start();