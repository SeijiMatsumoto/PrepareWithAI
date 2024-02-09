import React from 'react'
import { jsPDF } from 'jspdf';
import { GridLoader } from 'react-spinners';

type Props = {
  message: string;
  loading: boolean;
}

const Output = ({ message, loading }: Props) => {
  const handleExportPDF = () => {
    var pdf = new jsPDF("p", "mm", "a4");
    const el = document.querySelector("#preparation") as HTMLElement;

    pdf.html(el, {
      callback: function (doc) {
        // Save the PDF
        const date = new Date();
        doc.save(`prepareWithAI_${date.getTime()}.pdf`,);
      },
      x: 15,
      y: 15,
      width: 170,
      windowWidth: 650
    })
  };

  message = message.replaceAll("\n", "<br>");

  return (
    <div className="flex flex-col w-3/5 pl-10">
      <div className="flex justify-between w-full flex-row mb-2">
        <h2 className="text-2xl mb-5 font-bold">Interview Preparation Guide</h2>
        {message.length ? <button
          className="flex flex-row shadow-md rounded-md bg-slate-50 items-center justify-center text-center p-2 transition duration-200 hover:bg-slate-100 cursor-pointer active:bg-slate-200"
          onClick={handleExportPDF}
        >
          <span>Export as PDF</span>
        </button> : null}
      </div>
      {message.length ?
        <div className="overflow-scroll">
          <div id="preparation">
            <div dangerouslySetInnerHTML={{ __html: message }} />
          </div>
          {loading && <div className="flex flex-col items-center mt-5">
            <GridLoader color="rgb(31 41 55)" />
            <span>Generating with AI...</span>
          </div>}
        </div>
        :
        <div className="h-full flex justify-center items-center weight-400 relative text-xl">
          {loading ?
            <div className="flex flex-col items-center mt-5">
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