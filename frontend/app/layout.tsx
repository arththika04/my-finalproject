import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // ✅ ADD THIS
import "./globals.css";

import { Poppins, Sora } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* BODY FONT */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

/* HEADING FONT */
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Dietara Hub",
  description: "Smart Diet Platform",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${sora.variable}`}>
        <AuthProvider>
          <Navbar />

          {/* ===== PAGE CONTENT ===== */}
          {children}

          {/* ===== FOOTER ===== */}
          <Footer />

          {/* ===== TOAST ===== */}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </AuthProvider>
      </body>
    </html>
  );
}