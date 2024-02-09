import React from 'react'

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white text-md md:text-xl font-bold md:ml-8">PrepareWithAI</h1>
        <h1 className="text-white text-xs md:text-md font-bold md:mr-8">
          <a href="https://github.com/SeijiMatsumoto" className="transition-all duration-200 cursor-pointer hover:text-slate-300">Made by Seiji Matsumoto</a>
        </h1>
      </div>
    </nav>
  )
}

export default Navigation