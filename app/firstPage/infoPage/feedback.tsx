"use client";
import React, { useState } from "react";

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const inputStyle =
    "bg-transparent text-menu  border border-gray-500 rounded p-1";
  const rowStyle = "flex pt-1";
  const textStyle = "w-16";

  const sendFeadback = () => {
    if (type === "" || message === "") {
      setError("Please fill at least 'Feedback type' and 'Message' fields");
      return;
    }

    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        type: type,
        message: message,
      }),
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMessage("");
        setError("Thank you for your feedback!");
      });
  };

  return (
    <div className="text-xs2 text-menu">
      <div className={rowStyle}>
        <div className={textStyle}>Name:</div>
        <input
          type="text"
          className={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={rowStyle}>
        <div className={textStyle}>Email:</div>

        <input
          type="email"
          className={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={rowStyle}>
        <div className={textStyle}>Feedback Type:</div>
        <select
          className={inputStyle}
          defaultValue={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value=""></option>
          <option value="Program Bug">Program Bug</option>
          <option value="Ask Change">Ask Change</option>
          <option value="Ask New Idea">Ask New Idea</option>
        </select>
      </div>
      <div className={rowStyle}>
        <div className={textStyle}>Message:</div>
        <textarea
          className={inputStyle}
          rows={5}
          cols={40}
          value={message}
          maxLength={2048}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className={rowStyle}>
        <div className="flex-col m-auto">
          <button
            className="bg-green-900 text-menu px-2 py-2 rounded"
            onClick={() => sendFeadback()}
          >
            Submit
          </button>
          <div>{error && <div>{error}</div>}</div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
