import express from "express"
import { env } from "./config/env"
import connectDB from "./helper/db"
import cryptoRoutes from "./routes/cryptoRoutes"
import { getNatsConnection } from "./helper/nats"
import { storeCryptoStats } from "./services/cryptoService"

const app = express()

app.use(express.json())
app.use("/api", cryptoRoutes)

async function setupNatsSubscription(nats: any) {
  nats.subscribe("crypto.update", {
    callback: async (err: any, msg: any) => {
      if (err) {
        console.error("NATS subscription error:", err)
        return
      }
      try {
        const message = JSON.parse(msg.data.toString())
        if (message.trigger === "update") {
          console.log("Received crypto.update event, fetching stats")
          await storeCryptoStats()
        }
      } catch (error) {
        console.error("Error processing NATS message:", error)
      }
    },
  })
}

const startServer = async () => {
  try {
    await connectDB(env.MONGO_DB_URI)
    const nats = await getNatsConnection()
    await setupNatsSubscription(nats)

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`)
    })
  } catch (error) {
    process.exit(1)
  }
}

startServer()
