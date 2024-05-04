const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { getAccessToken } = require('./auth'); // Import the function from auth.js
const { searchGames } = require('./igdb'); // Import the function from igdb.js

const app = express();

app.use(cors({ origin: true })); // Adjust for Firebase Functions
app.use(express.json());

app.get('/search-games', async (req, res) => {
    try {
        const token = await getAccessToken(); 
        const data = await searchGames(token, req.query.q);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching data from IGDB: ${error.message}`);
    }
});

exports.api = functions.https.onRequest(app);
