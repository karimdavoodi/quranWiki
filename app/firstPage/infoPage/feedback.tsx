"use client";
import React, { useState } from "react";

const Feedback = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const inputStyle = "bg-transparent  border border-green-900 rounded p-1";
    const rowStyle = "flex pt-1";
    const textStyle = "w-40";

    const sendFeadback = () => {
        if (type === "" || message === "") {
            setError(
                "Please fill at least 'Feedback type' and 'Message' fields"
            );
            return;
        }
        console.log("TODO: sendFeadback", name, email, type, message);

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
        <div className="pl-5">
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
                <div className="flex-col">
                    <button
                        className="bg-green-900 text-white px-2 py-2 rounded"
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
