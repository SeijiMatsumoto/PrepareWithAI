"use client"
import React, { useEffect, useState, FormEvent } from 'react'
import { pdfjs } from 'react-pdf';
import { FileUploader } from "react-drag-drop-files";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Props = {
  input: string | null;
  setInput: (input: string) => void;
  title: string;
  placeholder: string;
  setIsResume?: (isResume: boolean) => void;
  invalidInput: boolean;
  testId: string;
}

const InputSection = ({
  input,
  setInput,
  title,
  placeholder,
  setIsResume,
  invalidInput,
  testId }: Props) => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    if (window.innerWidth > 768) setIsMobile(false)
  }, [])

  const handleFileChange = (file: any) => {
    const selectedFile = file;
    if (selectedFile) {
      parseTextFromPdf(selectedFile);
    }
  };

  const parseTextFromPdf = (pdfFile: any) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const arrayBuffer: any = reader.result;
      const pdfData = new Uint8Array(arrayBuffer);

      const loadingTask = pdfjs.getDocument(pdfData);
      const pdf = await loadingTask.promise;

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      if (setIsResume) setIsResume(true);
      setInput(fullText);
    };

    reader.readAsArrayBuffer(pdfFile);
  };

  const fileTypes = ["PDF"];

  return (
    <div data-testid="input-section-wrapper">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="w-full flex mt-3 text-sm justify-center align-center rounded-lg text-center cursor-pointer transition duration-100 file-uploader">
        <FileUploader handleChange={handleFileChange} name="file" accept=".pdf" types={fileTypes} multiple={false} label={`Upload ${isMobile ? "" : "or drop"} your file here`} />
      </div>
      <textarea
        className={`mt-3 text-xs w-full h-40 p-4 border rounded-md resize-none mb-5 ${invalidInput && !input?.length ? "border-red-600 border-2 border-solid" : ""}`}
        placeholder={placeholder}
        value={input || ""}
        onChange={(e: FormEvent<HTMLTextAreaElement>) => { e.preventDefault(); setInput((e.target as HTMLTextAreaElement).value) }}
        data-testid={testId}
      />
    </div>
  )
}

export default InputSection