import React from 'react'

type Props = {}

const Navigation = (props: Props) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">PrepareWithAI</div>
      </div>
    </nav>
  )
}

export default Navigation