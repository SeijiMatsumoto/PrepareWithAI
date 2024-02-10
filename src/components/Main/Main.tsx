"use client"
import React, { FormEvent, useEffect, useState, useRef } from 'react'
import Details from '../Details/Details'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useCompletion } from "ai/react";
import Output from '../Output/Output';

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aboutMeInput, setAboutMeInput] = useLocalStorage('aboutMe', '');
  const [jdInput, setJdInput] = useLocalStorage('jobDesc', '');
  const [isResume, setIsResume] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const { complete: completePrep, completion: message, isLoading: isLoadingPrep, stop: stopPrep, error: errorPrep } = useCompletion({
    api: "/api/openai",
  });
  const { complete: completeAnalysis, completion: analysis, isLoading: isLoadingAnalysis, stop: stopAnalysis, error: errorAnalysis } = useCompletion({
    api: "/api/openai",
  });

  useEffect(() => {
    if (window.innerWidth > 768) setIsMobile(false)
  }, [isMobile])

  useEffect(() => {
    setInvalidInput(false);
  }, [jdInput, aboutMeInput]);

  useEffect(() => {
    if (isLoadingPrep && containerRef.current && isMobile) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [message, isLoadingPrep])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aboutMeInput?.length || !jdInput?.length) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      if (!isLoadingPrep) {
        completePrep(`This is my ${isResume ? 'resume' : 'brief description'}: ${aboutMeInput}
        and this is the job description: ${jdInput}
        Give me job preparation guide including information about the company in the job description, steps to take to prepare, questions that might get asked interview, questions to ask interviewer, resources. Bold each section heading with <b> tag and links in <a> tags.`);
        completeAnalysis(`Give me an analysis of how of a match the following resume is with the job description.
        resume:
        ${aboutMeInput}
        job description:
        ${jdInput}`)
      } else {
        stop();
      }
    }
  }

  return (
    <div ref={containerRef}
      data-testid="main-parent-component"
      className="flex flex-col w-full min-h-screen-fit pb-5 md:flex-row md:mb-0"
    // className="flex flex-col w-full shadow-2xl bg-white rounded-lg p-4 min-h-screen-fit overflow-scroll md:justify-between md:p-10 md:flex-row md:overflow-hidden"
    >
      <Details
        aboutMeInput={aboutMeInput}
        setAboutMeInput={setAboutMeInput}
        jdInput={jdInput}
        setJdInput={setJdInput}
        submitHandler={submitHandler}
        loading={isLoadingPrep}
        message={message}
        setIsResume={setIsResume}
        invalidInput={invalidInput}
      />
      <Output
        message={invalidInput ? "Error: missing input" : message}
        loading={isLoadingPrep}
        error={errorPrep}
        stop={stop}
      />
    </div>
  )
}

export default Main