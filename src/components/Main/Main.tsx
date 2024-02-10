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
  const { complete, completion: message, isLoading, stop, error } = useCompletion({
    api: "/api/openai/chat",
  });

  useEffect(() => {
    if (window.innerWidth > 768) setIsMobile(false)
  }, [])

  useEffect(() => {
    setInvalidInput(false);
  }, [jdInput, aboutMeInput]);

  useEffect(() => {
    if (isLoading && containerRef.current && isMobile) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [message, isLoading])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aboutMeInput?.length || !jdInput?.length) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      if (!isLoading) {
        const prompt = `This is my ${isResume ? 'resume' : 'brief description'}: ${aboutMeInput}
        and this is the job description: ${jdInput}
        Give me job preparation guide including information about the company in the job description, how well my ${isResume ? 'resume' : 'description'} matches with the job description, steps to take to prepare, questions that might get asked interview, questions to ask interviewer, resources. Bold each section heading with <b> tag and links in <a> tags.`
        complete(prompt);
      } else {
        stop();
      }
    }
  }

  return (
    <div ref={containerRef}
      data-testid="main-parent-component"
      className="flex flex-col w-full shadow-2xl bg-white rounded-lg p-4 min-h-screen-fit overflow-scroll md:justify-between md:p-10 md:flex-row md:overflow-hidden">
      <Details
        aboutMeInput={aboutMeInput}
        setAboutMeInput={setAboutMeInput}
        jdInput={jdInput}
        setJdInput={setJdInput}
        submitHandler={submitHandler}
        loading={isLoading}
        message={message}
        setIsResume={setIsResume}
        invalidInput={invalidInput}
      />
      <Output
        message={invalidInput ? "Error: missing input" : message}
        loading={isLoading}
        error={error}
        stop={stop}
      />
    </div>
  )
}

export default Main