import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DoH / DoT MobileConfig Generator",
  description: "Generate .mobileconfig files for DNS-over-HTTPS and DNS-over-TLS settings on Apple Devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
