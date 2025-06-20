import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "OpenWeather API key is not configured" }, { status: 500 })
  }

  try {
    // Fetch current weather
    const weatherResponse = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    )

    if (!weatherResponse.ok) {
      if (weatherResponse.status === 404) {
        return NextResponse.json({ error: "Sorry my future BOSS your City is not found. Please check your spelling and try again." }, { status: 404 })
      }
      throw new Error("Weather API request failed")
    }

    const weatherData = await weatherResponse.json()

    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    )

    let forecastData = null
    if (forecastResponse.ok) {
      forecastData = await forecastResponse.json()
    }

    return NextResponse.json({
      current: weatherData,
      forecast: forecastData,
    })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data. Please try again later." }, { status: 500 })
  }
}
