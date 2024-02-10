import { FormEvent } from 'react';
import InputSection from './InputSection';

type Props = {
  aboutMeInput: string | null;
  setAboutMeInput: (input: string) => void;
  jdInput: string | null;
  setJdInput: (input: string) => void;
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  message: string;
  setIsResume: (isResume: boolean) => void;
  invalidInput: boolean;
}

const Details = ({
  aboutMeInput,
  setAboutMeInput,
  jdInput,
  setJdInput,
  submitHandler,
  loading,
  message,
  invalidInput,
  setIsResume
}: Props) => {
  return (
    <form data-testid="main-form" className="flex w-full flex-col mb-5 pb-5 border-b-2 md:mb-0 md:w-2/5 md:border-r-2 md:border-b-0 md:pb-0" onSubmit={(e: FormEvent<HTMLFormElement>) => submitHandler(e)}>
      <h2 className="text-2xl mb-5 font-bold">Details</h2>
      <div className="flex flex-col md:overflow-scroll md:pr-10 mb-3" data-testid="input-wrapper">
        <InputSection
          input={aboutMeInput}
          setInput={setAboutMeInput}
          title="About Me"
          placeholder="Enter a few sentences about your own work experience or attach your resume as a PDF above"
          setIsResume={setIsResume}
          invalidInput={invalidInput}
          testId="textarea1"
        />
        <hr className="mb-3" />
        <InputSection
          input={jdInput}
          setInput={setJdInput}
          title="Job Description"
          placeholder="Enter job description here or import PDF above"
          invalidInput={invalidInput}
          testId="textarea2"
        />
      </div>
      <input
        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded text-center active:translate-y-0.1 md:mr-10 cursor-pointer"
        type="submit"
        value={message && message.length && loading ? "Generating" : "Generate"}
        disabled={loading}
        data-testid="submit-btn" />
    </form>
  )
}

export default Details