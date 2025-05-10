import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Song Manager",
    description: "Manage songs effectively",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <nav className="bg-gray-800 p-4 text-white">
                    <Link
                        href="/"
                        className="text-lg font-bold hover:underline"
                    >
                        Home
                    </Link>
                </nav>
                {children}
            </body>
        </html>
    );
}
