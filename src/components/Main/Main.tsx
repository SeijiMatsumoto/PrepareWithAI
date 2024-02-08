"use client"
import React, { FormEvent, useState } from 'react'
import Details from '../Details/Details'
import Output from '../Output/Output'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useQuery } from '@tanstack/react-query'

const Main = () => {
  const [aboutMeInput, setAboutMeInput] = useLocalStorage('aboutMe', '');
  const [jdInput, setJdInput] = useLocalStorage('jobDesc', '');
  const [message, setMessage] = useState<string>('');

  const { refetch, error, isFetching } = useQuery({ queryKey: ['aiData'], queryFn: getData, enabled: false });

  if (error) console.log(error)

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!aboutMeInput?.length || !jdInput?.length) {
      window.alert("Fill out details about yourself and the job!")
    } else {
      setMessage("");
      refetch();
    }
  }

  async function getData() {
    if (!aboutMeInput?.length || !jdInput?.length) {
      return null;
    }
    const response = await fetch(`/api/openai/chat`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ me: aboutMeInput, jd: jdInput })
    });

    const json = await response.json();
    if (json.result) {
      setMessage(json.result.trim());
    }
    return true;
  }

  return (
    <div className="flex flex-row justify-between shadow-2xl bg-white rounded-lg p-10 w-full min-h-screen-fit">
      <Details
        aboutMeInput={aboutMeInput}
        setAboutMeInput={setAboutMeInput}
        jdInput={jdInput}
        setJdInput={setJdInput}
        submitHandler={submitHandler}
      />
      <Output message={message} loading={isFetching} />
    </div>
  )
}

export default Main