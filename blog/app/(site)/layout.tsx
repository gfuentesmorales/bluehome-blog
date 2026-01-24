import type { Metadata } from "next";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",

})

export const metadata: Metadata = {
  title: "Blue Home - Blog",
  description: "Descubre nuestros artículos destacados en Blue Home",
   icons: {
    icon: [
      { url: '/uploads/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/uploads/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${workSans.variable} ${workSans.variable} antialiased`}
      >
        <div className="min-h-screen">
          <Header /> 
          <main className="min-h-screen">
            {children}
          </main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
