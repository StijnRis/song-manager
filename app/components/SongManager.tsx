"use client";

import { Song } from "../utils/types";
import SongList from "./SongList";

export default function SongManager({ songs }: { songs: Song[] }) {
    return (
        <div className="container mx-auto p-4">
            <SongList songs={songs} />
        </div>
    );
}
