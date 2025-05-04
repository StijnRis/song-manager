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
            songs.filter(
                (song) =>
                    song.title.toLowerCase().includes(lowerCaseQuery) ||
                    song.artist.toLowerCase().includes(lowerCaseQuery)
            )
        );
    }, [searchQuery, songs]);

    return (
        <div className="song-list">
            <input
                type="text"
                placeholder="Search by title or artist"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ul className="space-y-2">
                {filteredSongs.map((song, index) => (
                    <Link href={`/song/${song.title}`}>
                        <li
                            key={index}
                            className="p-4 bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-100 cursor-pointer"
                        >
                            <p className="font-semibold text-gray-800">
                                {song.title}
                            </p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
