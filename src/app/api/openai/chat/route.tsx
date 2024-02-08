import { NextRequest, NextResponse } from "next/server";

const OpenAI = require("openai");
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest, res: any) {
  const body = await req.json();
  const type: ('intro' | 'prep' | 'questions' | 'links') = body.type || null;
  const me: string = body.me || "";
  const jd: string = body.jd || "";

  const content = "You are helping me prepare for a job interview. Don't give me any response except the information I am looking for. I need the response in a <div> so I can dangerouslySetInnerHtml. Any newline \n should be <br>. Keep responses short so it wouldn't take more than 10 seconds per request.";

  const contentByType = {
    intro: `Give me an introduction that I can say for a job interview. Make the introduction relevant to the job description and keep it short - about 2-4 sentences.
    Here's some information about me: ${me}.
    Here is the job description: ${jd}`,
    prep: `What do I need to do to prepare for this interview? Don't tell me the job description again.
    Here is the job description: ${jd}`,
    questions: `Give me 10 interview questions that might be asked for the following job description: ${jd}`,
    links: `Give me links for resources that can help me prepare for this job. I need them in an unordered list with bullets and <a> tags
    Here is the job description: ${jd}`
  }

  if (!type) NextResponse.json({ error: { message: "No type indicated" } }, { status: 500 });

  try {
    const intro = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: content,
        },
        {
          role: "user",
          content: contentByType[type],
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json({ result: intro.choices[0].message.content }, { status: 200 });
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
