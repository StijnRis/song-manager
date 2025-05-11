import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

export default async function LoginPage({
    searchParams: searchParamsPromise,
}: {
    searchParams: Promise<{ from?: string }>;
}) {
    const searchParams = await searchParamsPromise;

    const loginAction = async (formData: FormData) => {
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
    };

    return (
        <form
            action={loginAction}
            method="POST"
            style={{
                maxWidth: 300,
                margin: "100px auto",
                display: "flex",
                flexDirection: "column",
                gap: 12,
            }}
        >
            <h2>Password Required</h2>
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}
