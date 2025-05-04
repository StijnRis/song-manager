import { getDataDir } from "@/app/utils/fileManager";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const filePath = path.join(await getDataDir(), ...slug);
    console.log("filePath", filePath);
    try {
        const fileBuffer = await fs.readFile(filePath);

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                "Content-Disposition": 'inline; filename="' + slug + '"',
            },
        });
    } catch (err) {
        return new NextResponse("File not found", { status: 404 });
    }
}
