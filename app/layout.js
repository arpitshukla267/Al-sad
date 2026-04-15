import { Instrument_Sans, Nunito_Sans } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "./components/HeaderWrapper";
import Footer from "./Footer";

const getInstrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const getNunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Al-Sad Building Material LLC",
  description: "Al-Sad Building Material LLC - Building Material Supplier in Dubai, UAE",
  icons: {
    icon: "/assets/logo-light.svg",
    apple: "/assets/logo-light.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${getInstrumentSans.variable} ${getNunitoSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="flex flex-col w-full min-h-screen overflow-x-clip"
          suppressHydrationWarning
        >
          <HeaderWrapper />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
