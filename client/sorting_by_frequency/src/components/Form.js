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

// Reset words list
function clearWordsList() {
    console.log('clearing words')
    wordsList = [];
    wordsListDict = {};
    document.getElementById(wordListId).innerHTML = null;
}

// Compare function to evaluate if entryOne is lesser than entryTwo
const isLesser = (entryOne, entryTwo) => { // Entries in the form: [word, frequency]
    //console.log(`In isLesser with: ${entryOne}, ${entryTwo}`)
    // If frequency of entry one is less than entryTwo, return true
    if (entryOne[1] < entryTwo[1]) {
        //console.log(`Returned from isLesser with TRUE`)
        return true
    }

    // If frequency of entries are equal, return true if entryOne's word is smaller alphabetically
    if (entryOne[1] === entryTwo[1] && entryOne[0] > entryTwo[0]) {
        //console.log(`Returned from isLesser with TRUE`)
        return true;
    }
    //console.log(`Returned from isLesser with FALSE`)
    // Entry one is greater than entry two, return false
    return false;
}

// Compares two entries in wordsList for equality
const equalEntries = (entryOne, entryTwo) => {
    return entryOne[0] === entryTwo[0] && entryOne[1] === entryTwo[1];
}

// Implementation of binary with custom comparison operator (isLesser)
const binarySearch = (list, item) => {
    let low = 0;
    let high = list.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        let guess = list[mid];

        // Return when entry is found
        if (equalEntries(guess, item)) {
            return mid;
        }

        if (isLesser(guess, item)) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return null; // If not found (note: should never be reached as implemented)
}

// Find appropriate place for item in sorted list (word list), return left neighbor idx
// List passed in this case will have entirely unique values and a gauranteed spot for the value
const bisectList = (list, item) => {
    let low = 0;
    let high = list.length - 1;

    // Base cases, item is smaller/greater than smallest/greatest elems in list
    if (isLesser(item, list[low]) || isLesser(list[high], item)) {
        return isLesser(item, list[low]) ? 0 : high+1; // Belongs at beginning/end of list
    }

    while (low <= high) { // Implementation requires closure on low and high bounds
        // Narrowed search space to insertion inbetween low and high indices
        if (high-low === 1) {
            // if (isLesser(list[low], item) && isLesser(item, list[high])) return low + 1 // If list can have non-unique vals
            return low + 1 // List has entirely unique values and is sorted, only place for item to go
        }

        const mid = Math.floor((low + high) / 2);
        let guess = list[mid];

        if (isLesser(item, guess)) {
            high = mid;
        } else {
            low = mid;
        }
    }

    return null; // If not found (note: should never be reached as implemented)
}

// Mesh new words with old set of word frequencies
function recomputeWordsList(newWords) {
    // Iterate through set of words passed as input, update wordsList order
    for (let i in newWords) {
        // Check to see if we have seen the word, init vals for entry
        let newWord = newWords[i];
        let frequency = 1;
        let seenWord = newWord in wordsListDict;

        // If we have seen the word, remove the value from the list, add frequency for entry
        if (seenWord) {
            let entryIndex = binarySearch(wordsList, [newWord, wordsListDict[newWord]]);
            //console.log(`We have seen word prior with key: ${newWord} and value: ${wordsListDict[newWord]}, entryidx: ${entryIndex}`);
            wordsList.splice(entryIndex, 1);
            frequency += wordsListDict[newWord];
        }

        if (wordsList.length === 0) { // List is empty, add entry and continue
            // //console.log(`Added new word, list was empty`);
            wordsList.push([newWord, frequency]);
            wordsListDict[newWord] = frequency;
            // //console.log('frequency', frequency)
            continue;
        }

        // Bisect list for correct index to place entry (to maintain sorted order)
        // Entry point is the index left of the entry (if in middle of list, else equal to 0 or last index of list)
        let entryPoint = bisectList(wordsList, [newWord, frequency]);
        //console.log("Predicted entry point:", entryPoint);

        // Update wordsList by adding new entry
        if (entryPoint > 0 && entryPoint < wordsList.length) { // Entry point is not the beginning or end
            ////console.log('Adding to middle of wordslist', wordsList.slice(0,entryPoint+1), [[newWord, frequency]], wordsList.slice(entryPoint+1))
            //console.log('Adding to middle')
            wordsList.splice(entryPoint, 0, [newWord, frequency]);
        } else if (entryPoint === 0) { // Adding entry to front
            //console.log('Adding to front of wordslist');
            wordsList = [[newWord, frequency]].concat(wordsList);
        } else { // Adding entry to the end
            //console.log('Adding to end of wordslist')
            wordsList.push([newWord, frequency]);
        }

        // Set entry word's frequency in dictionary
        wordsListDict[newWord] = frequency;
        //console.log(`This is wordsList after changes:[${wordsList}]`)
    }
}

// Returns frequency list element for a word and frequency
function generateFreqListElement(word, frequency) {
    // Return word frequency list item
    let listElem = document.createElement('li');
    listElem.innerHTML = `${word}: ${frequency}`;
    listElem.setAttribute('key', word);
    return listElem;
}

// Sort words in input
function processWords(e) {
     // Prevent submit functionality (as to not clear words present in input)
    e.preventDefault();

    // Store available words/text input, trim input and split by spaces
    let newWords = document.getElementById(textInputId).value.trim();

    // Replace newlines with spaces, then split into words by spaces
    let newWordsListSplit = newWords.replace(/\n/g, ' ').split(' '); 
    const newWordsList = newWordsListSplit.filter(element => { // Remove '' chars
        return element !== '';
    });

    // If no new words available, return away
    if (newWordsList.length === 0) {
        return;
    }

    //console.log(newWordsList);
    // Reset value in text area to nothing after processing
    document.getElementById(textInputId).value = '';

    // Will be replaced by call to backend with new words and current words
    recomputeWordsList(newWordsList);

    // Generate new list item objects for words and frequencies
    var freqListItems = wordsList.map((entry) =>
        generateFreqListElement(entry[0], entry[1])
    );

    // Retrieve frequency list and refresh list items
    // //console.log(freqList, freqList.data, freqList[0]);
    document.getElementById(wordListId).innerHTML = ''; // Clear current list displayed
    for (let i in freqListItems) { // Write updated words list to output
        document.getElementById(wordListId).appendChild(freqListItems[freqListItems.length-1-i]); // Reverse order
    }
}

// Allows trigger of processing text with enter key in addition to sort button
function enterPressed(e) {
    var code = e.keyCode || e.which;
    if(code === 13) { // 13 is the enter key code
        processWords(e);
    } 
}

// Sequences download of current words in wordsList
function downloadWordsList (e, filename='sortedByFrequencyOutput.txt') {
    // If no words in wordsList, alert and do not download
    if (wordsList.length == 0) {
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
            {/* <input type="text" className="todo-input"/> */}
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