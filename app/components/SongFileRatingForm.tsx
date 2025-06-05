"use client";
import { useState } from "react";
import { saveFileScoreAction } from "../utils/serverActions";
import { Song } from "../utils/types";

export default function SongFileRatingForm({
    song,
    fileName,
}: {
    song: Song;
    fileName: string;
}) {
    const [proficiency, setProficiency] = useState<number | null>(
        song.files.find((file) => file.name === fileName)?.last_proficiency ??
            null
    );
    const [rating, setRating] = useState<number | null>(
        song.files.find((file) => file.name === fileName)?.last_rating ?? null
    );
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        if (proficiency === null || rating === null) {
            setMessage("Please set both scores before saving.");
            return;
        }
        setIsPending(true);
        try {
            await saveFileScoreAction({
                fileName,
                proficiency,
                rating,
            });
            setMessage("Score saved!");
        } catch {
            setMessage("Failed to save score.");
        }
        setIsPending(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-2 p-2 bg-gray-50 dark:bg-gray-800 rounded shadow w-full"
        >
            <RangeInput
                label="Proficiency"
                value={proficiency}
                setValue={setProficiency}
                disabled={isPending}
            />
            <RangeInput
                label="Rating"
                value={rating}
                setValue={setRating}
                disabled={isPending}
            />
            {/* Submit Button */}
            <div className="flex gap-2 mt-2">
                <button
                    type="submit"
                    className="min-w-[80px] px-2 py-1 bg-purple-600 text-white rounded text-xs font-medium hover:bg-purple-700 transition-colors disabled:opacity-60"
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : "Save Score"}
                </button>
            </div>

            {/* Message */}
            {message && (
                <div className="mt-1 text-xs text-green-600 dark:text-green-400">
                    {message}
                </div>
            )}
        </form>
    );
}

function RangeInput({
    label,
    value,
    setValue,
    min = 0,
    max = 10,
    step = 0.1,
    disabled = false,
}: {
    label: string;
    value: number | null;
    setValue: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
}) {
    return (
        <div className="mb-2">
            <label className="block mb-1 font-medium text-xs">{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value ?? 0}
                    onChange={(e) =>
                        setValue(Number(parseFloat(e.target.value).toFixed(1)))
                    }
                    className="w-full max-w-[120px] accent-purple-600"
                    disabled={disabled}
                />
                <span className="text-xs text-gray-700 dark:text-gray-300 w-6 text-center">
                    {value !== null ? value.toFixed(1) : "-"}
                </span>
            </div>
        </div>
    );
}
