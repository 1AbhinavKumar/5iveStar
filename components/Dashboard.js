"use client"

import React, { useEffect, useState } from "react";
import { Fugaz_One,Dancing_Script } from "next/font/google";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import Login from "./Login";
import Loading from "./Loading";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });
const danf = Dancing_Script({ subsets: ["latin"] });

export default function Dashboard() {
  const {currentUser, userDataObj, setUserDataObj,loading} = useAuth()
  const [data,setData] = useState({})
  const now = new Date()


  function countValues(){
      let total_number_of_days = 0 
      let sum_moods = 0 
      for (let year in data){
        for (let month in data[year]){
          for (let day in data[year][month]){
            total_number_of_days++
            sum_moods += data[year][month][day]

          }
        } 
      }
      return { active_days: total_number_of_days, average_mood: (sum_moods / total_number_of_days).toFixed(2)}
  }

  async function handleSetMood(mood) {
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try {
      const newData = { ...userDataObj }
      if (!newData?.[year]) {
        newData[year] = {}
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }

      newData[year][month][day] = mood
      // update the current state
      setData(newData)
      // update the global state
      setUserDataObj(newData)
      // update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, { merge: true })
    } catch (err) {
      console.log('Failed to set data: ', err.message)
    }
  }


  const statuses = {
    ...countValues(),
    time_rem: `${23-now.getHours()}H ${60-now.getMinutes()}M`,
    date: now.toDateString(),
  };

  const moods = {
    'Idle': '😭',
    'Sluggish': '🥲',
    'Steady': '😌',
    'Efficient': '😊',
    'Optimal': '😍',
  }

  useEffect(()=>{
    if (!currentUser || !userDataObj){
      return 
    }
    setData (userDataObj)
  },[currentUser , userDataObj])


  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16">
      <div className="grid grid-cols-2 xs:grid-cols-4 bg-green-100 text-indigo-500 p-2">
        {Object.keys(statuses).map((key, index) => {
          return (
            <div key={index} className="p-2 sm:p-4">
              <p className="font-medium capitalize text-sm  truncate">
                {key.replaceAll("_", " ")}
              </p>
              <p className={"text-base sm:text-lg truncate " + fugaz.className}>{statuses[key]}{key === 'active_days' ? ' 🔥' : ''}</p>
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
            <button onClick={()=>{
              const currentMoodValue = moodIndex + 1 
              handleSetMood(currentMoodValue)
            }} className={'p-2 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 '} key={moodIndex}>
              <p className='text-lg sm:text-xl md:text-2xl'>{moods[mood]}</p>
              <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + fugaz.className}>{mood}</p>
            </button>
          )
        })}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood}/>
    </div>
  );
}
