import { NextRequest, NextResponse } from "next/server";

const OpenAI = require("openai");
const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest, res: any) {
  const body = await req.json();
  const me: string = body.me || "";
  const jd: string = body.jd || "";

  const content = "You are helping me prepare for a job interview.";

  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content,
        },
        {
          role: "user",
          content: `
            Here is my resume: ${me}
            Here is the job description: ${jd}
            Give me job preparation guide including steps to take, questions on interview, resources. Give me response in HTML format. Don't add a title but add a heading to each section. Do not change text color.
          `,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    return NextResponse.json({ result: response.choices[0].message.content }, { status: 200 });
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
