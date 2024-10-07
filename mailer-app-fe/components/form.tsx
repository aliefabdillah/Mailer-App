import React from "react";

export default function Form() {
  return (
    <div className="px-16 mb-4">
      <form>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">From:</span>
          </div>
          <input
            type="text"
            placeholder="john@example.com"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text-alt"></span>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">To:</span>
          </div>
          <input
            type="text"
            placeholder="deo@example.com"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text-alt"></span>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Subject:</span>
          </div>
          <input
            type="text"
            placeholder="Email Subject"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text-alt"></span>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Body:</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-36"
            placeholder="Email Body"
          ></textarea>
          <div className="label">
            <span className="label-text-alt"></span>
          </div>
        </label>
      </form>
      <div className="flex justify-end">
        <button className="btn btn-accent text-white">
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
    </div>
  );
}
