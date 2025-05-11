import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

export async function loginAction(formData: FormData) {
    "use server";
    const cookieStore = await cookies();

    const password = formData.get("password");
    if (password === process.env.SITE_PASSWORD) {
        cookieStore.set("site-auth", password, {
            httpOnly: true,
            path: "/",
        });
        redirect(searchParams.from || "/");
    } else {
        // return { error: "Invalid password" };
    }
}
