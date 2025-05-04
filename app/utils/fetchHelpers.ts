// import { Song } from "../types";

// // Fetch lyrics from an external source
// export async function fetchLyrics(song: Song) {
//     try {
//         const response = await fetch(
//             `https://api.lyrics.ovh/v1/${song.artist}/${song.title}`
//         );
//         if (!response.ok) {
//             throw new Error("Failed to fetch lyrics");
//         }
//         const data = await response.json();
//         return data.lyrics;
//     } catch (error) {
//         console.error("Error fetching lyrics:", error);
//         return null;
//     }
// }

// // Fetch chord progressions from Ultimate Guitar (mock implementation)
// export async function fetchChords(title: string, artist: string) {
//     try {
//         // Replace with actual API call if available
//         return `Chords for ${title} by ${artist} (mock data)`;
//     } catch (error) {
//         console.error("Error fetching chords:", error);
//         return null;
//     }
// }
