export interface Song {
    title: string;
    createdAt: string;
    files: string[];
    fileScores: {
        [fileName: string]: {
            proficiency?: { score: number; playedAt: string }[];
            rating?: { score: number; playedAt: string }[];
        };
    };
    youtubeId: string;
}
