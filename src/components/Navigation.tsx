import React from 'react'

type Props = {}

const Navigation = (props: Props) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container flex justify-between items-center">
        <div className="text-white text-xl font-bold ml-8">PrepareWithAI</div>
      </div>
    </nav>
  )
}

export default Navigation