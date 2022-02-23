// General Imports
import React from "react";

// Global Values
var wordListId = 'words-list'

// wordFrequency in the form [{int: frequency, str: word}, ...]
const FrequencyList = ({wordFrequency = []}) => {
    return (
        <div className="word-list-container">
            <ul id={wordListId} className="word-list"></ul>
        </div>
    );
}

export default FrequencyList;