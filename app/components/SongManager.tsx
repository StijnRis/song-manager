"use client";

import { useRouter } from "next/navigation";
import { Song } from "../types";
import { addSong } from "../utils/fileManager";
import SongList from "./SongList";

type SongManagerProps = {
    songs: Song[];
};

export default function SongManager({ songs }: SongManagerProps) {
    const router = useRouter();

    const handleCreateSong = async () => {
        const title = prompt("Enter song title:");

        if (title) {
            try {
                const result = await addSong(title);
                if (result) {
                    router.push(`/song/${title}`);
                } else {
                    alert("Failed to create song.");
                }
            } catch (error) {
                console.error("Error creating song:", error);
                alert("An error occurred while creating the song.");
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={handleCreateSong}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded shadow-sm hover:bg-blue-600"
            >
                Create New Song
            </button>
            <SongList songs={songs} />
        </div>
    );
}
