import { Roboto_Mono as FontMono, Tilt_Neon as FontSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  // weight: "700"
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
