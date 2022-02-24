// Imports
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const path = require('path');
const { recomputeWordsList } = require('./utils/sortByFrequency');

// Set port from env, default set to 3001
const PORT = process.env.PORT || 3001;

// Init app
const app = express();
app.use(cors());
app.use(json());

// Has Node serve files for built React app
app.use(express.static(path.resolve(__dirname, '../client/sorting_by_frequency/public')));

// Process request to sort batch of new words (wordsList and wordsListDict can be emtpy)
app.post(
    "/api/processWords", 
    (req, res) => {
        // Pull off incoming newWords, wordsList?, and wordsListDict? from req body
        let { newWords, wordsList, wordsListDict } = req.body;

        // If no new words are present, respond with bad request (400)
        if (newWords === null || newWords.length === 0) {
            res.status(400);
            res.json({message: "Bad request, no new words available"});
        }

        // With non-empty set of new words, have words sorted by frequency
        let newWordsList =  (wordsList == null || wordsListDict == null) ?
                            recomputeWordsList(newWords) : // wordsList or wordsListDict empty, use defaults
                            recomputeWordsList(newWords, wordsList, wordsListDict);

        // Package recomputed wordsList and wordsListDict into JSON response and set successful status code
        res.status(200);
        res.json(   {message: "Successfully processed words for frequency sort", 
                    wordsList: newWordsList, 
                    wordsListDict: wordsListDict});
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/sorting_by_frequency/public', 'index.html'));
});

// Server begins listening...
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
