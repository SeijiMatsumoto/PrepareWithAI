"use client"
import React, { FormEvent, useEffect, useState, useRef } from 'react'
import Details from '../Details/Details'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useCompletion } from "ai/react";
import Output from '../Output/Output';

const API_ROUTE = '/api/openai'

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aboutMeInput, setAboutMeInput] = useLocalStorage('aboutMe', '');
  const [jdInput, setJdInput] = useLocalStorage('jobDesc', '');
  const [isResume, setIsResume] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  const { complete: completePrep, completion: message, isLoading: isLoadingPrep, stop: stopPrep, error: errorPrep } = useCompletion({
    api: API_ROUTE,
  });
  const { complete: completeTopSkills, completion: topSkills, isLoading: isLoadingTopSkills } = useCompletion({
    api: API_ROUTE,
  });
  const { complete: completeAnalysis, completion: analysis, isLoading: isLoadingAnalysis } = useCompletion({
    api: API_ROUTE,
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
        getPrep();
        getTopSkills();
        getAnalysis();
      } else {
        stop();
      }
    }
  }

  const getPrep = () => {
    completePrep(`This is my ${isResume ? 'resume' : 'brief description'}: ${aboutMeInput}
        and this is the job description: ${jdInput}
        Give me job preparation guide including information about the company in the job description, steps to take to prepare, questions that might get asked interview, questions to ask interviewer, resources. Bold each section heading with <b> tag and links in <a> tags.`);
  }

  const getTopSkills = () => {
    completeTopSkills(`Give me a list of the top 5 skills that match both my resume and job description provided separated by commas. No additional description.
    resume:
    ${aboutMeInput}
    job description:
    ${jdInput}`)
  }

  const getAnalysis = () => {
    completeAnalysis(`Analyze my resume and job description and tell me how well I would do at this role. Summarize in 3 sentences. Last sentence should give me success rate in percentage.
    resume:
    ${aboutMeInput}
    job description:
    ${jdInput}`)
  }

  return (
    <div ref={containerRef}
      data-testid="main-parent-component"
      className="flex flex-col w-full min-h-screen-fit pb-5 md:flex-row md:mb-0"
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
        topSkills={invalidInput ? "" : topSkills}
        analysis={analysis}
        loading={isLoadingPrep}
        analysisLoading={isLoadingTopSkills && isLoadingAnalysis}
        error={errorPrep}
        stop={stopPrep}
      />
    </div>
  )
}

export default Main