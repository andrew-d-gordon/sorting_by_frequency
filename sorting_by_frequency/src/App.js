import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
      <input type="text" value={this.state.value} onChange={this.handleChange}/>
    </div>
  );
}

export default App;
