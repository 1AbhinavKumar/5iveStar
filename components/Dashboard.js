import React from "react";
import { Fugaz_One,Dancing_Script } from "next/font/google";
import Calendar from "./Calendar";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const danf = Dancing_Script({ subsets: ["latin"] });
export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_rem: "13:14:25",
    date: new Date().toDateString(),
  };

  const moods = {
    'Idle': '😭',
    'Sluggish': '🥲',
    'Steady': '😶',
    'Efficient': '😊',
    'Optimal': '😍',
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-2 xs:grid-cols-3 bg-green-100 text-indigo-500 p-2">
        {Object.keys(statuses).map((key, index) => {
          return (
            <div key={index} className="p-2 sm:p-4">
              <p className="font-medium uppercase text-sm  truncate">
                {key.replaceAll("_", " ")}
              </p>
              <p className={"text-base sm:text-lg truncate " + fugaz.className}>{statuses[key]}</p>
            </div>
          );
        })}
      </div>
      <h4 className={'text-4xl sm:text-6xl md:text-7xl text-center ' + danf.className}>
        How was your <span className='textGradient'>day</span> today?
      </h4>
      <div className='flex items-stretch flex-wrap gap-4 '>
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button  className={'p-2 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 '} key={moodIndex}>
              <p className='text-lg sm:text-xl md:text-2xl'>{moods[mood]}</p>
              <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>{mood}</p>
            </button>
          )
        })}
      </div>
      <Calendar />
    </div>
  );
}
