# Worker Server

A Node.js worker service that publishes cryptocurrency update events via NATS messaging.

## Features

- Publishes crypto update events every 10 seconds
- NATS messaging integration
- Lightweight and efficient

## Prerequisites

- Node.js (v14 or higher)
- NATS server

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```env
NATS_URL=nats://localhost:4222
```

3. Start the worker:

```bash
npm start
```

## Functionality

The worker service:

- Connects to NATS server
- Publishes a `crypto.update` event every 15 min
- Event payload: `{ trigger: "update" }`

## Architecture

- Uses NATS for messaging
- Simple Node.js worker process
- Event-driven architecture
