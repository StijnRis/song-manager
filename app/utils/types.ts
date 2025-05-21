export type Song = {
    title: string;
    files: {
        name: string;
        last_proficiency: number | null;
        last_rating: number | null;
    }[];
    youtubeId: string | null;
};
