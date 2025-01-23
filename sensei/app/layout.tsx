import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { ModalProvider } from "@/components/ui/modalprovider";
import { ToastProvider } from "@/components/ui/toast";
import { CrispProvider } from "@/components/ui/crisp-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sensei",
  description: "AI that rules them all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider/>
        <body>
          <ModalProvider />
          <ToastProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
