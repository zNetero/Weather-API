require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const redis = require('redis');
const redisClient = redis.createClient();

const PORT = 3000;

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));

(async () => {
    await redisClient.connect();
})



app.get('/weather/:location', async (req, res) => {
    const { location } = req.params;

    try {
        const cachedData = await redisClient.get(location);

        if (cachedData) {
            console.log(`Cache HIT for: ${location}`);
            return res.json(JSON.parse(cachedData));
        }

        console.log(`Cache MISS for: ${location}`);

        const apiKey = process.env.DB_API_KEY;
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&contentType=json`;

        const response = await axios.get(apiUrl);
        const weatherData = response.data;

        await redisClient.set(location, JSON.stringify(weatherData), {
            EX: 900, // expires in 15minutes
        });

        res.json(weatherData);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);

        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});


const startServer = async () => {
    try {
        await redisClient.connect();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
        process.exit(1);
    }
}

startServer();
