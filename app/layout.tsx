import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatBox } from "find-x-ai";

export const metadata: Metadata = {
  title: "RedShield",
  description: "Redis based authentication library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#ffffff] dark:bg-black selection:bg-violet-700 selection:text-white font-[sans-serif]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Navbar />
          {children}

          <Toaster position="bottom-right" />
          <ChatBox
            config={{
              findx_key: process.env.NEXT_PUBLIC_FINDX_KEY!,
              theme: "dark",
              default: true,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
