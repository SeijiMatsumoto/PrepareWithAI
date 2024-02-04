import React from 'react'

type Props = {
  output: string;
}

const Output = ({ output }: Props) => {
  return (
    <div className="flex flex-col w-3/5 pl-10 align-top">
      <h2 className="text-xl">Preparation Guide</h2>
      {output.length ?
        <div dangerouslySetInnerHTML={{ __html: output }} />
        : <div>
          Add details about yourself and the job first.
        </div>
      }
    </div>
  )
}

export default Output