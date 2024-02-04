"use client"
import React from 'react'
import JsPDF from 'jspdf';
import { GridLoader } from 'react-spinners';

type Props = {
  output: Output | null;
  loading: boolean;
}

interface Output {
  intro?: string | null;
  prep?: string | null;
  questions?: string | null;
  links?: string | null;
}

const Output = ({ output, loading }: Props) => {
  const sanitize = (input: string): string => {
    return input.replace(/\n/g, '<br>');
  }

  const Section = (title: string, content: string) => {
    if (!content.length) return null;
    return (
      <div className="mb-5">
        <h2 className="text-lg weight-400 underline uppercase">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: title === "Resources" ? content : sanitize(content) }} />
      </div>
    )
  }

  const exportPdf = () => {
    const report: any = new JsPDF('portrait', 'pt', 'a4');
    report.html(document.querySelector('#preparation')).then(() => {
      report.save('prepareWithAiMaterial.pdf');
    }).catch((err: Error) => console.error(err))
  }

  console.log(output);

  return (
    <div className="flex flex-col w-3/5 pl-10">
      <div className="flex justify-between w-full flex-row mb-2">
        <h2 className="text-2xl mb-5">Interview Preparation Guide</h2>
        {output !== null ? <button
          className="flex flex-row shadow-md rounded-md bg-slate-50 items-center justify-center text-center p-2 transition duration-200 hover:bg-slate-100 cursor-pointer active:bg-slate-200"
          onClick={exportPdf}
        >
          <span>Export as PDF</span>
        </button> : null}
      </div>
      {output?.intro || output?.prep || output?.questions || output?.links ?
        <div className="overflow-scroll">
          <div id="#preparation">
            {output.intro && Section("Introduction", output.intro)}
            {output.prep && Section("Preparation", output.prep)}
            {output.questions && Section("Questions", output.questions)}
            {output.links && Section("Resources", output.links)}
          </div>
          {loading && <div className="flex flex-col items-center">
            <GridLoader color="rgb(31 41 55)" />
            <span>Generating with AI...</span>
          </div>}
        </div>
        :
        <div className="h-full flex justify-center items-center weight-400 relative text-xl">
          {loading ?
            <div className="flex flex-col items-center">
              <GridLoader color="rgb(31 41 55)" />
              <span>Generating with AI...</span>
            </div> :
            <span>Fill in details about yourself and the job</span>
          }
        </div>
      }
    </div>
  )
}

export default Output