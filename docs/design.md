# Sorted By Frequency Design

**Overview**:

The main structure of the Sorted by Frequency application is a server and a client. The server has an Express framework and utilizes RESTful routes to help service frequency sorting requests on sets of words. The client is a React app with a text input window to add words, a button to run a request for a frequency sort by the server, and a resulting frequency sorted words list that displays data that has come back from the server.

**What is a frequency sort?**:

Well, according to the spec, the definition of a frequency sort, as implemented here, is a list of words and their respective frequencies (from a set of input text), ordered in a decreasing order by frequency, and a lexicographic order on tied frequencies (alphabetical). As a caveat, this program aims to avoid the use of built in sorting methods to accomplish this sort of algorithm. This could be seen as unnatural, however, relying on built in sorting to keep the view of the list ordered would end up being quite costly as the list grows in size. The reason for this is one would have to run a sort over the entire list for every word that is added (assuming the words are added one by one). Worst case this could add up to `O(n*nlogn)` as you are running an `O(nlogn)` sort `n` times (`n` being the number of words being processed). 

Below I will detail how I believe I improved on this, the runtime, and what some other implementations could have been.

**Sorting By Frequency Algorithm**:

The primary code for this algorithm lives in server/utils and is driven by [`sortByFrequency.js`](../server/utils/sortByFrequency.js). My implementation for maintaining the order of the frequency sorted list (as new words are added) is by utilizing a dictionary to track what words have been seen and their respective frequencies, as well as custom binary search methods. To describe the run of the algorithm for a given word that would be processed:

1) If we have seen the word prior, find it's current entry in our sorted list of words with binarySearch (entries of the form [word, frequency]), then remove the entry from the sorted list of words.

2) If we have seen the word prior, add to the entries frequency count by 1. If we have not seen the word, we make a new entry for said word and set it's frequency to 1, e.g. [word, 1].

3) Now, find the correct location in the list for the new/updated entry to reside (i.e. the insert location which would maintain sorted order, function used is bisectList which returns the index where an entry belongs in the sorted list). This location in the list will have the left neighbor of our entry be less than it, and the right neighbor of our entry be greater than it. Insert the entry into this location in the list.

4) Finally, add/update our dictionary with the entry for the word/frequency pairing.

5) Process the next word...


Here is the above in a pseudocode format.

Variables include `newWords`, `wordsList`, and `wordsListDict`:
- `newWords`: The set of new words which have been retrieved from input.
- `wordsList`: The frequency sorted list of all previous word/frequency pairs we have seen thus far (each entry as [word, frequency]).
- `wordsListDict`: A dictionary containing key value pairs for each word and associated frequency in wordsList.

```
for word in newWords:

    frequency = 1

    if word in wordsListDict:

        find location where [word, wordsListDict[word]] in wordsList // binarySearch

        remove [word, wordsListDict[word]] from wordsList

        frequency = frequency + wordsListDict[word]
        
    find location to insert [word, frequency] in wordsList // bisectList

    insert [word, frequency] at found location // (inbetween existing elements of wordsList)

    wordsListDict[word] = frequency
```

**Runtime**:

The runtime of this algorithm comes out to around O(nlogn). The binarySearch and bisectLeft operations each run in `O(logn)` where n is the number of new words being processed. As we can perform both binarySearch (find element in sorted list, in the case we have seen the word before) and the bisectList (find position in sorted list for entry to go) operations for each word we process, this gives us a literal worst case runtime of `O(n*2logn)`, which can be simplified to `O(nlogn)`.

While I did consider the use of binary trees and min/max heaps, I thought that the potential need to rebalance the binary tree over time or the need to pop all the elements off a heap (constant heapifying) in order to view the sorted order would result in unnecessary complexity (with no perceivable improvement to runtime).