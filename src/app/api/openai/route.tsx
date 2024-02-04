import { NextRequest, NextResponse } from "next/server";

const OpenAI = require("openai");
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

interface Output {
  intro?: string;
  prep?: string;
  questions?: string;
  links?: string;
}

export async function POST(req: NextRequest, res: any) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    }, { status: 500 });
    return;
  }

  const body = await req.json();
  const me: string = body.me || "";
  const jd: string = body.jd || "";

  try {
    const output: Output = {};
    const content = "You are helping me prepare for a job interview. Don't give me any response except the information I am looking for. I need the response in HTML format so I can dangerously set inner html. Any newline \n should be <br>.";

    const intro = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: content,
        },
        {
          role: "user",
          content:
            `Give me an introduction that I can say for a job interview in one paragraph. Write in a way that is natural for verbally saying it to an interviewer in person. Make the introduction relevant to the job description and keep it short - about 2-4 sentences.
            Here's some information about me: ${me}.
            Here is the job description: ${jd}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    if (intro) output["intro"] = intro.choices[0].message.content

    const prepMaterial = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: content,
        },
        {
          role: "user",
          content:
            `What do I need to do to prepare for this interview? Don't tell me the job description again.
            Here is the job description: ${jd}`,
        },
      ],
      model: "gpt-3.5-turbo"
    })
    if (prepMaterial) output["prep"] = prepMaterial.choices[0].message.content;

    const questions = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: content,
        },
        {
          role: "user",
          content:
            `Give me 30 interview questions that might be asked for the following job description: ${jd}`,
        },
      ],
      model: "gpt-3.5-turbo"
    })
    if (questions) output["questions"] = questions.choices[0].message.content;

    const links = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: content,
        },
        {
          role: "user",
          content:
            `Give me links for resources that can help me prepare for this job, such as documentation on technical stuff, advice for interviews, and other interview prep links. Also need links that are directly related to the skills required listed on the job description. I need them in an unordered list with bullets and <a> tags
            Here is the job description: ${jd}`,
        },
      ],
      model: "gpt-3.5-turbo"
    })
    if (links) output["links"] = links.choices[0].message.content;

    return NextResponse.json({ result: output }, { status: 200 });
  } catch (error) {
    if (error instanceof OpenAIError) {
      console.error(`OpenAI API Error: ${error.message}`);
      return NextResponse.json({
        error: { message: "An error occurred during your OpenAI API request." }
      }, { status: 500 })
    } else if (typeof error === "string") {
      console.error(`Unhandled Error: ${error}`);
    } else {
      console.error("Unhandled error", error);
    }
    return NextResponse.json({
      error: { message: "An unexpected error occurred." }
    }, { status: 500 })
  }
}

class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenAIError";
  }
}
