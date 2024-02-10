import React from 'react'
import { GridLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="flex flex-col items-center mt-5" data-testid="loading-indicator">
      <GridLoader color="rgb(31 41 55)" size={10} />
      <span>Generating with AI...</span>
    </div>
  )
}

export default Loading