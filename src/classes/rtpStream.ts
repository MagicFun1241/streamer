import Stream, {Format, StreamOptions} from "./core/stream";

type RtpStreamOptions = Omit<StreamOptions, "format">;

export default class RtpStream extends Stream {
    constructor(options: RtpStreamOptions) {
        super({
            outputProtocol: "rtp",
            format: Format.RTP,
            ...options
        });
    }
}