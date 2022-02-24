// Compare function to evaluate if entryOne is lesser than entryTwo (entries => [word, frequency])
const isLesser = (entryOne, entryTwo) => {
    if (entryOne === null || entryTwo === null) return false;

    // If frequency of entry one is less than entryTwo, return true
    if (entryOne[1] < entryTwo[1]) return true;

    // If frequency of entries are equal, return true if entryOne's word is larger alphabetically
    if (entryOne[1] === entryTwo[1] && entryOne[0] > entryTwo[0]) return true;

    // Entry one is greater than entry two, return false
    return false;
}

// Compares two entries in wordsList for equality
const equalEntries = (entryOne, entryTwo) => {
    if (entryOne === null || entryTwo === null) return false;
    return entryOne[0] === entryTwo[0] && entryOne[1] === entryTwo[1];
}

module.exports = { isLesser, equalEntries };