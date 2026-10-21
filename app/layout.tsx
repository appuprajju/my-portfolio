import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "YOUR.STUDIO—Your Digital Partner",
  description: "Premium freelance portfolio for web development, cybersecurity and mobile apps.",
  icons: {
    icon: [
      { url: "/images/YOUR.STUDIO.png", type: "image/png" },
    ],
    shortcut: "/images/YOUR.STUDIO.png",
    apple: "/images/YOUR.STUDIO.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}