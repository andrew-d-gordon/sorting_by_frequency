// General Imports
import React from "react";
import './App.css';

// Component Imports
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      {/* Site Header */}
      <header>
        <h1>Sorted By Frequency</h1>
      </header>

      {/* Input Form and Word List*/}
      <Form title="Input"/> 
    </div>
  );
}

export default App;
