"use client";

import { Song } from "../utils/types";
import SongList from "./SongList";

type SongManagerProps = {
    songs: Song[];
};

export default function SongManager({ songs }: SongManagerProps) {
    return (
        <div className="container mx-auto p-4">
            <SongList songs={songs} />
        </div>
    );
}
