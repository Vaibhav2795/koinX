const { getNatsConnection } = require("./utils/nats")

async function startWorker() {
  const nats = await getNatsConnection()
  console.log("Worker connected to NATS")

  // Publish event every 15 minutes
  setInterval(async () => {
    try {
      const message = { trigger: "update" }
      nats.publish("crypto.update", Buffer.from(JSON.stringify(message)))
      console.log("Published crypto.update event")
    } catch (error) {
      console.error("Error publishing event:", error)
    }
  }, 15 * 60 * 1000)
}

startWorker().catch(console.error)
