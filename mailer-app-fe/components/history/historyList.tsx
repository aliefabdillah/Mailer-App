/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { mailService } from "@/app/data/index.service";
import { Email } from "@/types/Email";
import React, { useEffect, useState } from "react";
import ResponseError from "../response/ResponseError";
import Loading from "../loading";
import { formatDate } from "@/lib/dateFormatter";

export default function HistoryList() {
  const [historyData, setHistoryData] = useState<Email[] | null>(null);
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
    const localHistory = localStorage.getItem("history");
    const arrayHistory = localHistory ? JSON.parse(localHistory) : [];
    // arrayHistory.push("6791f046-fdef-430b-af44-11c1b924a333");
    const response = await mailService.getHistoryList(arrayHistory);

    if (response.error) {
      setResponseError({
        error: response.error,
        message: response.message,
        code: response.statusCode,
      });
    } else {
      const responseData: any[] = response;
      const responseHistoryData: Email[] = responseData.map((emailData) => {
        return {
          id: emailData.id,
          sender: emailData.sender,
          destination: emailData.destination,
          subject: emailData.subject,
          body: emailData.body,
          createdAt: emailData.createdAt,
        };
      });
      setHistoryData(responseHistoryData);
    }
    setIsLoading(false);
  };

  console.log(historyData);
  return (
    <>
      {responseError.error ? (
        <ResponseError
          error={responseError.message}
          code={responseError.code}
          classname="alert-error"
        />
      ) : isLoading ? (
        <div className="flex justify-center my-2">
          <Loading />
        </div>
      ) : historyData?.length != 0 ? (
        historyData?.map((historyItem, index) => (
          <div key={index} className="bg-base-100 hover:bg-gray-200">
            <a href={`/history/${historyItem.id}`}>
              <div className="flex flex-row justify-between border-b-2 p-2">
                <p>
                  To:{" "}
                  <span className="truncate">{historyItem.destination}</span>
                </p>
                <p className="w-2/4">
                  {historyItem.subject ? historyItem.subject : "(No Subject)"} -{" "}
                  <span className="truncate">{historyItem.body}</span>
                </p>
                <p className="truncate">{formatDate(historyItem.createdAt)}</p>
              </div>
            </a>
          </div>
        ))
      ) : (
        <div>
          <p className="text-center text-xl text-gray-700">~ History Empty ~</p>
        </div>
      )}
    </>
  );
}
