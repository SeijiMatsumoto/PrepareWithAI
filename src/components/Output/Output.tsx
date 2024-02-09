"use client";
import React, { useRef, useEffect } from 'react'
import { jsPDF } from 'jspdf';
import { GridLoader } from 'react-spinners';

type Props = {
  message: string;
  loading: boolean;
  error?: Error;
}

const Output = ({ message, loading, error }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [message, loading])

  const handleExportPDF = () => {
    var pdf = new jsPDF("p", "mm", "a4");
    const el = document.querySelector("#preparation") as HTMLElement;

    pdf.html(el, {
      callback: function (doc) {
        const date = new Date();
        doc.save(`prepareWithAI_${formatDate(date)}.pdf`,);
      },
      width: 170,
      windowWidth: 650,
      margin: 15
    })
  };

  const formatDate = (currentDate: Date) => {
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + '-' + year;
    return formattedDate;
  }

  message = message ? message.replaceAll("\n", "<br>") : "";

  return (
    <div className="flex flex-col w-full md:w-3/5 md:pl-10">
      <div className="flex justify-between w-full flex-row mb-2">
        <h2 className="text-2xl mb-5 font-bold">Preparation Guide by AI</h2>
        {message.length ? <button
          className="flex flex-row shadow-md rounded-md bg-slate-50 items-center justify-center text-center p-2 transition duration-200 hover:bg-slate-100 cursor-pointer active:bg-slate-200"
          onClick={handleExportPDF}
        >
          <span>Export as PDF</span>
        </button> : null}
      </div>
      {message.length ?
        <div className="overflow-scroll" ref={contentRef} >
          <div id="preparation">
            <div className="links" dangerouslySetInnerHTML={{ __html: message }} />
          </div>
          {loading && <div className="flex flex-col items-center mt-5">
            <GridLoader color="rgb(31 41 55)" size={10} />
            <span>Generating with AI...</span>
          </div>}
        </div>
        :
        <div className="h-full flex justify-center items-center weight-400 relative text-xl">
          {loading ?
            <div className="flex flex-col items-center mt-5">
              <GridLoader color="rgb(31 41 55)" size={10} />
              <span>Generating with AI...</span>
            </div> :
            <span className="text-center p-10">Fill in details about yourself and the job</span>
          }
          {error &&
            <div className="flex flex-col items-center mt-5">Something went wrong. Try again in a few minutes.</div>}
        </div>
      }
    </div>
  )
}

export default Output