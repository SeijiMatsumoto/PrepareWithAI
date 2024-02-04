import React, { useEffect, useState } from 'react'

type Props = {
  loading: boolean;
}

const NoOutput = ({ loading }: Props) => {
  return (
    <div className="h-full flex justify-center items-center weight-400 relative text-xl">
      <span>Fill in details about yourself and the job</span>
    </div>
  )
}

export default NoOutput