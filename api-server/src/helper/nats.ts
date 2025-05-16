import { connect } from "nats"
import { env } from "../config/env"

export async function getNatsConnection() {
  return await connect({
    servers: env.NATS_URL,
  })
}
