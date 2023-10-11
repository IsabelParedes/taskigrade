import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tardigrade",
  description: "It's gonna do stuff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <Providers>
          <body className={cn("min-h-screen", inter.className)}>
            {children}
          </body>
        </Providers>
      </ClerkProvider>
    </html>
  );
}
