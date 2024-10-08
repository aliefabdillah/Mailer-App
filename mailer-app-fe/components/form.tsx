"use client";
import { sendEmailAction } from "@/app/data/formEmailAction";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import ZodErrors from "./response/ZodErrors";
import ResponseError from "./response/ResponseError";
import ModalLoading from "./modalLoading";
import CustomFileSelector from "./customFileSelector";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [formEmailState, formEmailAction] = useFormState(sendEmailAction, {
    data: null,
  });
  const [multipleFile, setMultipleFile] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  const [sender, setSender] = useState("");
  const [destination, setDestination] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setIsLoading(false);
  }, [formEmailState]);

  useEffect(() => {
    if (!formEmailState.isLoading) {
      setIsLoading(false);
    }

    if (formEmailState.responseData) {
      setSender("");
      setDestination("");
      setSubject("");
      setBody("");
      setMultipleFile([]);
      setFileUrls([]);
    }

    if (formEmailState.isSuccess == true) {
      // Retrieve the existing data from LocalStorage
      const historyData = localStorage.getItem("history");

      // Parse the data, if it exists, or create an empty array
      const arrayHistory = historyData ? JSON.parse(historyData) : [];

      // Add new data to the array
      arrayHistory.push(formEmailState.responseData.id);

      // Save the updated array back to LocalStorage
      localStorage.setItem("history", JSON.stringify(arrayHistory));
    }
  }, [formEmailState]);

  useEffect(() => {
    // Cleanup URLs when the component unmounts or when files change
    return () => {
      fileUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [fileUrls]);

  const handleMultipleFileSelected = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);

      const updatedFiles = [...multipleFile, ..._files];

      // Generate temporary URLs for each file
      const urls = updatedFiles.map((file) => URL.createObjectURL(file));
      setMultipleFile(updatedFiles);
      setFileUrls(urls);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFiles = multipleFile.filter(
      (_file, index) => index !== indexToRemove
    );
    const updatedUrls = fileUrls.filter((_, index) => index !== indexToRemove);

    // Clean up the Object URL to avoid memory leaks
    URL.revokeObjectURL(fileUrls[indexToRemove]);

    setMultipleFile(updatedFiles); // Update files state
    setFileUrls(updatedUrls); // Update URLs state
  };

  return (
    <div className="px-16 mb-4">
      <ResponseError
        error={formEmailState.message}
        code={formEmailState.isSuccess ? "200" : "400"}
        classname={`mt-4 ${
          formEmailState.isSuccess ? "alert-success" : "alert-error"
        }`}
      />
      <form
        id="form-email"
        onSubmit={() => setIsLoading(true)}
        action={formEmailAction}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">From:</span>
          </div>
          <input
            type="text"
            id="sender"
            name="sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="john@example.com"
            className="input input-bordered w-full"
          />
          <ZodErrors error={formEmailState?.zodErrors?.sender} />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">To:</span>
          </div>
          <input
            type="text"
            id="destination"
            name="destination"
            value={destination}
            placeholder="deo@example.com"
            onChange={(e) => setDestination(e.target.value)}
            className="input input-bordered w-full"
          />
          <ZodErrors error={formEmailState?.zodErrors?.destination} />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Subject:</span>
          </div>
          <input
            type="text"
            id="subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email Subject"
            className="input input-bordered w-full"
          />
          <ZodErrors error={formEmailState?.zodErrors?.subject} />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Body:</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-36"
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Email Body"
          ></textarea>
          <ZodErrors error={formEmailState?.zodErrors?.body} />
        </label>

        <label className="form-control mb-2 w-full">
          <CustomFileSelector
            name="files"
            multiple
            accept="*/*"
            onChange={handleMultipleFileSelected}
          />
          <ZodErrors error={formEmailState?.zodErrors?.files} />
        </label>
        {multipleFile.map((file, index) => {
          return (
            <div
              key={index}
              className="flex flex-row space-x-4 text-left italic"
            >
              <div className="space-x-2 mb-2">
                <a
                  href={fileUrls[index]} // URL of the file
                  download={file.name} // Filename for the download
                  target="_blank" // Open in new tab
                  rel="noopener noreferrer" // Security measure
                  className="underline text-blue-700"
                >
                  {file.name}
                </a>
                <button
                  type="button"
                  className="btn btn-error btn-xs text-white"
                  onClick={() => handleRemoveFile(index)}
                >
                  remove
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-end mt-4">
          <button type="submit" className="btn btn-accent text-white">
            Send
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </form>
      <ModalLoading isOpen={isLoading} />
    </div>
  );
}
