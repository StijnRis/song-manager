"use client";

import Link from "next/link";
import { Song } from "../utils/types";
import SongFileRatngForm from "./SongFileRatingForm";

export default function SongDetails({ song }: { song: Song }) {


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{song.title}</h1>
            {song.youtubeId && (
                <div className="mb-6 flex justify-center">
                    <iframe
                        width="916"
                        height="515"
                        src={`https://www.youtube.com/embed/${song.youtubeId}`}
                        title="Blue Prince: Can a random puzzle game actually work?"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
            <div className="flex flex-wrap gap-4 mb-4">
                {song.files.map((file, index) => (
                    <div
                        key={file.name}
                        className="flex flex-col items-center"
                        style={{ flex: "1 0 180px", maxWidth: "220px" }}
                    >
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
                        <div className="w-full aspect-[8/11] flex items-center justify-center bg-white">
                            <embed
                                src={`/data/${song.title}/${file.name}`}
                                className="w-full h-full object-contain"
                                style={{ maxHeight: "100%", maxWidth: "100%" }}
                            />
                        </div>
                        <SongFileRatngForm song={song} fileName={file.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}
