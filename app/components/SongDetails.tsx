"use client";

import { Song } from "../utils/types";
import SongFileCard from "./SongFileCard";

export default function SongDetails({ song }: { song: Song }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{song.title}</h1>
            {/* Youtube video */}
            {song.youtubeId && <YoutubeVideo youtubeId={song.youtubeId} />}
            {/* Song files */}
            <SongFiles song={song} />
        </div>
    );
}

function YoutubeVideo({ youtubeId }: { youtubeId: string }) {
    return (
        <div className="mb-6 flex justify-center">
            <iframe
                width="916"
                height="515"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>
        </div>
    );
}

function SongFiles({ song }: { song: Song }) {
    return (
        <div className="flex flex-wrap gap-4 mb-4">
            {song.files.map((file) => (
                <SongFileCard key={file.name} song={song} file={file} />
            ))}
        </div>
    );
}
