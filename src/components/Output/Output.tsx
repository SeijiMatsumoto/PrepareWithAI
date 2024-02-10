"use client";
import React, { useRef, useEffect } from 'react'
import { jsPDF } from 'jspdf';
import { FaStop } from "react-icons/fa6";
import DOMPurify from "dompurify";
import { formatDate } from '@/utils/date';
import Loading from './Loading';
import Analysis from './Analysis';

type Props = {
  message: string;
  loading: boolean;
  error?: Error;
  stop: any;
}

const Output = ({ message, loading, error, stop }: Props) => {
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
        doc.save(`prepareWithAI_${formatDate()}.pdf`,);
      },
      width: 170,
      windowWidth: 650,
      margin: 15
    })
  };

  message = message ? DOMPurify.sanitize(message.replaceAll("\n", "<br>")) : "";

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full bg-white shadow-2xl rounded-lg p-4 relative mb-5 h-2/3 md:p-10 md:pl-10 " data-testid="output-wrapper">
        <div className="flex justify-between w-full flex-row mb-2">
          <h2 className="text-2xl mb-5 font-bold">Preparation Guide by AI</h2>
          {message.length ? <button
            className="flex flex-row shadow-md rounded-md bg-slate-50 items-center justify-center text-center p-2 transition duration-200 hover:bg-slate-100 cursor-pointer active:bg-slate-200"
            onClick={handleExportPDF}
            data-testid="export-btn"
          >
            <span>Export as PDF</span>
          </button> : null}
        </div>
        {message.length ?
          <div className="md:overflow-scroll" ref={contentRef} data-testid="message-container">
            <div id="preparation">
              <div className="links mb-10" dangerouslySetInnerHTML={{ __html: message }} />
            </div>
            {loading && <Loading />}
            {loading &&
              <button
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 absolute bottom-0 right-0 m-5"
                onClick={stop}
                data-testid="stop-btn"
              >
                <FaStop />
              </button>}
          </div>
          :
          <div className="h-full flex justify-center items-center weight-400 relative text-xl">
            {loading ?
              <Loading /> :
              <span className="text-center p-10">Fill in details about yourself and the job</span>
            }
            {error &&
              <div className="flex flex-col items-center mt-5">Something went wrong. Try again in a few minutes.</div>}
          </div>
        }
      </div>
      <Analysis />
    </div>
  )
}

export default Output