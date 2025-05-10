"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Song } from "../types";

export default function SongList({ songs }: { songs: Song[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSongs, setFilteredSongs] = useState(songs);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        setFilteredSongs(
            songs.filter((song) => {
                const normalizedTitle = song.title
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                const normalizedQuery = lowerCaseQuery
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");
                return normalizedTitle.includes(normalizedQuery);
            })
        );
    }, [searchQuery, songs]);

    return (
        <div className="song-list">
            <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul className="space-y-2">
                {filteredSongs.map((song, index) => (
                    <li key={index}>
                        <SongListItem song={song} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SongListItem({ song }: { song: Song }) {
    let max_proficiency: number | null = Math.max(
        ...Object.values(song.fileScores).map((score) => {
            if (
                Array.isArray(score.proficiency) &&
                score.proficiency.length > 0
            ) {
                return score.proficiency[score.proficiency.length - 1].score;
            }
            return 0;
        })
    );
    if (max_proficiency === -Infinity) {
        max_proficiency = null;
    }

    let max_rating: number | null = Math.max(
        ...Object.values(song.fileScores).map((score) => {
            if (Array.isArray(score.rating) && score.rating.length > 0) {
                return score.rating[score.rating.length - 1].score;
            }
            return -Infinity;
        })
    );
    if (max_rating === -Infinity) {
        max_rating = null;
    }

    console.log(max_rating);

    return (
        <Link
            href={`/song/${song.title}`}
            className="flex items-center w-full gap-4 flex-1 p-4 bg-white dark:bg-gray-800 border rounded shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer mb-2 last:mb-0"
        >
            <p className="font-semibold text-gray-800 dark:text-gray-100">
                {song.title}
            </p>
            <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                    Proficiency:{" "}
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${
                                typeof max_rating === "number"
                                    ? `hsl(${
                                          (max_rating / 10) * 120
                                      }, 80%, 50%)`
                                    : "#ccc"
                            }, #e5e7eb)`,
                            color: "#222",
                            fontWeight: 600,
                            fontSize: 14,
                            border: "2px solid #e5e7eb",
                        }}
                    >
                        {typeof max_proficiency === "number"
                            ? max_proficiency
                            : "N/A"}
                    </span>
                </span>
                <span>
                    Rating:{" "}
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${
                                typeof max_rating === "number"
                                    ? `hsl(${
                                          (max_rating / 10) * 120
                                      }, 80%, 50%)`
                                    : "#ccc"
                            }, #e5e7eb)`,
                            color: "#222",
                            fontWeight: 600,
                            fontSize: 14,
                            border: "2px solid #e5e7eb",
                        }}
                    >
                        {typeof max_rating === "number" ? max_rating : "N/A"}
                    </span>
                </span>
            </div>
        </Link>
    );
}
