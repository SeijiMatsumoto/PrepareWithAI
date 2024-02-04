import React from 'react'
import { GridLoader } from 'react-spinners';

type Props = {
  output: Output | null;
  loading: boolean;
}

interface Output {
  intro?: string;
  prep?: string;
  questions?: string;
  links?: string;
}

const Output = ({ output, loading }: Props) => {

  const sanitize = (input: string): string => {
    return input.replace(/\n/g, '<br>');
  }

  return (
    <div className="flex flex-col w-3/5 pl-10 align-top">
      <h2 className="text-xl mb-5">Interview Preparation Guide</h2>
      {output ?
        <div>
          {output.intro &&
            <div className="mb-5">
              <h2 className="text-lg weight-400 underline uppercase">Introduction</h2>
              <div dangerouslySetInnerHTML={{ __html: sanitize(output.intro) }} />
            </div>
          }
          {output.prep &&
            <div className="mb-5">
              <h2 className="text-lg weight-400 underline uppercase">Preparation</h2>
              <div dangerouslySetInnerHTML={{ __html: sanitize(output.prep) }} />
            </div>
          }
          {output.questions &&
            <div className="mb-5">
              <h2 className="text-lg weight-400 underline uppercase">Questions</h2>
              <div dangerouslySetInnerHTML={{ __html: sanitize(output.questions) }} />
            </div>
          }
          {output.links &&
            <div>
              <h2 className="text-lg weight-400 underline uppercase">Resources</h2>
              <div dangerouslySetInnerHTML={{ __html: output.links }} />
            </div>
          }
        </div>
        : <div className="h-full flex justify-center items-center weight-400 relative text-xl top-[-100px]">
          {loading ?
            <div className="flex flex-col items-center">
              <GridLoader color="#36d7b7" />
              <span>Generating prep material with AI...</span>
            </div>
            : <span>Fill in details about yourself and the job</span>}
        </div>
      }
    </div>
  )
}

export default Output