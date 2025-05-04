"use server";
import { promises as fs } from "fs";
import path from "path";
import { Song } from "../types";

const DATA_DIR = "C:\\Prive\\Songs";

export const getDataDir = async () => DATA_DIR;

export async function getAllSongs(): Promise<Song[]> {
    try {
        const songs: Song[] = [];
        const titles = await fs.readdir(DATA_DIR);

        for (const title of titles) {
            const folderPath = path.join(DATA_DIR, title);
            const stat = await fs.stat(folderPath);
            if (stat.isDirectory()) {
                const song = await getSong(title);
                if (song) {
                    songs.push(song);
                }
            }
        }

        return songs;
    } catch (error) {
        console.error("Error listing songs:", error);
        return [];
    }
}

export async function getSong(title: string): Promise<Song | null> {
    const folderPath = path.join(DATA_DIR, `${title}`);
    const metadataPath = path.join(folderPath, "metadata.json");
    try {
        await fs.access(metadataPath);
    } catch {
        await fs.writeFile(metadataPath, JSON.stringify({}, null, 2));
    }
    const metadata = await fs.readFile(metadataPath, "utf-8");
    const data = JSON.parse(metadata);
    const files = await fs.readdir(folderPath);
    return { title, ...data, files };
}

export async function addSong(title: string): Promise<Song | null> {
    try {
        const folderName = `${title}`;
        const folderPath = path.join(DATA_DIR, folderName);
        await fs.mkdir(folderPath, { recursive: true });

        // Save metadata
        const song = {
            title,
            createdAt: new Date().toISOString(),
            files: [],
        };
        await fs.writeFile(
            path.join(folderPath, "metadata.json"),
            JSON.stringify(song, null, 2)
        );

        return song;
    } catch (error) {
        console.error("Error adding song:", error);
        return null;
    }
}