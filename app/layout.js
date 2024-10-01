
import "./globals.css";
import { Dancing_Script, Fugaz_One, Open_Sans, Pacifico } from "next/font/google";
import Link from "next/link";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });
const danf = Dancing_Script({subsets:["latin"]})
const pf = Pacifico({subsets:["latin"],weight: ['400']})

export const metadata = {
  title: "DaysTracker",
  description: "Track your daily mood everyday of the year.",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={'/'}>
        <h1 className={'text-base sm:text-lg textGradient ' + pf.className}>DaysTracker</h1>
      </Link>
    <div className= "flex justify-between items-center">
      Placeholder||CTA
    </div>
    </header>
  )

  const footer = (
    <footer className="p-4 sm:p-6 grid place-items-center">
      <Link href={'https://github.com/1AbhinavKumar/'} target="_blank" className="">
        <p className={'textGradient duration-200 hover:text-blue-900 shadow-sm font-extrabold text-xl '+danf.className}>created by Abhinav </p>
      </Link>
    </footer>
  )

  return (
    <html lang="en">
      <body
        className={` w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${opensans.className}`}
      >
          {header}
          {children}
          {footer}
      </body>
    </html>
  );
}

// layout page describes the whole structures of all the children routes also or we describe the layout for the specific directory . 