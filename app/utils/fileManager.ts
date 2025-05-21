"use server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "./prisma";
import { Song } from "./types";

if (!process.env.SONG_DIR) {
    throw new Error("DATA_DIR environment variable is not set.");
}
const SONG_DIR = process.env.SONG_DIR;

export async function getAllSongs(): Promise<Song[]> {
    try {
        const songs: Song[] = [];
        const titles = await fs.readdir(SONG_DIR);

        for (const title of titles) {
            const folderPath = path.join(SONG_DIR, title);
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
    const folderPath = path.join(SONG_DIR, `${title}`);
    const files = await fs.readdir(folderPath);
    let youtubeId = null;

    for (const file of files) {
        if (file.toLowerCase().endsWith(".url")) {
            const filePath = path.join(folderPath, file);
            const content = await fs.readFile(filePath, "utf-8");
            const match = content.match(/URL=(https?:\/\/[^\r\n]+)/i);
            if (match && match[1].includes("youtube.com")) {
                const url = match[1];
                const youtubeIdMatch = url.match(
                    /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/
                );
                if (youtubeIdMatch) {
                    youtubeId = youtubeIdMatch[1];
                    break;
                }
            }
        }
    }

    // Get proficiency and rating for each file from the database
    const fileData = await Promise.all(
        files.map(async (name) => {
            // Get the latest fileScore for this file from the database
            const score = await prisma.fileScore.findFirst({
                where: { file: name },
                orderBy: { playedAt: "desc" },
            });
            return {
                name,
                last_proficiency: score?.proficiency ?? null,
                last_rating: score?.rating ?? null,
            };
        })
    );

    return {
        title,
        files: fileData,
        youtubeId,
    };;
}

export async function getFullPath(
    title: string,
    file: string
): Promise<string> {
    const folderPath = path.join(SONG_DIR, title);
    return path.join(folderPath, file);
}
