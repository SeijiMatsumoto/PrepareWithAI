"use client"
import React, { useEffect, useState } from 'react'
import Details from '../Details/Details'
import Output from '../Output/Output'
import useLocalStorage from '@/hooks/useLocalStorage'

const Main = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [aboutMeInput, setAboutMeInput] = useLocalStorage('aboutMe', '');
  const [jdInput, setJdInput] = useLocalStorage('jobDesc', '');

  const [intro, setIntro] = useLocalStorage('intro', null);
  const [prep, setPrep] = useLocalStorage('prep', null);
  const [questions, setQuestions] = useLocalStorage('questions', null);
  const [links, setLinks] = useLocalStorage('links', null);

  const clickHandler = () => {
    if (!aboutMeInput?.length || !jdInput?.length) {
      window.alert("Fill out details about yourself and the job!")
    } else {
      getData();
    }
  }

  const getIntro = async () => {
    const response = await fetch("/api/openai/intro", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ me: aboutMeInput, jd: jdInput })
    })

    const json = await response.json();
    console.log("Intro:", json)
    const data = json.result || null;
    if (data) setIntro(data)
    getPrep();
  }

  const getPrep = async () => {
    const response = await fetch("/api/openai/prep", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jd: jdInput })
    })

    const json = await response.json();
    console.log('Prep:', json);
    const data = json.result || null;
    if (data) setPrep(data);
    getQuestions();
  }

  const getQuestions = async () => {
    const response = await fetch("/api/openai/questions", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jd: jdInput })
    })

    const json = await response.json();
    console.log("Questions:", json)
    const data = json.result || null;
    if (data) setQuestions(data);
  }

  const getLinks = async () => {
    const response = await fetch("/api/openai/links", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jd: jdInput })
    })

    const json = await response.json();
    console.log('Links:', json);
    const data = json.result || null;
    if (data) setLinks(data);
    getLinks();
  }

  const getData = () => {
    setLoading(true);
    setIntro(null);
    setPrep(null);
    setQuestions(null);
    setLinks(null);

    getIntro();
  }

  useEffect(() => {
    if (intro && prep && questions && links) {
      setLoading(false)
    }
  }, [intro, prep, questions, links])

  return (
    <div className="flex flex-row justify-between shadow-2xl bg-white rounded-lg p-10 w-full min-h-screen-fit">
      <Details
        aboutMeInput={aboutMeInput}
        setAboutMeInput={setAboutMeInput}
        jdInput={jdInput}
        setJdInput={setJdInput}
        clickHandler={clickHandler}
      />
      <Output output={{
        intro: intro,
        prep: prep,
        questions: questions,
        links: links
      }} loading={loading} />
    </div>
  )
}

export default Main