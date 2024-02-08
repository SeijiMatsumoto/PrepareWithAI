import InputSection from './InputSection';

type Props = {
  aboutMeInput: string | null;
  setAboutMeInput: (input: string) => void;
  jdInput: string | null;
  setJdInput: (input: string) => void;
  submitHandler: () => void;
}

const Details = ({ aboutMeInput, setAboutMeInput, jdInput, setJdInput, submitHandler }: Props) => {

  return (
    <div className="flex w-2/5 border-r-2 flex-col">
      <h2 className="text-2xl mb-5">Details</h2>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col overflow-scroll pr-10 mb-3">
          <InputSection
            input={aboutMeInput}
            setInput={setAboutMeInput}
            title="About Me"
            buttonText="Add resume PDF"
            placeholder="Enter a few sentences about your own work experience or attach your resume above" />
          <hr className="mb-3"></hr>
          <InputSection
            input={jdInput}
            setInput={setJdInput}
            title="Job Description"
            buttonText="Add job description PDF"
            placeholder="Paste in job description here or import PDF above" />
        </div>
        <input
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded text-center active:translate-y-0.1 mr-10"
          type="submit">
          Generate
        </input>
      </form>
    </div>
  )
}

export default Details