# API Server

A Node.js API server that provides cryptocurrency statistics and deviation data.

## Features

- RESTful API endpoints for crypto statistics
- Real-time updates via NATS messaging
- MongoDB integration for data storage
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- NATS server

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=4000

# Database Configuration
MONGO_DB_USER_NAME=<mongodb-username>
MONGO_DB_PASSWORD=<mongodb-password>
MONGO_DB_CLUSTER=<mongodb-cluster>

# CoinGecko Configuration
COINGECKO_API_KEY=<api-key>

# NATS Configuration
NATS_URL=nats://localhost:4222
```

3. Start the server:

```bash
npm start
```

## API Endpoints

### Get Crypto Stats

```http
GET /api/crypto/stats?coin={coin}
```

Query Parameters:

- `coin`: One of "bitcoin", "ethereum", or "matic-network"

### Get Crypto Deviation

```http
GET /api/crypto/deviation?coin={coin}
```

Query Parameters:

- `coin`: One of "bitcoin", "ethereum", or "matic-network"

## Error Handling

- 400: Invalid coin parameter
- 500: Server error

## Architecture

- Uses Express.js for routing
- NATS for real-time messaging
- MongoDB for data persistence
- TypeScript for type safety
