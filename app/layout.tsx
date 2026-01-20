import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { EmailModalProvider } from "@/contexts/email-modal-context";
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
  title: "RuneSpoke Hub - AI-Powered Development Platform",
  description: "Join the beta for RuneSpoke Hub - The complete AI-powered development platform with 90% cost savings compared to GitHub Copilot. Support for Claude, ChatGPT, Gemini, and Local LLMs.",
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
        <EmailModalProvider>
          {children}
        </EmailModalProvider>
      </body>
    </html>
  );
}
