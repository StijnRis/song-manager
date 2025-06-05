import Link from "next/link";
import { Song } from "../utils/types";
import SongFileRatingForm from "./SongFileRatingForm";

export default function SongFileCard({
    song,
    file,
}: {
    song: Song;
    file: { name: string };
}) {
    return (
        <div className="flex flex-col items-center flex-1 max-w-[220px] min-w-[180px]">
            <SongFileCardHeader song={song} file={file} />
            <SongFileCardPreview song={song} file={file} />
            <SongFileRatingForm song={song} fileName={file.name} />
        </div>
    );
}

function SongFileCardHeader({
    song,
    file,
}: {
    song: Song;
    file: { name: string };
}) {
    return (
        <div className="flex items-center w-full justify-between mt-2 mb-1">
            <span
                className="truncate text-xs font-medium text-gray-700 dark:text-gray-200 w-full overflow-hidden text-ellipsis whitespace-nowrap inline-block"
                title={file.name}
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
    );
}

function SongFileCardPreview({
    song,
    file,
}: {
    song: Song;
    file: { name: string };
}) {
    return (
        <div className="w-full aspect-[8/11] flex items-center justify-center bg-white">
            <embed
                src={`/data/${song.title}/${file.name}`}
                className="w-full h-full object-contain max-h-full max-w-full"
            />
        </div>
    );
}
