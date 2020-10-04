# Streamer
Simple streaming library based on **FFMPEG**.

## Examples
Using TypeScript:
```typescript
import { RtmpStream } from "@magicfun1241/streamer";

const stream = new RtmpStream({
    input: "{URL_TO_MP4}",
    output: "rtmp://live-waw.twitch.tv/app",
    key: "{STREAM_KEY}"
});

stream.start();
```
It's supports **ES5** too. Just change import to something like this:
```javascript
const { RtmpStream } = require("@magicfun1241/streamer");
```
Other examples will be in */examples* directory.

## License
MIT