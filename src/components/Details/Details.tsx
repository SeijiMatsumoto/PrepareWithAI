import InputSection from './InputSection';

type Props = {
  aboutMeInput: string;
  setAboutMeInput: (input: string) => void;
  jdInput: string;
  setJdInput: (input: string) => void;
  clickHandler: () => void;
}

const Details = ({ aboutMeInput, setAboutMeInput, jdInput, setJdInput, clickHandler }: Props) => {

  return (
    <div className="flex w-2/5 border-r-2 flex-col pr-10">
      <h2 className="text-2xl mb-5">Details</h2>
      <div className="flex flex-col overflow-scroll mb-3">
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
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded text-center active:translate-y-0.5"
        onClick={clickHandler}>
        Generate
      </button>
    </div>
  )
}

export default Details