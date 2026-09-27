"use client"
import { useEffect, useState, type ReactNode } from "react";
import { Poppins, Josefin_Sans } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "./utils/theme-provider";
import { Providers } from "./Provider";
import { Toaster } from "react-hot-toast";
import {SessionProvider} from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${josefinSans.variable} h-full bg-white bg-no-repeat antialiased dark:bg-gradient-to-b dark:from-gray-900 dark:to-black`}
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <Custom>{children}</Custom>
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading } = useLoadUserQuery({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return null; // Render nothing on the server/first pass to avoid mismatch
  }

  return (
    <>
      {isLoading ? <Loader /> : <>{children}</>}
    </>
  );
};