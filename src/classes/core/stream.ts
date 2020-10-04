import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";

import {ChildProcessWithoutNullStreams, spawn} from "child_process";

import * as pathToFfmpeg from "ffmpeg-static";
import * as tempPath from "temp-dir";

import {nanoid} from "nanoid";

export enum Format {
    RTP = "rtp",
    FLV = "flv",
    MPEGTS = "mpegts"
}

export enum Preset {
    Fast = "fast",
    UltraFast = "ultrafast"
}

interface CoreOptions {
    input: string | Array<string>;
    output: string;

    outputProtocol: "rtmp" | "rtp";

    key?: string;
    preset?: Preset;
    format?: Format;
}

export type StreamOptions = Omit<CoreOptions, "outputProtocol">;

export default class Stream {
    private options: CoreOptions;
    private ffmpegProcess: ChildProcessWithoutNullStreams;

    protected started = false;

    constructor(options: CoreOptions) {
        if (!options.output.startsWith(`${options.outputProtocol}://`)) throw new Error("Invalid output url passed");

        if (options.format == null) options.format = Format.FLV;

        if (options.preset == null) options.preset = Preset.UltraFast;

        this.options = options;
    }

    start() {
        if (!this.started) {
            let input;

            if (Array.isArray(this.options.input)) {
                const tmpFilePath = path.join(tempPath, `streamer${nanoid(4)}list`);
                fs.writeFileSync(tmpFilePath, this.options.input.map(value => `file '${value}'`).join("\n"));

                input = [ "-f", "concat", "-safe", "0", "-protocol_whitelist", "file,http,https,tcp,tsl,tls", "-i", tmpFilePath ];
            } else input = [ "-i", this.options.input ];

            const args = [
                "-re",
                ...input,
                "-preset",
                this.options.preset,
                "-c",
                "copy",
                "-bsf:a",
                "aac_adtstoasc",
                "-f",
                this.options.format,
                this.options.key == null ? this.options.output : `${this.options.output}/${this.options.key}`
            ];

            this.ffmpegProcess = spawn(pathToFfmpeg, args);

            this.ffmpegProcess.stdout.on('data', (data) => {
                console.log(data);
            });

            this.ffmpegProcess.stderr.on('data', (data) => {
                console.error(chalk`{red ${data}}`);
            });

            this.ffmpegProcess.on('close', (code) => {
                console.log(chalk`Child process exited with code ${code}`);
            });

            this.started = true;
        } else throw new Error("Stream is already started");
    }

    stop() {
        if (this.started) {
            this.ffmpegProcess.kill();
            this.started = false;
        } else throw new Error("Stream is not started yet");
    }
}