import Stream, {StreamOptions} from "./core/stream";

export default class RtmpStream extends Stream {
    constructor(options: StreamOptions) {
        super({
            outputProtocol: "rtmp",
            ...options
        });
    }
}