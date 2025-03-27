import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BodyWrapper from "@/components/body-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UK HRMS",
  description: "AI-Powered HRMS for Sponsor License Compliance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <BodyWrapper>
          {children}
        </BodyWrapper>
      </body>
    </html>
  );
}
