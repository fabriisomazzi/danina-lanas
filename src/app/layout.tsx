import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://danina.netlify.app"),
  title: {
    default: "Danina | Lanas, Medias y Ropa en Sunchales",
    template: "%s | Danina",
  },
  description: "Lanas, medias, ropa y accesorios en Sunchales, Santa Fe. Encontrá todo lo que necesitás en Danina. Calidad y variedad al mejor precio.",
  keywords: ["lanas", "medias", "ropa", "accesorios", "tejer", "sunchales", "santa fe", "tienda de lanas", "madejas", "sweaters", "bufandas", "gorros"],
  authors: [{ name: "Danina" }],
  creator: "Danina",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://danina.netlify.app",
    siteName: "Danina",
    title: "Danina | Lanas, Medias y Ropa en Sunchales",
    description: "Lanas, medias, ropa y accesorios en Sunchales, Santa Fe. Encontrá todo lo que necesitás en Danina.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Danina - Lanas, Medias y Ropa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Danina | Lanas, Medias y Ropa en Sunchales",
    description: "Lanas, medias, ropa y accesorios en Sunchales, Santa Fe.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://danina.netlify.app",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${dmSerif.variable} antialiased`}
    >
      <body className="min-h-screen bg-cream text-text">{children}</body>
    </html>
  );
}
