# Sorting by Frequency
Web App to process text and output a list ordered primarily by frequency of the words, and secondarily by lexicographic order when frequency is tied. As a constraint, this app attempts to avoid built-in sorting utils. A custom implementation of [Binary Search](https://en.wikipedia.org/wiki/Binary_search_algorithm) and [Bisect](https://en.wikipedia.org/wiki/Bisection_(software_engineering)) algorithms and a word dictionary/hash map are utilized to maintain the sorted order of the list as new items are added.

Current development hosts primary algorithmic functionality on the client-side, soon this will be isolated to a back end server that serves the client.

# Example Run

App running with [docs/tests/test1](docs/tests/test1) as input.

Contents of [docs/tests/test1](docs/tests/test1): 

`this is a test of the emergency broadcast system this is only a test dog dog dog`

Output on client (after inputting and pressing `SORT` button):

![](docs/images/output_test_1.png)