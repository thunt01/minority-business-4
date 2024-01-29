import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((data) => setMessage(data.result));
  }, []);
  
  return (
    <div className="App">
      <h1>
        {JSON.stringify(message)}
      </h1>
    </div>
  );
}

export default App