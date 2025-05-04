import SongDetails from "../../components/SongDetails";
import { getSong } from "../../utils/fileManager";

export default async function SongPage({
    params,
}: {
    params: Promise<{ title: string }>;
}) {
    
    const title = decodeURIComponent((await params).title).replace(/%20/g, " ");
    const song = await getSong(title);

    if (!song) {
        return <div>Song not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <SongDetails song={song} />
        </div>
    );
}
