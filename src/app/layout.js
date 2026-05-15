import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@heroui/react";


const JosefinSans = Josefin_Sans({
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
      className={`${JosefinSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
