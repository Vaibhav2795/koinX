import axios from "axios"

import { env } from "../config/env"
import { CryptoStats } from "../models/CryptoStats"
import { calculateStandardDeviation } from "../helper/utils"

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3"

interface CoinGeckoResponse {
  id: string
  name: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
}

const createErrorResponse = (
  statusCode: number,
  message: string
): {
  statusCode: number
  message: string
} => {
  return { statusCode, message }
}

export const getCryptoStats = async (coin: string | undefined) => {
  if (!coin) {
    throw createErrorResponse(400, "Coin name is required in query parameters.")
  }

  const latestData = await CryptoStats.findOne({ coinId: coin }).sort({
    timestamp: -1,
  })

  if (!latestData) {
    throw createErrorResponse(404, "No data found for the given coin.")
  }

  return {
    price: latestData.currentPrice,
    marketCap: latestData.marketCap,
    "24hChange": latestData.priceChange24h,
  }
}

export const getCryptoDeviation = async (coin: string | undefined) => {
  const records = await CryptoStats.find({ coinId: coin })
    .sort({ timestamp: -1 })
    .limit(100)

  const prices = records.map((record) => record.currentPrice)
  if (prices.length < 2) {
    throw createErrorResponse(400, "Not enough data to calculate deviation.")
  }

  return calculateStandardDeviation(prices)
}

export async function storeCryptoStats(): Promise<void> {
  try {
    const coins = ["bitcoin", "ethereum", "matic-network"]

    // Fetch data from CoinGecko API
    const response = await axios.get<CoinGeckoResponse[]>(
      `${COINGECKO_API_URL}/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          ids: coins.join(","),
          order: "market_cap_desc",
          per_page: 3,
          sparkline: false,
          price_change_percentage: "24h",
        },
        headers: {
          "x-cg-api-key": env.COINGECKO_API_KEY,
        },
      }
    )

    // Transform and store data
    const statsPromises = response.data.map((coin) => {
      const stats = new CryptoStats({
        coinId: coin.id,
        name: coin.name,
        currentPrice: coin.current_price,
        marketCap: coin.market_cap,
        priceChange24h: coin.price_change_percentage_24h,
      })
      return stats.save()
    })

    await Promise.all(statsPromises)
    console.log("Successfully stored crypto stats")
  } catch (error) {
    console.error("Error storing crypto stats:", error)
    throw error
  }
}
