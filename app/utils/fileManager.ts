"use server";
import { promises as fs } from "fs";
import path from "path";
import prisma from "./prisma";
import { Song } from "./types";

if (!process.env.SONG_DIR) {
    throw new Error("DATA_DIR environment variable is not set.");
}
const SONG_DIR = process.env.SONG_DIR;

// Helper: Find youtubeId from a list of files in a folder
async function extractYoutubeIdFromFiles(
    folderPath: string,
    files: string[]
): Promise<string | null> {
    for (const file of files) {
        if (file.toLowerCase().endsWith(".url")) {
            const filePath = path.join(folderPath, file);
            try {
                const content = await fs.readFile(filePath, "utf-8");
                const match = content.match(/URL=(https?:\/\/[^\r\n]+)/i);
                if (match && match[1].includes("youtube.com")) {
                    const url = match[1];
                    const youtubeIdMatch = url.match(
                        /(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/
                    );
                    if (youtubeIdMatch) {
                        return youtubeIdMatch[1];
                    }
                }
            } catch {}
        }
    }
    return null;
}

// Helper: Get latest file scores for a list of files
async function getLatestFileScores(
    files: string[]
): Promise<Map<string, { proficiency: number | null; rating: number | null }>> {
    const fileScores = await prisma.fileScore.findMany({
        where: { file: { in: files } },
        orderBy: [{ file: "asc" }, { playedAt: "desc" }],
    });
    const fileScoreMap = new Map<
        string,
        { proficiency: number | null; rating: number | null }
    >();
    for (const score of fileScores) {
        if (!fileScoreMap.has(score.file)) {
            fileScoreMap.set(score.file, {
                proficiency: score.proficiency ?? null,
                rating: score.rating ?? null,
            });
        }
    }
    return fileScoreMap;
}

// Helper: Build file data array for a song
function buildFileData(
    files: string[],
    fileScoreMap: Map<
        string,
        { proficiency: number | null; rating: number | null }
    >
) {
    return files.map((name) => {
        const score = fileScoreMap.get(name);
        return {
            name,
            last_proficiency: score?.proficiency ?? null,
            last_rating: score?.rating ?? null,
        };
    });
}

export async function getAllSongs(): Promise<Song[]> {
    const songs: Song[] = [];
    const titles = await fs.readdir(SONG_DIR);
    const songFolders: { title: string; files: string[] }[] = [];
    // Collect all song folders and their files
    for (const title of titles) {
        const folderPath = path.join(SONG_DIR, title);
        const stat = await fs.stat(folderPath);
        if (stat.isDirectory()) {
            const files = await fs.readdir(folderPath);
            songFolders.push({ title, files });
        }
    }
    // Get all latest fileScores in one query (no raw SQL)
    // 1. Get all fileScore records for relevant files
    const allFiles = songFolders.flatMap(({ files }) => files);
    const fileScoreMap = await getLatestFileScores(allFiles);
    // Now build the Song[]
    for (const { title, files } of songFolders) {
        const folderPath = path.join(SONG_DIR, title);
        const youtubeId = await extractYoutubeIdFromFiles(folderPath, files);
        // Build file data
        const fileData = buildFileData(files, fileScoreMap);
        songs.push({
            title,
            files: fileData,
            youtubeId,
        });
    }
    return songs;
}

export async function getSong(title: string): Promise<Song | null> {
    const folderPath = path.join(SONG_DIR, `${title}`);
    const files = await fs.readdir(folderPath);
    const youtubeId = await extractYoutubeIdFromFiles(folderPath, files);
    const fileScoreMap = await getLatestFileScores(files);
    const fileData = buildFileData(files, fileScoreMap);
    return {
        title,
        files: fileData,
        youtubeId,
    };
}

export async function getFullPath(
    title: string,
    file: string
): Promise<string> {
    const folderPath = path.join(SONG_DIR, title);
    return path.join(folderPath, file);
}
