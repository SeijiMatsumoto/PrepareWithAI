"use client"
import React, { useEffect, useState } from 'react'
import { GridLoader } from 'react-spinners';

type Props = {
  loading: boolean;
}

const NoOutput = ({ loading }: Props) => {
  const [loadingText, setLoadingText] = useState<string>("Generating with AI...");

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoadingText("Just a few more seconds...")
      }, 15000)
    }
  }, [loading])

  return (
    <div className="h-full flex justify-center items-center weight-400 relative text-xl">
      {loading ?
        <div className="flex flex-col items-center">
          <GridLoader color="#36d7b7" />
          <span>{loadingText}</span>
        </div>
        : <span>Fill in details about yourself and the job</span>}
    </div>
  )
}

export default NoOutput