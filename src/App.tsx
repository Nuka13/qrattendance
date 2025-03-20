import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./App.css";

const App: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [randomPath, setRandomPath] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = "teacher123"; // Change this to your desired password

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const startSession = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newRandomPath = Math.random().toString(36).substring(2, 10); // Random string for the URL
    setSessionId(newSessionId);
    setRandomPath(newRandomPath);
    setSessionActive(true);
    alert("Session started! Display the QR code for students to scan.");
  };

  const endSession = () => {
    setSessionId(null);
    setRandomPath(null);
    setSessionActive(false);
    alert("Session ended! Students can no longer submit attendance.");
  };

  const formUrl = sessionId && randomPath ? `${window.location.origin}/attendance-submit-${randomPath}?sessionId=${sessionId}` : "";

  return (
    <div className="container">
      <h1>Attendance System</h1>
      {!isAuthenticated ? (
        <form onSubmit={handlePasswordSubmit} className="form-container">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      ) : !sessionActive ? (
        <button className="start-button" onClick={startSession}>
          Start Session
        </button>
      ) : (
        <>
          <p>Scan the QR code to submit attendance:</p>
          <div className="qr-code">
            <QRCode value={formUrl} size={256} />
          </div>
          <button className="end-button" onClick={endSession}>
            End Session
          </button>
        </>
      )}
    </div>
  );
};

export default App;

