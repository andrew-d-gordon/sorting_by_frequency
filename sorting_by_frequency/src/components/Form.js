// General Imports
import React from "react";
import d3 from "d3";

// Global values
var textInputId = 'input-words';
var wordListId = 'words-list'
var wordsList = []; // Holds current words evaluated for frequency
var wordsListPositions = {};

// Reset words list
function clearWordsList() {
    wordsList = [];
    wordsListPositions = {};
    document.getElementById(wordListId).innerHTML = null;
}

// Mesh new words with old set of word frequencies
function refactorWordsList(newWords) {
    wordsList = newWords; // Additional logic will be implemented to maintain sorted order...
}

// Returns frequency list element for a word and frequency
function generateFreqListElement(word, frequency) {
    // Return word frequency list item
    let listElem = document.createElement('li');
    listElem.innerHTML = `${word}: ${frequency}`;
    listElem.setAttribute('key', word);
    return listElem
}

// Sort words in input
function processWords(e) {
    e.preventDefault(); // Avoids submit refresh functionality

    // Store available words/text input, trim input and split by spaces
    let newWords = document.getElementById(textInputId).value.trim();
    let newWordsListSplit = newWords.split(' ');
    const newWordsList = newWordsListSplit.filter(element => { // Remove '' chars
        return element !== '';
    });

    console.log(newWordsList);
    // Reset value in text area to nothing after processing
    document.getElementById(textInputId).value = '';
    refactorWordsList(newWordsList);

    // Generate new list item objects for words and frequencies
    var freqListItems = wordsList.map((word) =>
        generateFreqListElement(word, 0)
    );

    // Retrieve frequency list and refresh list items
    //console.log(freqList, freqList.data, freqList[0]);
    for (let i in freqListItems) {
        // console.log(freqListItems[i], typeof(freqListItems[i]))
        document.getElementById(wordListId).appendChild(freqListItems[i]);
    }
}

const Form = ({title = ''}) => {
    return (
        <form>
            <p>{title}</p>
            {/* <input type="text" className="todo-input"/> */}
            <textarea type='button' id={textInputId} cols="30" rows="10"></textarea>
            <div className="form-button">
                <button onClick={(e) => {processWords(e)}}>
                    SORT
                    {/* <i className="fas fa-plus-square"></i> */}
                </button>
            </div>
        </form>
    );
}

export default Form;