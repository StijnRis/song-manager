"use client";

import { useEffect, useState } from "react";
import { Song } from "../utils/types";
import { SongListItem } from "./SongListItem";

export default function SongList({ songs }: { songs: Song[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredSongs, setFilteredSongs] = useState(songs);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const lowerCaseQuery = searchQuery.toLowerCase();
            setFilteredSongs(
                songs.filter((song) => {
                    // Normalize text by removing accents and converting to lowercase
                    const normalizedTitle = song.title
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
                    const normalizedQuery = lowerCaseQuery
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");

                    // Check if the normalized title includes the normalized query
                    return normalizedTitle.includes(normalizedQuery);
                })
            );
        }, 300); // Debounce search input by 300ms
        return () => clearTimeout(timeoutId);
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
