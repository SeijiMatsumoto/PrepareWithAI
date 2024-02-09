"use client"
import React, { useEffect, useState, FormEvent } from 'react'
import { pdfjs } from 'react-pdf';
import { FileUploader } from "react-drag-drop-files";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
type LocalStorageValue = string | null;

type Props = {
  input: string | null;
  setInput: (input: string) => void;
  title: string;
  placeholder: string;
}

const InputSection = ({ input, setInput, title, placeholder }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
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

      setInput(fullText);
    };

    reader.readAsArrayBuffer(pdfFile);
  };

  const fileTypes = ["PDF"];

  return (
    <div>
      <h2 className="text-lg font-bold">{title}</h2>
      {!loading && <div className="w-full flex mt-3 text-sm justify-center align-center rounded-lg text-center cursor-pointer transition duration-100 file-uploader">
        <FileUploader handleChange={handleFileChange} name="file" accept=".pdf" types={fileTypes} multiple={false} label={isMobile ? "Upload your resume here" : "Upload or drop your resume file here"} />
      </div>}
      <textarea
        className="mt-3 text-xs w-full h-40 p-4 border rounded-md resize-none mb-5"
        placeholder={placeholder}
        value={input || ""}
        onChange={(e: FormEvent<HTMLTextAreaElement>) => { e.preventDefault(); setInput((e.target as HTMLTextAreaElement).value) }}
      />
    </div>
  )
}

export default InputSection