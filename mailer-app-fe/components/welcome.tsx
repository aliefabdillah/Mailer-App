import React from "react";

export default function Welcome() {
  return (
    <div className="py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-primary">MailerApp</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 px-24">
          The easiest way to create and send emails to your college. Perfect for
          businesses, creators, and everyone in between.
        </p>
        <a
          href="/send-mail"
          className="px-4 py-3 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Start Send Email
        </a>
      </div>
    </div>
  );
}
