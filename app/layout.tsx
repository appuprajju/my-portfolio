import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prajwal M — Digital Solutions Engineer",
  description: "Premium freelance portfolio for web development, cybersecurity and mobile apps.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}