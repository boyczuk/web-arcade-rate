const axios = require('axios');
require('dotenv').config();

const CLIENT_ID = process.env.IGDB_CLIENT_ID;
const CLIENT_SECRET = process.env.IGDB_CLIENT_SECRET;

let accessToken = null;
let tokenExpires = 0;

async function getAccessToken() {
    const now = Math.floor(Date.now() / 1000);
    if (!accessToken || now >= tokenExpires) {
        try {
            const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
                params: {
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: 'client_credentials'
                }
            });

            accessToken = response.data.access_token;
            tokenExpires = now + response.data.expires_in - 300;

            console.log('New IGDB access token obtained.');
        } catch (error) {
            console.error('Error fetching access token from IGDB:', error);
            throw error; 
        }
    }
    return accessToken;
}

module.exports = { getAccessToken };
