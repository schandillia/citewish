import { Inter as FontSans } from "next/font/google";

export const bodyFont = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const accentFont = FontSans({
  subsets: ["latin"],
  variable: "--font-heading",
});
