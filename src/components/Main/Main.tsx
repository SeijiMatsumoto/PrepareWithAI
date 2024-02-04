"use client"
import React, { useEffect, useState } from 'react'
import Details from '../Details/Details'
import Output from '../Output/Output'
import useLocalStorage from '@/hooks/useLocalStorage'

type OutputType = {
  intro?: string;
  prep?: string;
  questions?: string;
  links?: string;
}

const Main = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<OutputType | null>(null);
  const [aboutMeInput, setAboutMeInput] = useLocalStorage('aboutMe', '');
  const [jdInput, setJdInput] = useLocalStorage('jobDesc', '');

  useEffect(() => {
    const lsOutput = localStorage.getItem("output");
    if (lsOutput) {
      setOutput(JSON.parse(lsOutput));
    }
  }, [])

  const clickHandler = () => {
    if (!aboutMeInput?.length || !jdInput?.length) {
      window.alert("Fill out details about yourself and the job!")
    } else {
      setOutput(null);
      getData();
    }
  }

  const getData = async () => {
    setLoading(true);
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ me: aboutMeInput, jd: jdInput })
    })

    setLoading(false);
    const json = await response.json();
    const intro = json.result?.intro || null;
    const prep = json.result?.prep || null;
    const questions = json.result?.questions || null;
    const links = json.result?.links || null;

    setOutput({
      intro,
      prep,
      questions,
      links
    })
  }

  useEffect(() => {
    if (output) localStorage.setItem("output", JSON.stringify(output));
    else localStorage.removeItem("output");
  }, [output])

  return (
    <div className="flex flex-row justify-between shadow-2xl bg-white rounded-lg p-10 w-full min-h-screen-fit">
      <Details
        aboutMeInput={aboutMeInput}
        setAboutMeInput={setAboutMeInput}
        jdInput={jdInput}
        setJdInput={setJdInput}
        clickHandler={clickHandler}
      />
      <Output output={output} loading={loading} />
    </div>
  )
}

export default Main