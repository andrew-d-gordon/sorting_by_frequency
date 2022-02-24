// General Imports
import React from "react";
import './App.css';
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

// Component Imports
import Form from "./components/Form";

// Import brands
fontawesome.library.add(brands);

function App() {
  return (
    <div className="App">
      {/* Github Link */}
      <div className="github-ref">
        <a href="https://github.com/andrew-d-gordon/sorting_by_frequency">
          <i className="fab fa-github" style={{color:'black'}}></i>
        </a>
      </div>

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
