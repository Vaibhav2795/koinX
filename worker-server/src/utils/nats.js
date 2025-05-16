const { connect } = require("nats")

async function getNatsConnection() {
  return await connect({
    servers: process.env.NATS_URL || "nats://localhost:4222",
  })
}

module.exports = { getNatsConnection }
