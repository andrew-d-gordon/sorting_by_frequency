// Imports
const express = require('express');

// Set port from env, default is 3001
const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})
