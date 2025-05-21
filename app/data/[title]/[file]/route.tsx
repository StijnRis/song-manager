import { getFullPath } from "@/app/utils/fileManager";
import fs from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ title: string; file: string }> }
) {
    const { title, file } = await params;

    const filePath = await getFullPath(title, file);
    try {
        const fileBuffer = await fs.readFile(filePath);

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                "Content-Disposition": 'inline; filename="' + file + '"',
            },
        });
    } catch (err) {
        return new NextResponse("File not found", { status: 404 });
    }
}
