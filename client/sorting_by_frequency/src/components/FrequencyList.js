// General Imports
import React from "react";

// Global Values
var wordListId = 'words-list'

// clearFunction serves as function to delete all current word list attributes
const FrequencyList = ({clearFunction, downloadFunction}) => {
    return (
        <div className="word-list-container">
            <div className="word-list-container-header">
                <p>Words Sorted by Frequency</p>
                <div className="word-list-button">
                    <button onClick={(e) => {clearFunction(e)}}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
                <div className="word-list-button">
                    <button onClick={(e) => {downloadFunction(e)}}>
                        <i className="fa fa-download"></i>
                    </button>
                </div>
            </div>
            
            <ul id={wordListId} className="word-list"></ul>
        </div>
    );
}

export default FrequencyList;