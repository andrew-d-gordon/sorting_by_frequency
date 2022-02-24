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

module.exports = { isLesser, equalEntries };