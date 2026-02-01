import type { Metadata } from "next";
import "./globals.css";
import MobileContainer from "@/components/layout/MobileContainer";

export const metadata: Metadata = {
  title: "Travel Diary",
  description: "Plan your trip and track expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MobileContainer>
          {children}
        </MobileContainer>
      </body>
    </html>
  );
}
