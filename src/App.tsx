import React, { useState } from "react";
import QRCode from "qrcode.react";

const App: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const formUrl = `${window.location.origin}/form`; // Static URL for now

  const startSession = () => {
    setSessionActive(true);
    alert("Session started! Display the QR code for students to scan.");
  };

  const endSession = () => {
    setSessionActive(false);
    alert("Session ended! Students can no longer submit attendance.");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Attendance System</h1>
      {!sessionActive ? (
        <button
          onClick={startSession}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Start Session
        </button>
      ) : (
        <>
          <p>Scan the QR code to submit attendance:</p>
          <QRCode value={formUrl} size={256} />
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={endSession}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
              }}
            >
              End Session
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

