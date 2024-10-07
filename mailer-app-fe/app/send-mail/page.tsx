import Form from "@/components/form";
import Navbar from "@/components/navbar";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col w-1/2 justify-items-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mt-6">
            Write Your Email!
          </h1>
          <Form />
        </div>
      </div>
    </div>
  );
}
