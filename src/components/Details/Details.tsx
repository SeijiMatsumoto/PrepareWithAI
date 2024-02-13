"use client"
import { useEffect, useRef } from 'react'
import { FormEvent } from 'react';
import InputSection from './InputSection';
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";

type Props = {
  aboutMeInput: string | null;
  setAboutMeInput: (input: string) => void;
  jdInput: string | null;
  setJdInput: (input: string) => void;
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  message: string;
  setIsResume: (isResume: boolean) => void;
  invalidInput: boolean;
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  isMobile: boolean;
}

const Details = ({
  aboutMeInput,
  setAboutMeInput,
  jdInput,
  setJdInput,
  submitHandler,
  loading,
  message,
  invalidInput,
  setIsResume,
  collapse,
  setCollapse,
  isMobile
}: Props) => {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (collapse) {
        ref.current.style.height = "60px";
        ref.current.style.minHeight = "60px";
        ref.current.style.overflow = "hidden";
      } else {
        ref.current.style.height = "";
        ref.current.style.minHeight = "";
        ref.current.style.overflow = "";
      }
    }

  }, [collapse])

  const expand = () => {
    if (isMobile) setCollapse(!collapse);
  }

  return (
    <form
      ref={ref}
      onClick={expand}
      data-testid="main-form"
      className="flex w-full flex-col mb-5 pb-5 bg-white shadow-2xl rounded-lg p-4 md:p-10 md:mb-0 md:w-2/5 md:mr-5"
      onSubmit={(e: FormEvent<HTMLFormElement>) => submitHandler(e)}>
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl mb-5 font-bold">Details</h2>
        {collapse && isMobile && <FaCaretUp className="relative top-1.5 text-lg" />}
        {!collapse && isMobile && <FaCaretDown className="relative top-1.5 text-lg" />}
      </div>
      <div className="flex flex-col md:overflow-scroll mb-3 transition-all duration-300" data-testid="input-wrapper">
        <InputSection
          input={aboutMeInput}
          setInput={setAboutMeInput}
          title="About Me"
          placeholder="Enter a few sentences about your own work experience or attach your resume as a PDF above"
          setIsResume={setIsResume}
          invalidInput={invalidInput}
          testId="textarea1"
        />
        <hr className="mb-3" />
        <InputSection
          input={jdInput}
          setInput={setJdInput}
          title="Job Description"
          placeholder="Enter job description here or import PDF above"
          invalidInput={invalidInput}
          testId="textarea2"
        />
      </div>
      <input
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded text-center active:translate-y-0.1 cursor-pointer"
        type="submit"
        value={message && message.length && loading ? "Generating" : "Generate"}
        disabled={loading}
        data-testid="submit-btn" />
    </form>
  )
}

export default Details