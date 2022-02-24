// Import search related utils
const { binarySearch, bisectList } = require('./searchFrequencyList');

// Mesh new words with previous set of words (and frequencies) if available
function recomputeWordsList(newWords, wordsList = [], wordsListDict = {}) {
    // Iterate through set of words passed as input, update wordsList order
    for (let i in newWords) {
        console.log('wordsList in recomputeWordsList:', wordsList);
        // Check to see if we have seen the word, init vals for entry
        let newWord = newWords[i];
        let frequency = 1;
        let seenWord = newWord in wordsListDict;

        // If we have seen the word, remove the value from the list, add frequency for entry
        if (seenWord) {
            let entryIndex = binarySearch(wordsList, [newWord, wordsListDict[newWord]]);
            console.log(`We have seen word prior with key: ${newWord} and value: ${wordsListDict[newWord]}, entryidx: ${entryIndex}`);
            wordsList.splice(entryIndex, 1);
            frequency += wordsListDict[newWord];
        }

        if (wordsList.length === 0) { // List is empty, add entry and continue
            // //console.log(`Added new word, list was empty`);
            wordsList.push([newWord, frequency]);
            wordsListDict[newWord] = frequency;
            console.log('frequency', frequency)
            continue;
        }

        // Bisect list for correct index to place entry (to maintain sorted order)
        // Entry point is the index left of the entry (if in middle of list, else equal to 0 or last index of list)
        let entryPoint = bisectList(wordsList, [newWord, frequency]);
        console.log("Predicted entry point:", entryPoint);

        // Update wordsList by adding new entry
        if (entryPoint > 0 && entryPoint < wordsList.length) { // Entry point is not the beginning or end
            ////console.log('Adding to middle of wordslist', wordsList.slice(0,entryPoint+1), [[newWord, frequency]], wordsList.slice(entryPoint+1))
            console.log('Adding to middle')
            wordsList.splice(entryPoint, 0, [newWord, frequency]);
        } else if (entryPoint === 0) { // Adding entry to front
            console.log('Adding to front of wordslist');
            wordsList = [[newWord, frequency]].concat(wordsList);
        } else { // Adding entry to the end
            console.log('Adding to end of wordslist')
            wordsList.push([newWord, frequency]);
        }

        // Set entry word's frequency in dictionary
        wordsListDict[newWord] = frequency;
        console.log(`This is wordsList after changes:[${wordsList}]`)
    }

    // Return newly computed wordsList and wordsListDict
    return wordsList;
}

module.exports = { recomputeWordsList };