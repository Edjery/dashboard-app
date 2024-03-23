import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProviders from "./provider/SessionProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome",
  description: "Dashboard App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviders>{children}</SessionProviders>
      </body>
    </html>
  );
}
