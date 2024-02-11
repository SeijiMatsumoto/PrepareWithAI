
# Prepare with AI

Preparing for a job interview could be stressful and overwhelming. Let Prepare with AI help you by giving you useful tips on how to prepare well for the interview and links to a variety of resources.

Taking the user's resume and a job description, OpenAI will generate preparation material to help prepare for the interview

[Try out Prepare with AI](https://prepare-with-ai.vercel.app)

## Features

- Drag and drop PDF files
- Responsive design
- AI generated content

#### AI Output
* Preparation material
    * Information about the company
    * Steps to take to prepare
    * Questions that might come up in the interview
    * Questions to ask the interviewer
    * Resources such as links

* Top skills
    * 5 skills that match is a match in both resume and job description

* Analysis
    * Based on user's resume and job description, brief analysis on how well user might do
## Tech Stack

**Client:** React, Next.js, TailwindCSS

**API:** OpenAI

**Testing:** React Testing Library, Jest, Cypress

**Hosting:** Vercel, Netlify

- https://prepare-with-ai.vercel.app
- https://prepare-with-ai.netlify.app
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OPENAI_API_KEY`

https://platform.openai.com/account/api-keys
## Lighthouse Audit
![lighthouse score](https://i.imgur.com/yAbYZht.png)
## Run Locally

Clone the project

```bash
  git clone git@github.com:SeijiMatsumoto/PrepareWithAI.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Running Tests

Unit tests with Jest and React Testing Library

```bash
  npm run test:watch
```

E2E tests with Cypress

```bash
  npm run cypress:open
```
