import React from 'react'

type Props = {
  input: string;
  setInput: (input: string) => void;
}

const AboutMe = ({ input, setInput }: Props) => {
  return (
    <div>
      <h2>About me</h2>
      <div className="flex mt-3 text-xs justify-center align-center rounded-lg p-8 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-zinc-50 text-center hover:shadow-lg cursor-pointer transition duration-100 active:translate-y-0.5">
        Add resume PDF
      </div>
      <textarea
        className="mt-3 text-xs w-full h-64 p-4 border rounded-md resize-none"
        placeholder="Enter a few sentences about your own work experience or attach your resume above"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  )
}

export default AboutMe