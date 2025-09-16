require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const apiKey = process.env.DB_API_KEY;

const PORT = 3000;

app.get('/weather/:location', async(req,res)=>{
    const { location } = req.params
    const apiKey = process.env.DB_API_KEY;
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&contentType=json`;
    try{
    const response = await axios.get(apiUrl);
    res.json(response.data);
    }catch(error){
        console.error('Error:',error.response?.data || error.message);
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
