import * as dotenv from 'dotenv';
dotenv.config();
import * as fs from "fs";
import * as https from "https";
import * as path from "path";
import * as unzipper from "unzipper";

const url: string | undefined = process.env.DATA_URL;
const outputZip = path.join(__dirname, "data.zip");
const outputDir = path.join(__dirname, "../data");

if (!url) {
    console.error("DATA_URL not set.");
    process.exit(1);
}

type DownloadCallback = () => void;

const download = (url: string, dest: string, cb: DownloadCallback): void => {
    const file = fs.createWriteStream(dest);
    https
        .get(url, (response) => {
            response.pipe(file);
            file.on("finish", () => file.close(cb));
        })
        .on("error", (err: Error) => {
            fs.unlink(dest, () => {});
            console.error("Download error:", err.message);
        });
};

console.log("📦 Downloading data...");

download(url, outputZip, () => {
    console.log("✅ Downloaded zip. Extracting...");
    fs.createReadStream(outputZip)
        .pipe(unzipper.Extract({ path: outputDir }))
        .on("close", () => {
            console.log("✅ Data ready at /data");
        });
});
