import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "./App.css";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-oOAHz1WjUrRJF4neJW2NujTowZQaZBHZD4jVFCIiygaQ-0SvU1hVcN8nxVw6RMo/exec";

const Form: React.FC = () => {
  const [studentName, setStudentName] = useState("");
  const [jmbag, setJmbag] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sessionParam = searchParams.get("sessionId");
    if (sessionParam) {
      setSessionId(sessionParam);
    } else {
      alert("Invalid session. Please scan a valid QR code.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !jmbag) {
      alert("Please fill in all fields.");
      return;
    }

    if (!sessionId) {
      alert("No active session. Please scan a valid QR code.");
      return;
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          sessionId,
          studentName,
          jmbag,
        }).toString(),
      });

      const result = await response.json();

      if (result.status === "success") {
        alert(result.message);
        setStudentName("");
        setJmbag("");
        setSubmitted(true);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to log attendance. Try again.");
    }
  };

  return (
    <div className="container">
      <h1>Submit Attendance</h1>
      {submitted ? (
        <p>Thank you! Your attendance has been logged.</p>
      ) : sessionId ? (
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            placeholder="Your Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Your Student ID (JMBAG)"
            value={jmbag}
            onChange={(e) => setJmbag(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      ) : (
        <p>Invalid session. Please scan the QR code provided by your teacher.</p>
      )}
    </div>
  );
};

export default Form;