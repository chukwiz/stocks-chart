import axios from "axios"
import { StockIntervalProps } from "@/context/AppContext"

const POLYGON_API_URL = "https://api.polygon.io"

export const fetchStock = (ticker: string, interval: StockIntervalProps) => {
    return axios.get(`${POLYGON_API_URL}/v2/aggs/ticker/${ticker}/range/${interval.multiplier}/${interval.timeSpan}/${interval.from}/${interval.to}?adjusted=true&sort=asc&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`)
        .then((response) => response.data)
        .catch(error => console.log(error))
}

export const searchStocks = (keyword: string) => {
    return axios.get(`${POLYGON_API_URL}/v3/reference/tickers?search=${keyword}&market=stocks&sort=ticker&active=true&limit=10&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`)
        .then((response) => response.data)
        .catch(error => console.log(error))
}

export const fetchStockDetails = (symbol: string) => {
    return axios.get(`${POLYGON_API_URL}/v3/reference/tickers/${symbol}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`)
        .then((response) => response.data)
        .catch(error => console.log(error))
}