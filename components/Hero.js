import React from "react";
import { Dancing_Script } from "next/font/google";
import Button from "./Button";
import Calendar from "./Calendar";
const danf = Dancing_Script({ subsets: ["latin"] });

export default function Hero() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <h1
        className={
          "text-5xl sm:text-6xl md:text-7xl text-center " + danf.className
        }
      >
        <span className="textGradient">DayTracker</span> helps you track your
        <span className="textGradient"> daily</span> Productivity!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">
        Create your productivity record and see how you do on
        <span className="font-semibold"> every day of every year.</span>
      </p>
      <div className="grid grid-cols-2 gap-2 w-fit mx-auto">
        <Button text="LOGIN"/>
        <Button text="SIGN UP" dark/>
      </div>
      <Calendar />
    </div>
  );
}
