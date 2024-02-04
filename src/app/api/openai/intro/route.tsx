import { NextRequest, NextResponse } from "next/server";
const OpenAI = require("openai");
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest, res: any) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    }, { status: 500 });
  }

  const body = await req.json();
  const me: string = body.me || "";
  const jd: string = body.jd || "";

  try {
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
            `Give me an introduction that I can say for a job interview. Make the introduction relevant to the job description and keep it short - about 2-4 sentences.
            Here's some information about me: ${me}.
            Here is the job description: ${jd}`,
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
