"use client";

import { useState } from "react";
import { Song } from "../types";

export default function SongDetails({ song }: { song: Song }) {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const handleDownloadLyrics = async () => {
        // const fetchedLyrics = await fetchLyrics(song.title);
        // if (!fetchedLyrics) {
        //     alert("Lyrics not found.");
        //     return;
        // }
        // try {
        //     const lyricsFilePath = `${song.folderPath}/lyrics.txt`;
        //     await fetch("/api/save-file", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             filePath: lyricsFilePath,
        //             content: fetchedLyrics,
        //         }),
        //     });
        //     alert("Lyrics downloaded and saved successfully.");
        // } catch (error) {
        //     console.error("Error saving lyrics:", error);
        //     alert("Failed to save lyrics.");
        // }
    };

    const handleDownloadChords = async () => {
        // const fetchedChords = await fetchChords(song.title, song.artist);
        // if (!fetchedChords) {
        //     alert("Chords not found.");
        //     return;
        // }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this song?"
        );
        if (confirmDelete) {
            try {
                await removeSong(song);
            } catch (error) {
                console.error("Error deleting song:", error);
                alert("Failed to delete the song.");
            }
        }
    };

    return (
        <div className="song-details p-4 bg-white border border-gray-200 rounded shadow-sm">
            <h2 className="text-2xl font-bold mb-4">{song.title}</h2>
            <div className="file-navigation flex space-x-2 mb-4">
                {song.files.map((file, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedFile(file)}
                        className={`px-4 py-2 border rounded shadow-sm ${
                            selectedFile === file
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        {file}
                    </button>
                ))}
            </div>
            <div className="file-viewer mb-4 h-screen">
                <iframe
                    src={`/data/${song.title}/${selectedFile}`}
                    className="w-full h-full border rounded"
                    title="PDF Viewer"
                ></iframe>
            </div>
            <div className="actions flex space-x-4">
                <button
                    onClick={handleDownloadLyrics}
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600"
                >
                    Download Lyrics
                </button>
                <button
                    onClick={handleDownloadChords}
                    className="px-4 py-2 bg-green-500 text-white rounded shadow-sm hover:bg-green-600"
                >
                    Download Chords
                </button>
            </div>
        </div>
    );
}
