import React from "react";

export default function Navbar() {
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl text-white">Mailer App</a>
      </div>
      <div className="flex-none text-white">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/send-mail">Send Email</a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
