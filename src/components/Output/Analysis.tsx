"use client"
import React, { useEffect, useState } from 'react'

type Props = {
  loading: boolean;
  topSkills: string;
  analysis: string;
}

const Analysis = ({ loading, topSkills, analysis }: Props) => {

  console.log(topSkills.length, loading);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (topSkills.length) {
      setSkills(topSkills.split(", "));
    }
  }, [topSkills])

  return (
    <div className="flex flex-col w-full bg-white shadow-2xl rounded-lg p-4 relative md:h-1/3 mb-5 md:mb-0 md:p-10 md:pl-10 " data-testid="analysis-wrapper">
      <h2 className="text-2xl mb-5 font-bold">Analysis</h2>
      {topSkills.length && !loading ?
        <div className="flex flex-col md:flex-row justify-between h-full w-full overflow-scroll">
          <div className="flex flex-col items-center md:mr-5 md:w-1/3">
            <h2 className="font-bold">Top Skills Match</h2>
            <div className="flex flex-row flex-wrap justify-center gap-y-1 md:gap-y-3">
              {skills.map((skill: string) => (
                <div className="p-1 rounded-full shadow-sm mr-1 md:mr-3 bg-slate-400 text-white">{skill}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center md:w-2/3">
            <h2 className="font-bold">Compatibility</h2>
            <span className="text-md">{analysis}</span>
          </div>
        </div> :
        <div className="flex justify-center items-center h-full w-full">
          Fill in details about yourself and the job
        </div>}
    </div>
  )
}

export default Analysis