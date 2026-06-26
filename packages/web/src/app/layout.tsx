import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
	variable: "--font-zen-kaku",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "MEIS-lite",
	description: "医療機器台帳管理システム。Hono / Next.jsで実装。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" className={`${zenKaku.className} h-full antialiased`}>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
