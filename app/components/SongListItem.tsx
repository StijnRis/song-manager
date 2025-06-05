import Link from "next/link";
import { Song } from "../utils/types";

export function SongListItem({ song }: { song: Song }) {
    const proficiencies = song.files.map((file) =>
        file.last_proficiency ? file.last_proficiency : -1
    );
    const ratings = song.files.map((file) =>
        file.last_rating ? file.last_rating : -1
    );

    let max_proficiency =
        proficiencies.length > 0 ? Math.max(...proficiencies) : null;
    let max_rating = ratings.length > 0 ? Math.max(...ratings) : null;

    if (max_proficiency === -1) {
        max_proficiency = null;
    }
    if (max_rating === -1) {
        max_rating = null;
    }

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
                    <ScoreIcon value={max_proficiency} label="Proficiency" />
                </span>
                <span className="flex items-center gap-1">
                    Rating: <ScoreIcon value={max_rating} label="Rating" />
                </span>
            </div>
        </Link>
    );
}

function ScoreIcon({ value, label }: { value: number | null; label: string }) {
    // Color: green for high, yellow for mid, red for low, gray for null
    let bgColor = "bg-gray-200";
    let text = "N/A";
    if (typeof value === "number") {
        text = value.toString();
        if (value >= 7) bgColor = "bg-green-400";
        else if (value >= 4) bgColor = "bg-yellow-400";
        else bgColor = "bg-red-400";
    }
    return (
        <span
            className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-semibold text-sm border-2 border-gray-200 mr-1 select-none ${bgColor} text-black`}
            aria-label={label}
            title={label}
        >
            {text}
        </span>
    );
}
