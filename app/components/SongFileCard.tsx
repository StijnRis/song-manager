import Link from "next/link";
import { Song } from "../utils/types";
import SongFileRatingForm from "./SongFileRatingForm";

interface SongFileCardProps {
    song: Song;
    file: { name: string };
}

export default function SongFileCard({ song, file }: SongFileCardProps) {
    return (
        <div
            className="flex flex-col items-center"
            style={{ flex: "1 0 180px", maxWidth: "220px" }}
        >
            {/* Header */}
            <div className="flex items-center w-full justify-between mt-2 mb-1">
                <span
                    className="truncate text-xs font-medium text-gray-700 dark:text-gray-200 w-full"
                    title={file.name}
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                    }}
                >
                    {file.name}
                </span>
                <Link
                    href={`/data/${song.title}/${file.name}`}
                    target="_blank"
                    className="ml-2 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-xs"
                >
                    Open
                </Link>
            </div>
            {/* Preview */}
            <div className="w-full aspect-[8/11] flex items-center justify-center bg-white">
                <embed
                    src={`/data/${song.title}/${file.name}`}
                    className="w-full h-full object-contain"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
            </div>
            {/* Rating Form */}
            <SongFileRatingForm song={song} fileName={file.name} />
        </div>
    );
}
