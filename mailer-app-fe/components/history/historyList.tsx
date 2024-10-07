import React from "react";

export default function HistoryList() {
  return (
    <div className="bg-base-100 hover:bg-gray-200">
      <a href='/history/1'>
        <div className="flex flex-row justify-between border-b-2 p-2">
          <p>
            To: <span className="truncate">Email</span>
          </p>
          <p className="w-2/4">
            subject - <span className="truncate">body</span>
          </p>
          <p className="truncate">date</p>
        </div>
      </a>
    </div>
  );
}
