// General Imports
import React from "react";
import { saveAs } from "file-saver";

// Component Imports
import FrequencyList from "./FrequencyList";

// Global values
var textInputId = 'input-words';
var wordListId = 'words-list'
var wordsList = []; // Holds current words evaluated for frequency
var wordsListDict = {};

// Server URL Constants
const processWordsRoute = '/api/processWords';

// Lock on input text when request is being processed
var requestProcessing = false

// Reset words list
function clearWordsList() {
    wordsList = [];
    wordsListDict = {};
    document.getElementById(wordListId).innerHTML = null;
}

// Returns frequency list element for a word and frequency
function generateFreqListElement(word, frequency) {
    // Return word frequency list item
    let listElem = document.createElement('li');
    listElem.innerHTML = `${word}: ${frequency}`;
    listElem.setAttribute('key', word);
    return listElem;
}

// Request to word processing server for new words list sorted by frequency
async function processWordsRequest(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
    return response.json(); // parses JSON to JS objects
}

// Fill frequency words list div with results of processWords
function fillFrequencyList(processWordsData) {
    wordsList = processWordsData.wordsList;
    wordsListDict = processWordsData.wordsListDict;
    
    // Generate new list item objects for words and frequencies
    var freqListItems = wordsList.map((entry) =>
        generateFreqListElement(entry[0], entry[1])
    );

    // Retrieve frequency list and refresh list items
    document.getElementById(wordListId).innerHTML = ''; // Clear current word list displayed
    for (let i in freqListItems) {
        // Add list items to words list in reverse order to achieve decreasing frequency
        document.getElementById(wordListId).appendChild(freqListItems[freqListItems.length-1-i]); 
    }

    // Mark previous request as finished
    requestProcessing = false;
}

// Validate input text and process words for frequency sort
function processWords(e) {
    // Exit if previous request has not yet finished
    if (requestProcessing) return;

     // Prevent submit functionality (as to not clear words present in input)
    e.preventDefault();

    // Store available words/text input, trim input and split by spaces
    let newWords = document.getElementById(textInputId).value.trim();

    // Strip punctuation from text, replace newlines with spaces, then split into words by spaces
    let noPunctuationNewWords = newWords.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    let newWordsListSplit = noPunctuationNewWords.replace(/\n/g, ' ').split(' '); 
    const newWordsList = newWordsListSplit.filter(element => { // Remove '' left by consecutive spaces
        return element !== '';
    });

    // If no new words available, stop processing
    if (newWordsList.length === 0) {
        return;
    }

    // Reset value in text area to nothing after parsing new words from input
    document.getElementById(textInputId).value = '';

    // Set lock on processWords while current request is processed
    requestProcessing = true;

    // Process new words with current wordsList and wordsListDict for new frequency sort
    processWordsRequest(processWordsRoute, // In place of serverURL when served from server
                        {newWords: newWordsList,
                        wordsList: wordsList, 
                        wordsListDict: wordsListDict})
    .then((data) => fillFrequencyList(data));
}

// Allows trigger of processing text with enter key in addition to sort button
function enterPressed(e) {
    if (requestProcessing) return;
    var code = e.keyCode || e.which;
    if(code === 13) { // 13 is the enter key code
        processWords(e);
    } 
}

// Sequences download of current words in wordsList
function downloadWordsList (e, filename='sortedByFrequencyOutput.txt') {
    // If no words in wordsList, alert and do not download
    if (wordsList.length === 0) {
        alert('No words have been sorted by frequency, nothing to download...');
        return;
    }

    // Prevent submit functionality (as to not clear words present in input)
    e.preventDefault();

    // Format wordsList entries and create a Blob for it
    let wordsListText = wordsList.reverse().join("\n");
    let blob = new Blob([wordsListText], {
        type: "text/plain;charset=utf-8"
    });

    // Save file with blob data that has filename
    saveAs(blob, filename);
}

const Form = ({title = ''}) => {
    return (
        <form>
            <p>{title}</p>
            {/* Text area for input and compute frequency sort button */}
            <textarea type='button' id={textInputId} cols="30" rows="10" onKeyPress={(e) => {enterPressed(e)}}></textarea>
            <div className="form-button">
                <button onClick={(e) => {processWords(e)}}>COMPUTE FREQUENCY SORT</button>
            </div>

            <br></br>
            {/* List of sorted words by frequency */}
            <FrequencyList clearFunction={clearWordsList} downloadFunction={downloadWordsList}/>
        </form>
    );
}

export default Form;