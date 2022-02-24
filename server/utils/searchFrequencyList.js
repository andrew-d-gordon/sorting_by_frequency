
// Import comparison functions
const { isLesser, equalEntries } = require('./compareFrequencyList');

// Implementation of binary search with custom comparison operator (isLesser)
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

module.exports = { binarySearch, bisectList };