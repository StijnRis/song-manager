"use client";
import { useState, useTransition } from "react";
import { Song } from "../types";
import { addSongScore } from "../utils/fileManager";

export default function SongDetailsForm({
    song,
    fileName,
}: {
    song: Song;
    fileName: string;
}) {
    const fileScore = song.fileScores[fileName] || {};
    const [proficiency, setProficiency] = useState<number | null>(
        Array.isArray(fileScore.proficiency) && fileScore.proficiency.length > 0
            ? fileScore.proficiency[fileScore.proficiency.length - 1].score
            : null
    );
    const [rating, setRating] = useState<number | null>(
        Array.isArray(fileScore.rating) && fileScore.rating.length > 0
            ? fileScore.rating[fileScore.rating.length - 1].score
            : null
    );
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        if (proficiency === null || rating === null) {
            setMessage("Please set both scores before saving.");
            return;
        }
        startTransition(async () => {
            try {
                await addSongScore(song.title, fileName, proficiency, rating);
                setMessage("Score saved!");
            } catch {
                setMessage("Failed to save score.");
            }
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded shadow w-full"
        >
            <div className="mb-2">
                <label className="block mb-1 font-medium text-xs">
                    Proficiency
                </label>
                <div className="flex items-center gap-2">
                    <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.1}
                        value={proficiency ?? 0}
                        onChange={(e) =>
                            setProficiency(
                                Number(parseFloat(e.target.value).toFixed(1))
                            )
                        }
                        className="w-full"
                        style={{ maxWidth: 120 }}
                    />
                    <span className="text-xs text-gray-700 dark:text-gray-300 w-6 text-center">
                        {proficiency !== null ? proficiency.toFixed(1) : "-"}
                    </span>
                </div>
            </div>
            <div className="mb-2">
                <label className="block mb-1 font-medium text-xs">Rating</label>
                <div className="flex items-center gap-2">
                    <input
                        type="range"
                        min={0}
                        max={10}
                        step={0.1}
                        value={rating ?? 0}
                        onChange={(e) =>
                            setRating(
                                Number(parseFloat(e.target.value).toFixed(1))
                            )
                        }
                        className="w-full"
                        style={{ maxWidth: 120 }}
                    />
                    <span className="text-xs text-gray-700 dark:text-gray-300 w-6 text-center">
                        {rating !== null ? rating.toFixed(1) : "-"}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 mt-2">
                <button
                    type="submit"
                    className="px-2 py-1 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition"
                    style={{ minWidth: 80 }}
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : "Save Score"}
                </button>
                <button
                    type="button"
                    onClick={async () => {
                        setProficiency(null);
                        setRating(null);
                        setMessage("");
                        startTransition(async () => {
                            try {
                                await addSongScore(
                                    song.title,
                                    fileName,
                                    null,
                                    null
                                );
                                setMessage("Scores reset!");
                            } catch {
                                setMessage("Failed to reset scores.");
                            }
                        });
                    }}
                    className="px-2 py-1 bg-gray-300 text-gray-800 rounded text-xs font-medium hover:bg-gray-400 transition"
                    style={{ minWidth: 80 }}
                    disabled={isPending}
                >
                    Reset Score
                </button>
            </div>
            {message && (
                <div className="mt-1 text-xs text-green-600 dark:text-green-400">
                    {message}
                </div>
            )}
        </form>
    );
}
