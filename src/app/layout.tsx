import type { Metadata } from "next";
import { bodyFont, accentFont } from "@/lib/fonts";
import meta from "@/lib/meta.json";

import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: meta.HOME.TITLE,
  description: meta.HOME.DESCRIPTION,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(bodyFont.variable, accentFont.variable)}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
