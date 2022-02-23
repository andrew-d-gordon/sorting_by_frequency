// General Imports
import React from "react";
import './App.css';

// Component Imports
import Form from "./components/Form";
import FrequencyList from "./components/FrequencyList";

// Will hold the current words and their frequencies
var wordList = {};

function App() {
  return (
    <div className="App">
      <header>
        <h1>Sorted By Frequency</h1>
      </header>
      {/* <input type="text" value={this.state.value} onChange={this.handleChange}/> */}
      {/* Input Form */}
      <Form title="Input"/> 
      <br></br>
      {/* List of sorted words by frequency */}
      <FrequencyList wordFrequency={wordList}/>
    </div>
  );
}

export default App;
