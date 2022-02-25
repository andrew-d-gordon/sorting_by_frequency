// Imports
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const path = require('path');
const { recomputeWordsList } = require('./utils/sortByFrequency');
const { checkArrayElemType } = require('./utils/typeCheck');

// Set port from env, default set to 3001
const PORT = process.env.PORT || 3001;

// Init app
const app = express();
app.use(cors());
app.use(json());

// Process request to sort batch of new words (wordsList and wordsListDict can be emtpy)
app.post(
    "/api/processWords", 
    (req, res) => {
        // Attempt to pull off incoming newWords, wordsList, and wordsListDict from req body
        let newWords = req.body.newWords || [];
        let wordsList = req.body.wordsList || [];
        let wordsListDict = req.body.wordsListDict || {};

        // If no new words are present, respond with bad request (400)
        if (newWords.length === 0) {
            res.status(400);
            res.json({message: "Bad request, no new words available"});
            return;
        }

        // If newWords is not an array or contains elements other than strings, respond with bad request (400)
        if (!Array.isArray(newWords) || !checkArrayElemType(newWords, "string")) {
            res.status(400);
            res.json({message: "Bad request, new words is not a list or does not contain strictly strings"});
            return;
        }

        // With non-empty set of new words, have words sorted by frequency
        let newWordsList =  recomputeWordsList(newWords, wordsList, wordsListDict);
        
        // Package recomputed wordsList and wordsListDict into JSON response and set successful status code
        res.status(200);
        res.json(   {message: "Successfully processed words for frequency sort", 
                    wordsList: newWordsList, 
                    wordsListDict: wordsListDict});
});

// Have node serve files for our React app
app.use(express.static(path.resolve(__dirname, '../client/sorting_by_frequency/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/sorting_by_frequency/build', 'index.html'));
});

// Server begins listening...
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
