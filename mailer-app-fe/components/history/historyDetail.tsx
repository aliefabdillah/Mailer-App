/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { mailService } from "@/app/data/index.service";
import { Email } from "@/types/Email";
import React, { useEffect, useState } from "react";
import ResponseError from "../response/ResponseError";
import Loading from "../loading";
import { formatDate } from "@/lib/dateFormatter";
import FilePreview from "../linkPreview";
import Link from "next/link";

export default function HistoryDetail({ emailId }: { emailId: string }) {
  const [emailData, setEmailData] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState({
    error: "",
    message: "",
    code: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const response = await mailService.getHistoryDetail(emailId);
    if (response.error) {
      setResponseError({
        error: response.error,
        message: response.message,
        code: response.statusCode,
      });
    } else {
      const responseEmail: any = response;
      const formattedResponseEmail: Email = {
        id: responseEmail.id,
        sender: responseEmail.sender,
        destination: responseEmail.destination,
        subject: responseEmail.subject,
        body: responseEmail.body,
        files: responseEmail.files.split(","),
        createdAt: responseEmail.createdAt,
      };
      setEmailData(formattedResponseEmail);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ResponseError
        error={responseError.error}
        code={responseError.code}
        classname="alert-error"
      />
      {isLoading ? (
        <div className="flex justify-center my-2">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col border-b-2 p-2 h-screen">
          <div className="flex flex-row justify-between items-center my-4">
            <div>
              <p>
                To:
                <span className="truncate">
                  <b>{emailData?.destination ? emailData.destination : "-"}</b>
                </span>
              </p>
              <p>
                from:{" "}
                <span className="truncate">
                  {emailData?.sender ? emailData.sender : "-"}
                </span>
              </p>
            </div>
            <p className="truncate">
              {formatDate(emailData?.createdAt ? emailData.createdAt : "")}
            </p>
          </div>
          <p className="mb-2">
            {emailData?.subject ? emailData.subject : "(No Subject)"}
          </p>
          <p>{emailData?.body ? emailData.body : "-"}</p>

          {/* Displaying file previews */}
          {emailData?.files && emailData.files.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Attachments:</h3>
              <div className="flex flex-row">
                {emailData.files.map((fileUrl: string, index: number) => (
                  <Link key={index} href={fileUrl}>
                    <FilePreview fileUrl={fileUrl} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
