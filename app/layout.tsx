import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/Context/AuthContext";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eksplode",
  description: "Created with eksplode",
  generator: "eksplode.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans  `}>
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
