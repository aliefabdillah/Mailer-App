import React from "react";

export default function HistoryDetail() {
  return (
    <div className="flex flex-col border-b-2 p-2 h-screen">
      <div className="flex flex-row justify-between items-center my-4">
        <div>
          <p>
            To: <span className="truncate"><b>Email</b></span>
          </p>
          <p>
            from: <span className="truncate">Email</span>
          </p>
        </div>
        <p className="truncate">date</p>
      </div>
      <p className="mb-2">
        subject
      </p>
      <p>
        body
      </p>
    </div>
  );
}
