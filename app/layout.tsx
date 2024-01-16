import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Lato } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const lato = Lato({
  subsets: ["latin"],
  weight: "700",
});


export const metadata: Metadata = {
  title: "Red Shield",
  description: "Redis authentication library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-50/30 dark:bg-black selection:bg-violet-700 selection:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
