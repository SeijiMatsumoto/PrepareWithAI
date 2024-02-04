"use client";
import React, { useState } from 'react'
import JobDescription from './JobDescription';
import AboutMe from './AboutMe';

const Details = () => {
  const [aboutMeInput, setAboutMeInput] = useState<string>('');
  const [jdInput, setJdInput] = useState<string>('');

  const clickHandler = () => {
    if (!aboutMeInput.length || !jdInput.length) {
      window.alert("Fill out details about yourself and the job!")
    }
  }

  return (
    <div className="flex w-2/5 border-r-2 flex-col pr-10">
      <h2 className="text-xl">Details</h2>
      <AboutMe input={aboutMeInput} setInput={setAboutMeInput} />
      <JobDescription input={jdInput} setInput={setJdInput} />
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded text-center active:translate-y-0.5"
        onClick={clickHandler}
      >Generate</button>
    </div>
  )
}

export default Details