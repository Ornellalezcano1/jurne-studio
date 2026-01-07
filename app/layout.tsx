import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuración de metadatos de Next.js
export const metadata: Metadata = {
  title: "Jurne Studio",
  description: "Arquitectura Digital de Alto Rendimiento",
  icons: {
    icon: "/logo.svg", // Busca automáticamente en la carpeta public
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Jurne Studio",
    description: "Arquitectura Digital de Alto Rendimiento",
    images: ["/og-image.png"], // Imagen para compartir en redes
  },
  twitter: {
    card: "summary_large_image",
    title: "Jurne Studio",
    description: "Arquitectura Digital de Alto Rendimiento",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
