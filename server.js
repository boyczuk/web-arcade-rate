const express = require('express');
const cors = require('cors');
const { getAccessToken } = require('./auth');
const { searchGames } = require('./igdb'); 

const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require(path.join(__dirname, 'config/serviceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'arcade-rate'
});

const db = admin.firestore()

const app = express();
const PORT = process.env.PORT || 3001;

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

app.post('/add-game', async (req, res) => {
    const { userId, gameId, gameName } = req.body;

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
        let updatedGames = userData.games ? userData.games.split(',').map(Number) : [];

        if (!updatedGames.includes(gameId)) {
            updatedGames.push(gameId);
            await userRef.update({ games: updatedGames.join(',') });
            return res.status(200).send("Game added successfully");
        } else {
            return res.status(400).send("Game already exists");
        }
    } catch (error) {
        console.error('Error updating user profile:', erorr);
        return res.status(500).send('Internal server error.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});