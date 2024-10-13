import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Montserrat_Alternates } from "next/font/google";
import { Flow_Circular } from "next/font/google";
import "./globals.css";

const work_init = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});
const flow_init = Flow_Circular({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-flow-circular",
});
const ma_init = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ma",
});
// const ibmSerif = IBM_Plex_Serif({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   variable: "--font-ibm-serif",
// });

export const metadata: Metadata = {
  title: "Formik",
  description: "Get your form on",
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
        {children}
      </body>
    </html>
  );
}
