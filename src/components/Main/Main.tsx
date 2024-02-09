"use client"
import React, { FormEvent } from 'react'
import Details from '../Details/Details'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useCompletion } from "ai/react";
import Output from '../Output/Output';

const Main = () => {
  const { complete, completion: message, isLoading, stop } = useCompletion({
    api: "/api/openai/chat",
  });
  const [aboutMeInput, setAboutMeInput] = useLocalStorage('aboutMe', '');
  const [jdInput, setJdInput] = useLocalStorage('jobDesc', '');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aboutMeInput?.length || !jdInput?.length) {
      window.alert("Fill out details about yourself and the job!")
    } else {
      if (!isLoading) {
        complete(`This is my resume: ${aboutMeInput}
        and this is the job description: ${jdInput}
        Give me job preparation guide including steps to take, questions on interview, resources. Bold each section heading with <b> tag and links in <a> tags.`)
      } else {
        stop();
      }
    }
  }

  return (
    <div className="flex flex-row justify-between shadow-2xl bg-white rounded-lg p-10 w-full min-h-screen-fit">
      <Details
        aboutMeInput={aboutMeInput}
        setAboutMeInput={setAboutMeInput}
        jdInput={jdInput}
        setJdInput={setJdInput}
        submitHandler={submitHandler}
        loading={isLoading}
        message={message}
      />
      <Output message={message} loading={isLoading} />
    </div>
  )
}

export default Main