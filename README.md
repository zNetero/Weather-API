Weather API

A simple and efficient REST API built with Node.js and Express that serves weather data from the Visual Crossing Weather API. 
It features a caching layer using Redis to optimize performance and reduce the number of calls to the external API

🚀 Features

Dynamic Weather Data: Get weather forecast data for any location in the world.

Performance Optimized: Implements a Redis caching layer to provide near-instant responses for recent searches.

Rate Limit Friendly: The cache significantly reduces the number of requests made to the external API, helping to stay within usage limits.

Secure: Manages API keys securely using environment variables.

Scalable: Built with modern tools like Docker for running services.

🛠️ Technologies

Backend: Node.js, Express.js

Caching: Redis

HTTP Client: Axios

Environment: Docker

Environment Variables: Dotenv
