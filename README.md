# Clip URL

A fast, secure, and user-friendly URL shortener that trims long links into concise, shareable URLs.

## Features

- Shorten long URLs into easy-to-share, short URLs.
- Option to create custom short codes.
- Built with security and performance in mind.
- **Redis caching** for faster retrieval.
- **Rate limiting** to prevent abuse.
- Provides easy redirection from short URLs to original URLs.

## Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance)
- Redis (Use [Redis Cloud](https://redis.com/solutions/redis-cloud/) or a local Redis instance)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/fahimahammed/clip-url.git
   cd clip-url
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up a `.env` file in the root directory:

    Make sure to configure the `.env` file with the necessary environment variables:

    - **PORT**: The port where the application will run.
    - **NODE_ENV**: Environment mode (`development`, `production`).
    - **MONGO_URI**: MongoDB connection string for the database.
    - **REDIS_URI**: Redis connection string for caching.


4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser by navigating to [http://localhost:3000](http://localhost:3000).

---

## API Endpoints

### 1. POST `/api/v1/url`

Shorten a given long URL.

#### Request Body:

```json
{
  "originalUrl": "https://www.example.com/some-long-path/with-a-lot-of-parameters?query1=value1&query2=value2&query3=value3&query4=value4&query5=value5&query6=value6&query7=value7&query8=value8&query9=value9&query10=value10",
  "customShortCode": "examplelink"  // optional
}
```

- **originalUrl**: The long URL to shorten (required).
- **customShortCode**: Optional custom code for the shortened URL. If not provided, a random shortcode will be generated.

#### Response:

```json
{
  "shortUrl": "http://localhost:3000/api/v1/url/examplelink"
}
```

- **shortUrl**: The shortened URL. This is the URL that you can share and redirect to the original URL.

#### Example Request:

```bash
POST http://localhost:3000/api/v1/url
Content-Type: application/json

{
  "originalUrl": "https://www.example.com/some-long-path/with-a-lot-of-parameters?query1=value1&query2=value2&query3=value3&query4=value4&query5=value5&query6=value6&query7=value7&query8=value8&query9=value9&query10=value10",
  "customShortCode": "examplelink" 
}
```

#### Example Response:

```json
{
  "shortUrl": "http://localhost:3000/api/v1/url/examplelink"
}
```

---

### 2. GET `/api/v1/url/{shortCode}`

Redirects the user to the original URL based on the given short code.

#### Example Request:

```bash
GET http://localhost:3000/api/v1/url/examplelink
```

This will redirect the browser to the original URL: `https://www.example.com/some-long-path/with-a-lot-of-parameters?query1=value1&query2=value2&query3=value3&query4=value4&query5=value5&query6=value6&query7=value7&query8=value8&query9=value9&query10=value10`.

---

## How It Works

1. **Shortening a URL**:  
   When a user sends a POST request to `/api/v1/url` with a long URL (like `https://www.example.com/some-long-path/with-a-lot-of-parameters?query1=value1&query2=value2&query3=value3&query4=value4&query5=value5&query6=value6&query7=value7&query8=value8&query9=value9&query10=value10`), the application generates a short code (either custom or random) and stores it in the database.  
   The response contains the short URL (e.g., `http://localhost:3000/api/v1/url/exampleurl`).

2. **Redirecting to the Original URL**:  
   When a user visits the shortened URL (e.g., `http://localhost:3000/api/v1/url/exampleurl`), the application queries the database and retrieves the original URL (`https://www.example.com/some-long-path/with-a-lot-of-parameters?query1=value1&query2=value2&query3=value3&query4=value4&query5=value5&query6=value6&query7=value7&query8=value8&query9=value9&query10=value10`) and redirects the user to it.

3. **Caching**:  
   To improve performance, the application uses **Redis** to cache shortened URLs and their corresponding original URLs. The cache helps serve requests faster and reduces the load on the database.

4. **Rate Limiting**:  
   To prevent abuse, the app **limits the number of requests** a user can make in a given time frame using the `express-rate-limit` middleware.

---

## Testing

### Test the URL shortening API

Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the endpoints.

#### Example using cURL:
```bash
curl -X POST http://localhost:3000/api/v1/url -H "Content-Type: application/json" -d '{"originalUrl": "https://www.example.com/some-long-path/with-a-lot-of-parameters?query1=value1&query2=value2&query3=value3&query4=value4&query5=value5&query6=value6&query7=value7&query8=value8&query9=value9&query10=value10", "customShortCode": "examplelink"}'
```

This will return a shortened URL, like:

```json
{
  "shortUrl": "http://localhost:3000/api/v1/url/examplelink"
}
```

