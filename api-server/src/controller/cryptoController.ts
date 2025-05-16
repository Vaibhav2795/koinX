import { Request, Response } from "express"
import { getCryptoDeviation, getCryptoStats } from "../services/cryptoService"

interface QueryParams {
  coin?: string
}

export const getStats = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const { coin } = req.query
    const allowedCoins = ["bitcoin", "ethereum", "matic-network"]
    const coinName = coin?.toLowerCase()
    if (!coinName || !allowedCoins.includes(coinName)) {
      throw {
        statusCode: 400,
        message:
          "Invalid coin. Allowed values are: bitcoin, ethereum, matic-network",
      }
    }

    const cryptoData = await getCryptoStats(coinName)

    res.status(200).json(cryptoData)
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}

export const getDeviation = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response
) => {
  try {
    const { coin } = req.query
    const allowedCoins = ["bitcoin", "ethereum", "matic-network"]
    const coinName = coin?.toLowerCase()
    if (!coinName || !allowedCoins.includes(coinName)) {
      throw {
        statusCode: 400,
        message:
          "Invalid coin. Allowed values are: bitcoin, ethereum, matic-network",
      }
    }

    const cryptoData = await getCryptoDeviation(coinName)

    res.status(200).json({ deviation: cryptoData })
  } catch (error: any) {
    res.status(error.statusCode || 500).json({ message: error.message })
  }
}
