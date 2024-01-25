const axios = require('axios');

async function searchGames(token, query) {
    const response = await axios({
        url: 'https://api.igdb.com/v4/games',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': process.env.IGDB_CLIENT_ID,
            'Authorization': `Bearer ${token}`
        },
        data: `fields name,genres,platforms; search "${query}";`
    });
    return response.data;
}

module.exports = { searchGames };
