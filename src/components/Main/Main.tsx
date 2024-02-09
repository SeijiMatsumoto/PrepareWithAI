"use client"
import React, { FormEvent } from 'react'
import Details from '../Details/Details'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useCompletion } from "ai/react";
import Output from '../Output/Output';

const Main = () => {
  const { complete, completion: message, isLoading, stop, error } = useCompletion({
    api: "/api/openai/chat",
  });
  const [aboutMeInput, setAboutMeInput] = useLocalStorage('aboutMe', '');
  const [jdInput, setJdInput] = useLocalStorage('jobDesc', '');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aboutMeInput?.length || !jdInput?.length) {
      console.log("Fill out details about yourself and the job!")
    } else {
      if (!isLoading) {
        complete(`This is my resume: ${aboutMeInput}
        and this is the job description: ${jdInput}
        Give me job preparation guide including information about the company, steps to take to prepare, questions that might get asked interview, questions to ask interviewer, resources. Bold each section heading with <b> tag and links in <a> tags.`)
      } else {
        stop();
      }
    }
  }

  return (
    <div
      className="flex flex-col w-full shadow-2xl bg-white rounded-lg p-4 min-h-screen-fit overflow-scroll md:justify-between md:p-10 md:flex-row md:overflow-hidden">
      <Details
        aboutMeInput={aboutMeInput}
        setAboutMeInput={setAboutMeInput}
        jdInput={jdInput}
        setJdInput={setJdInput}
        submitHandler={submitHandler}
        loading={isLoading}
        message={message}
      />
      <Output message={message} loading={isLoading} error={error} />
    </div>
  )
}

export default Main