## Quran API Backend
## Project Overview

-> This project is a custom backend API built using Node.js, Express, MongoDB, and Axios.
It fetches Quran data from the official Quran.com public API, processes it, stores it in a local database, and serves optimized responses to users.

-> The main goal of this project is to build a scalable and production-ready backend instead of directly depending on an external API for every request.

## How It Works

-> When a user requests a specific Surah:

-> The backend first checks if the Surah already exists in the database.

## If it exists:

-> The data is returned directly from MongoDB (fast response).

## If it does not exist:

-> The backend fetches data from the Quran.com API.

-> HTML formatting (like <sup> footnotes) is cleaned.

-> The processed data is stored in the database.

-> Then the response is sent to the user.

-> This approach ensures better performance and reduced dependency on external APIs.

## Why Not Call the External API Directly?

->If we directly called the external API every time:

-> Every request would hit the external server.

-> Higher latency due to network delay.

-> Risk of rate limits or API blocking.

-> If the external API goes down, our app would stop working.

-> No control over data formatting or structure.

## Advantages of the Implemented Approach

-> By fetching once, cleaning, and storing in MongoDB:

-> Faster responses (data served from database).

-> Reduced dependency on third-party service availability.

-> No risk of hitting rate limits repeatedly.

-> Cleaned and structured data (HTML footnotes removed).

-> Full control over schema and response structure.

-> More scalable and production-ready architecture.

## Tech Stack

Node.js

Express.js

MongoDB

Mongoose

Axios

dotenv