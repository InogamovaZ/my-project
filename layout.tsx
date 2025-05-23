// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "../contexts/language-context";
import { SessionProvider } from "next-auth/react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <Provider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Provider>
      </body>
    </html>
  );
}
