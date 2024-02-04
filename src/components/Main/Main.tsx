"use client"
import React, { useState } from 'react'
import Details from '../Details/Details'
import Output from '../Output/Output'
import NoOutput from '../Output/NoOutput'

type Props = {}

const Main = (props: Props) => {
  const [output, setOutput] = useState<string>("");

  return (
    <div className="flex flex-row justify-between shadow-sm bg-white rounded-lg p-10 w-full h-full">
      <Details />
      <Output output={output} />
    </div>
  )
}

export default Main