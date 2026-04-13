import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "block",
});

export const metadata: Metadata = {
  title: "Mark Zhdan",
  description: "Software engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bebasNeue.variable}>
      <body>
        <AdminAuthProvider>
          <div className="page-wrapper">{children}</div>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
