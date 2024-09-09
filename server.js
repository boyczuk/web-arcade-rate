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

app.post('/remove-game', async (req, res) => {
    const { userId, gameId } = req.body;

    if (!gameId) {
        return res.status(400).json({ error: "Missing gameId" });
    }

    if (!userId) {
        return res.status(400).json({ error: "Missing userId" });
    }

    try {
        const docRef = db.collection('users').doc(userId);

        const docSnapshot = await docRef.get();
        if (!docSnapshot.exists) {
            return res.status(404).json({ error: "User document not found" });
        }

        const data = docSnapshot.data();
        const games = data.games || [];

        const gameToRemove = games.find((game) => game.gameId === gameId);

        if (!gameToRemove) {
            return res.status(404).json({ error: "Game not found" });
        }

        await docRef.update({
            games: admin.firestore.FieldValue.arrayRemove(gameToRemove),
        });

        return res.status(200).json({ message: "Game removed successfully" });
    } catch (error) {
        console.error("Error removing game: ", error);
        return res.status(500).json({ error: "Internal server error" });
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
            console.log(`Game added to user's profile: ${gameName}`);

            const gameRef = db.collection('games').doc(String(gameId));
            const gameDoc = await gameRef.get();

            if (gameDoc.exists) {
                const gameData = gameDoc.data();
                const newReviewsCount = gameData.reviewsCount + 1;
                const newTotalRatingSum = gameData.totalRatingSum + rating;

                const newAverageRating = newTotalRatingSum / newReviewsCount;

                await gameRef.update({
                    reviewsCount: newReviewsCount,
                    totalRatingSum: newTotalRatingSum,
                    averageRating: newAverageRating,
                });

                console.log(`Incremented reviewsCount and updated rating for game: ${gameName}`);
                res.status(200).json({ message: "Game added to user's profile and review count incremented." });
            } else {
                await gameRef.set({
                    gameName,
                    reviewsCount: 1,
                    totalRatingSum: rating,
                    averageRating: rating,
                    cover: null, 
                });

                console.log(`New game added to games collection: ${gameName}`);
                res.status(200).json({ message: "Game added to user's profile and new game created in games collection." });
            }
        } else {
            return res.status(400).send("Game already exists in the user's profile.");
        }
    } catch (error) {
        console.error('Error updating user profile or adding game:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
