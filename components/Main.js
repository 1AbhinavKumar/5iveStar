import React from 'react'

export default function Main({children}) {
  return (
    <main className="flex-1 flex flex-col p-4 sm:p-8">
        {children}
    </main>
  )
}
