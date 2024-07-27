const express = require('express');
const cors = require('cors');
const { getAccessToken } = require('./auth');
const { searchGames } = require('./igdb'); 
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');
const axios = require('axios');

const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

const CLIENT_ID = process.env.IGDB_CLIENT_ID;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'arcade-rate'
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3001;

async function fetchGameById(accessToken, gameId) {
    try {
        const url = `https://api.igdb.com/v4/games`;  // IGDB endpoint for games
        const response = await axios.post(url, `fields name, cover.url; where id = ${gameId};`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Client-ID': CLIENT_ID,  // Your IGDB client ID
                'Accept': 'application/json'
            }
        });
        return response.data;  // Assuming the API returns the game details in response.data
    } catch (error) {
        console.error('Error fetching game from IGDB:', error);
        throw error;
    }
}

app.use(cors({ origin: 'http://localhost:3000' }));
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

app.get('/fetch-game-by-id', async (req, res) => {
    try {
        const token = await getAccessToken();
        const gameId = req.query.id;
        const data = await fetchGameById(token, gameId);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching game data from IGDB: ${error.message}`);
    }
});

app.post('/add-game', async (req, res) => {
    const { userId, gameId, gameName, rating, notes } = req.body;

    if (!userId || !gameId) {
        return res.status(400).send("Missing userId or gameId");
    }

    try {
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).send("User not found");
        }

        const userData = userDoc.data();
        const gamesArray = Array.isArray(userData.games) ? userData.games : [];

        const newGame = { gameId, gameName, rating, notes };

        const gameExists = gamesArray.some(game => game.gameId === gameId);

        if (!gameExists) {
            gamesArray.push(newGame);
            await userRef.update({ games: gamesArray });
            res.status(200).json({ message: "Game added successfully" });
        } else {
            return res.status(400).send("Game already exists");
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
