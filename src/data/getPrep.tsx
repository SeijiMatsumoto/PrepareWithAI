const OpenAI = require("openai");

const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

interface Output {
  intro?: string;
  prep?: string;
  links?: string;
}

export default async function getPrep(req: any, res: any) {
  console.log("Initiate getPrep()");
  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const me: string = req.me || "";
  const jd: string = req.jd || "";

  try {
    const output: Output = {};
    const intro = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are helping me prepare for a job interview",
        },
        {
          role: "user",
          content:
            `Give me an introduction that I can say for a job interview in HTML format. Here's some information about me: ${me} and here is the job description: ${jd}`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(intro, intro.choices[0].message);
    output["intro"] = intro.choices[0].message.result.content;

    const prepMaterial = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are helping me prepare for a job interview",
        },
        {
          role: "user",
          content:
            `Give me interview prep material in HTML format. The job description is as follows. ${jd}`,
        },
      ]
    })

    console.log(prepMaterial, prepMaterial.choices[0].message);
    output["prep"] = prepMaterial.choices[0].message.result.content;

    const links = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are helping me prepare for a job interview",
        },
        {
          role: "user",
          content:
            `Give me links for resources that can help me prepare for this job, broken down by category: ${jd}`,
        },
      ]
    })

    console.log(links, links.choices[0].message);
    output["links"] = links.choices[0].message.result.content;

    res.status(200).json({ result: output });

  } catch (error) {
    if (error instanceof OpenAIError) {
      console.error(`OpenAI API Error: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your OpenAI API request.",
        },
      });
    } else if (typeof error === "string") {
      console.error(`Unhandled Error: ${error}`);
      res
        .status(500)
        .json({ error: { message: "An unexpected error occurred." } });
    } else {
      console.error("Unhandled error", error);
      res
        .status(500)
        .json({ error: { message: "An unexpected error occurred." } });
    }
  }
}

class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenAIError";
  }
}
