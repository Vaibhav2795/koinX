import dotenv from "dotenv"

dotenv.config()

const requiredEnvVars = [
  "PORT",
  "NEXT_PUBLIC_NODE_ENV",
  "MONGO_DB_USER_NAME",
  "MONGO_DB_PASSWORD",
  "MONGO_DB_CLUSTER",
  "COINGECKO_API_KEY",
  "NATS_URL",
] as const

// Validate required environment variables
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
})

const mongoConfig = {
  username: process.env.MONGO_DB_USER_NAME,
  password: process.env.MONGO_DB_PASSWORD,
  cluster: process.env.MONGO_DB_CLUSTER,
}

const natsConfig = {
  url: process.env.NATS_URL,
}

export const env = {
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV!,
  MONGO_DB_URI: `mongodb+srv://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.cluster}/?retryWrites=true&w=majority&appName=KoinX-Cluster`,
  COINGECKO_API_KEY: process.env.COINGECKO_API_KEY!,
  NATS_URL: natsConfig.url,
}
