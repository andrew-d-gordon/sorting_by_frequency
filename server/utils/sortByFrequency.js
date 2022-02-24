// Import search related utils
const { binarySearch, bisectList } = require('./searchFrequencyList');

// Mesh new words with previous set of words (and frequencies) if available
function recomputeWordsList(newWords, wordsList = [], wordsListDict = {}) {
    if (newWords === null || wordsList === null || wordsListDict === null) return [];

    // Iterate through set of words passed as input, update wordsList order
    for (let i in newWords) {
        // Check to see if we have seen the word, init vals for entry
        let newWord = newWords[i];
        let frequency = 1;
        let seenWord = newWord in wordsListDict;

        // If we have seen the word, remove the value from the list, add frequency for entry
        if (seenWord) {
            let entryIndex = binarySearch(wordsList, [newWord, wordsListDict[newWord]]);
            wordsList.splice(entryIndex, 1);
            frequency += wordsListDict[newWord];
        }

        // List is empty, add entry and continue
        if (wordsList.length === 0) {
            wordsList.push([newWord, frequency]);
            wordsListDict[newWord] = frequency;
            continue;
        }

        // Bisect list for correct index to place entry (insert idx to maintain sorted order)
        let entryPoint = bisectList(wordsList, [newWord, frequency]);

        // Update wordsList by adding new entry
        if (entryPoint > 0 && entryPoint < wordsList.length) { // Adding somewhere in the middle
            wordsList.splice(entryPoint, 0, [newWord, frequency]);
        } else if (entryPoint === 0) { // Adding to the front
            wordsList = [[newWord, frequency]].concat(wordsList);
        } else { // Adding to the end
            wordsList.push([newWord, frequency]);
        }

        // Set entry word's frequency in dictionary
        wordsListDict[newWord] = frequency;
    }

    // Return newly computed wordsList
    return wordsList;
}

module.exports = { recomputeWordsList };