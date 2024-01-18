const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));


require('dotenv').config();

// Middleware to parse JSON requests
app.use(express.json());

// Route to search games
app.get('/search-games', async (req, res) => {
    try {
        const response = await axios({
            url: 'https://api.igdb.com/v4/games',
            method: 'POST',
            headers: {
                // DO NOT COMMIT UNTIL API KEYS ARE HIDDEN
                'Accept': 'application/json',
                'Client-ID': process.env.IGDB_CLIENT_ID,
                'Authorization': 'Bearer ${process.env.IGDB_ACCESS_TOKEN}'
            },
            data: 'fields name,genres,platforms; search "' + req.query.q + '";'
        });
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error fetching data from IGDB: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
