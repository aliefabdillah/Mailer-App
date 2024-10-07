import HistoryDetail from "@/components/history/historyDetail";
import Navbar from "@/components/navbar";
import React from "react";

export default function DetailHistory({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params);
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col w-1/2 justify-items-center">
        <Navbar />
        <div className="text-center text-gray-700">
          <h1 className="text-2xl font-bold mt-6">
            History Email {params.slug}
          </h1>
        </div>
        {/* DETAIL */}
        <HistoryDetail />
      </div>
    </div>
  );
}
