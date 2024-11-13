import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


import Providers from './GlobalRedux/provider';

 
// Подключаем шрифты SF Pro Display
const sfProBold = localFont({
  src: "./fonts/SFProDisplayBold.otf", 
  variable: "--font-sf-pro-bold",
  weight: "700",
  style: "normal", 
});

const sfProMedium = localFont({
  src: "./fonts/SFProDisplayMedium.otf",
  variable: "--font-sf-pro-medium", 
  weight: "500",
  style: "normal",
});

const sfProRegular = localFont({
  src: "./fonts/SFProDisplayRegular.otf",
  variable: "--font-sf-pro-regular",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html lang="en">
      <body
        className={`${sfProBold.variable} ${sfProMedium.variable} ${sfProRegular.variable}`}
      >
    <Providers>
      {children} 
      </Providers>
      </body>
    </html>
  );
}
