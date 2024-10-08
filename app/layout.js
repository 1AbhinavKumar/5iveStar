import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import {
  Dancing_Script,
  Fugaz_One,
  Open_Sans,
  Pacifico,
} from "next/font/google";
import Link from "next/link";
import Head from "./head";
import Logout from "@/components/Logout";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const danf = Dancing_Script({ subsets: ["latin"] });
const pf = Pacifico({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "DaysTracker",
  description: "Track your daily mood everyday of the year.",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1 className={"text-base sm:text-2xl textGradient p-1 " + pf.className}>
          DaysTracker
        </h1>
      </Link>
      <Logout/>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-6 grid place-items-center">
      <Link
        href={"https://github.com/1AbhinavKumar/"}
        target="_blank"
        className=""
      >
        <p
          className={
            "textGradient duration-200 hover:text-blue-900 shadow-sm font-extrabold text-xl " +
            danf.className
          }
        >
          created by Abhinav{" "}
        </p>
      </Link>
    </footer>
  );

  return (
    <html lang="en">
      <Head />
        <AuthProvider>
          <body
            className={` w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${opensans.className}`}
          >
            {header}
            {children}
            {footer}
          </body>
        </AuthProvider>
    </html>
  );
}

// layout page describes the whole structures of all the children routes also or we describe the layout for the specific directory .
