import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perceel Werkplanning & Materieelbeheer",
  description: "Handmatige planning en conflictvalidatie voor Perceel."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
