import mongoose from "mongoose"

interface ICryptoStats {
  coinId: string
  name: string
  currentPrice: number
  marketCap: number
  priceChange24h: number
  timestamp: Date
}

const cryptoSchema = new mongoose.Schema<ICryptoStats>({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  priceChange24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
})

export const CryptoStats = mongoose.model<ICryptoStats>(
  "CryptoStats",
  cryptoSchema
)
