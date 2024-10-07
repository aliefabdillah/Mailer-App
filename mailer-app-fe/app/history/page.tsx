import HistoryList from "@/components/history/historyList";
import Navbar from "@/components/navbar";
import React from "react";

export default function History() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col w-1/2 justify-items-center">
        <Navbar />
        <div className="text-center text-gray-700">
          <h1 className="text-2xl font-bold mt-6">
            History Email
          </h1>
          <p className="py-3 mb-4 text-left text-sm">This app can save history email here for up to 50 emails. The list is displayed based on the 
            date of the latest send. The history list is saved in the browser you are currently using.</p>
        </div>
        <HistoryList/>
      </div>
    </div>
  );
}
