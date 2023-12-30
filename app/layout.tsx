import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Lato } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "./nextAuth/provider";

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
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100/40 dark:bg-gray-800/20">
        <Provider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster richColors position="bottom-right" />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
