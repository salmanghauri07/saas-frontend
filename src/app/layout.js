import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import AccessTokenProvider from "./AccessTokenProvided";
const poppins = Poppins({
  subsets: ["latin"], // character set
  weight: ["400", "500", "600", "700"], // choose weights you need
  variable: "--font-poppins", // optional: use CSS variable
});

export const metadata = {
  title: "Teamflow",
  description: "A simple project management tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AccessTokenProvider>{children}</AccessTokenProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
