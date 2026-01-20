import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { EmailModalProvider } from "@/contexts/email-modal-context";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  description: "Join the beta for RuneSpoke Hub - The complete AI-powered development platform. Bring your own AI (Claude, ChatGPT, Gemini, Local LLMs). No platform markup.",
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
          <Analytics />
          <SpeedInsights />
        </EmailModalProvider>
      </body>
    </html>
  );
}
