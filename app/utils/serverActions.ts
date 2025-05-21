"use server";
import prisma from "./prisma";

export async function saveFileScoreAction({
    fileName,
    proficiency,
    rating,
}: {
    fileName: string;
    proficiency: number;
    rating: number;
}) {
    return prisma.fileScore.create({
        data: {
            file: fileName,
            proficiency,
            rating,
        },
    });
}
