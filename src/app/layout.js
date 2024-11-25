import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";
// import { Toaster } from "@/components/ui/sonner"
import { Skeleton } from "@/components/ui/skeleton"
import InternetStatus from "../components/internetStatus/InternetStatus";
import { SkeletonCard } from "../components/skeltonCustom/skelton";
import { ComponentLoading } from "../components/loader/componentLoader";
import {GoogleOAuthProvider} from '@react-oauth/google';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "OOH",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider
         clientId="1053097186060-tgv7711n880on1vabhpmejvq8pv3mnrc.apps.googleusercontent.com"
         
         >
        <StoreProvider >
          <Suspense fallback={<ComponentLoading />}>
            <InternetStatus />
            {children}
          </Suspense>
        </StoreProvider>
        </GoogleOAuthProvider>
      
        <Toaster />
      </body>
    </html>
  );
}
