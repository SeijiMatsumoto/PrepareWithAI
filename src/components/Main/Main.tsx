"use client"
import React, { useEffect, useState } from 'react'
import Details from '../Details/Details'
import Output from '../Output/Output'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useQuery } from '@tanstack/react-query'

interface OutputType {
  intro?: string | null;
  prep?: string | null;
  questions?: string | null;
  links?: string | null;
}

type responseType = {
  result: string;
}

type type = ("intro" | "prep" | "questions" | "links")

const Main = () => {
  const [aboutMeInput, setAboutMeInput] = useLocalStorage('aboutMe', '');
  const [jdInput, setJdInput] = useLocalStorage('jobDesc', '');
  const [output, setOutput] = useState<OutputType | null>(null);

  const { refetch, isSuccess, error, isFetching } = useQuery({ queryKey: ['aiData'], queryFn: () => getData(["intro", "prep", "questions", "links"]), enabled: false });

  if (error) console.log(error)

  const clickHandler = () => {
    if (!aboutMeInput?.length || !jdInput?.length) {
      window.alert("Fill out details about yourself and the job!")
    } else {
      setOutput(null);
      refetch();
    }
  }

  const getData = async (types: type[]) => {
    if (!aboutMeInput?.length || !jdInput?.length) {
      return null;
    }
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      let json: responseType | null = null;
      while (!json) {
        json = await getResponse(type);
      }

      if (json.result) {
        setOutput((prevOutput) => {
          const outputCopy = JSON.parse(JSON.stringify(prevOutput || {}));
          outputCopy[type] = json?.result.trim();
          return outputCopy;
        })
      }
    }
    return true;
  }

  const getResponse = async (type: string) => {
    const response = await fetch(`/api/openai/${type}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ me: aboutMeInput, jd: jdInput, type: type })
    });

    return response.json();
  }

  return (
    <div className="flex flex-row justify-between shadow-2xl bg-white rounded-lg p-10 w-full min-h-screen-fit">
      <Details
        aboutMeInput={aboutMeInput}
        setAboutMeInput={setAboutMeInput}
        jdInput={jdInput}
        setJdInput={setJdInput}
        clickHandler={clickHandler}
      />
      <Output output={output} loading={isFetching} />
    </div>
  )
}

export default Main