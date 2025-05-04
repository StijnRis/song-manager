import SongManager from "./components/SongManager";
import { getAllSongs } from "./utils/fileManager";

export default async function Home() {
    const songs = await getAllSongs();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Song Manager</h1>
            <SongManager songs={songs} />
        </div>
    );
}
