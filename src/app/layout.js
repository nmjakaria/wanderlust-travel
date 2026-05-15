import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";


const GeistFont = Geist({
  subsets: ["latin"],
});


export const metadata = {
  title: "Wanterlast-Travels",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${GeistFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <ToastProvider />
        <Toaster />
      </body>
    </html>
  );
}
