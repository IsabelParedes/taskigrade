import Navbar from "@/components/NavBar";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
            <Navbar />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </Providers>
      </ClerkProvider>
    </html>
  );
}
