import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage({
    params,
}: {
    params: Promise<{ from?: string }>;
}) {
    const from = (await params).from;

    const loginAction = async (formData: FormData) => {
        "use server";
        const cookieStore = await cookies();
        const password = formData.get("password");
        if (password === process.env.SITE_PASSWORD) {
            cookieStore.set("site-auth", password, {
                httpOnly: true,
                path: "/",
            });
            redirect(from || "/");
        }
    };

    return (
        <form
            action={loginAction}
            method="POST"
            className="max-w-xs mx-auto mt-24 flex flex-col gap-3 p-6 bg-white dark:bg-gray-800 rounded shadow"
        >
            <h2 className="text-lg font-semibold mb-2 text-center">
                Password Required
            </h2>
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
            >
                Login
            </button>
        </form>
    );
}
