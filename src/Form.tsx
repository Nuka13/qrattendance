import React, { useState } from "react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-oOAHz1WjUrRJF4neJW2NujTowZQaZBHZD4jVFCIiygaQ-0SvU1hVcN8nxVw6RMo/exec"; 

const Form: React.FC = () => {
  const [studentName, setStudentName] = useState("");
  const [jmbag, setJmbag] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !jmbag) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Submit Attendance</h1>
      {submitted ? (
        <p>Thank you! Your attendance has been logged.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Your Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={{ padding: "8px", width: "200px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Your Student ID (JMBAG)"
              value={jmbag}
              onChange={(e) => setJmbag(e.target.value)}
              style={{ padding: "8px", width: "200px" }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
