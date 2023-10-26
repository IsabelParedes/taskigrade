import Navbar from "@/components/NavBar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Providers from "@/components/providers/TrpcProviders";
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
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <Providers>
          <body className={cn("min-h-screen", inter.className)}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </Providers>
      </ClerkProvider>
    </html>
  );
}
