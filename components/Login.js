import React from "react";
import Button from "./Button";
import { Dancing_Script, Fugaz_One } from "next/font/google";

const danf = Dancing_Script({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  const isRegister = true;
  return (
    <div className="flex flex-col justify-center items-center  gap-4 flex-1">
      <h3 className={"text-4xl sm:text-5xl md:text-6xl " + danf.className}>
        {isRegister ? "Register" : "Log In"}
      </h3>
      <p className={"" + fugaz.className}>You&#39;re one step away!</p>
      <input
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-2 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="Email"
      />
      <input
        className="w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-2 border border-solid border-indigo-400 rounded-full outline-none"
        placeholder="Password"
        type="password"
      />
      <div className="max-w-[400px] w-full mx-auto ">
        <Button text={"Submit"} full />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account? " : "Don't have an account? "}
        <button className="text-indigo-600">
          {isRegister ? "Sign in" : "Sign up"}
        </button>
      </p>
    </div>
  );
}
