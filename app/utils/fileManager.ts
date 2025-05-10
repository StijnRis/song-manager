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
    const data: Record<string, any> = JSON.parse(metadata);
    const files = await fs.readdir(folderPath);
    return {
        title,
        files,
        fileScores: data.fileScores || {},
        youtubeId: data.youtubeId || "",
        createdAt: data.createdAt || "",
    };
}

export async function addSong(title: string): Promise<Song | null> {
    try {
        const folderName = `${title}`;
        const folderPath = path.join(DATA_DIR, folderName);
        await fs.mkdir(folderPath, { recursive: true });

        // Save metadata
        const song: Song = {
            title,
            createdAt: new Date().toISOString(),
            files: [],
            fileScores: {},
            youtubeId: "",
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

export async function addSongScore(
    title: string,
    fileName: string,
    proficiency: number | null,
    rating: number | null
): Promise<void> {
    const folderPath = path.join(DATA_DIR, `${title}`);
    const metadataPath = path.join(folderPath, "metadata.json");
    let metadata: any = {};
    try {
        await fs.access(metadataPath);
        const file = await fs.readFile(metadataPath, "utf-8");
        metadata = JSON.parse(file);
    } catch {
        // If file doesn't exist, start with empty
    }
    if (!metadata.fileScores) metadata.fileScores = {};
    if (!metadata.fileScores[fileName]) metadata.fileScores[fileName] = {};
    const now = new Date().toISOString();
    if (typeof proficiency === "number") {
        if (!Array.isArray(metadata.fileScores[fileName].proficiency))
            metadata.fileScores[fileName].proficiency = [];
        metadata.fileScores[fileName].proficiency.push({
            score: proficiency,
            playedAt: now,
        });
    }
    if (typeof rating === "number") {
        if (!Array.isArray(metadata.fileScores[fileName].rating))
            metadata.fileScores[fileName].rating = [];
        metadata.fileScores[fileName].rating.push({
            score: rating,
            playedAt: now,
        });
    }
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
}
