import { NextRequest, NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const runtime = "edge";

export async function POST(req: NextRequest, res: NextResponse) {
  const { prompt } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAIError) {
      console.error(`OpenAI API Error: ${error.message}`);
      return NextResponse.json(
        {
          error: {
            message: "An error occurred during your OpenAI API request.",
          },
        },
        { status: 500 }
      );
    } else if (typeof error === "string") {
      console.error(`Unhandled Error: ${error}`);
    } else {
      console.error("Unhandled error", error);
    }
    return null;
  }
}

class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenAIError";
  }
}
