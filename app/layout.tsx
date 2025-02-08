import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Montserrat_Alternates } from "next/font/google";
import { Flow_Circular } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const work_init = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "block",
});
const flow_init = Flow_Circular({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-flow-circular",
  display: "block",
});
const ma_init = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ma",
  display: "block",
});

export const metadata: Metadata = {
  title: "Formik",
  description: "Get your form on",
  keywords: [
    "Sparsh Singh",
    "bigSparsh",
    "bigsparsh",
    "Sparsh",
    "big sparsh",
    "Big Sparsh",
    "sparsh project",
    "sparsh github",
    "formik",
    "formik bigsparsh",
    "form creator",
    "create form",
    "google form",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          work_init.variable + " " + ma_init.variable + " " + flow_init.variable
        }
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
