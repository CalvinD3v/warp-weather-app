"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Thermometer, Wind, Droplets, Eye } from "lucide-react"
import { WeatherCard } from "./components/WeatherCard"
import { ForecastCard } from "./components/ForecastCard"
import { HighlightCard } from "./components/HighlightCard"

interface WeatherData {
  current: {
    name: string
    sys: { country: string }
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      humidity: number
    }
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
    wind: { speed: number }
    visibility: number
  }
  forecast?: {
    list: Array<{
      dt: number
      main: {
        temp: number
        temp_min: number
        temp_max: number
      }
      weather: Array<{
        main: string
        description: string
        icon: string
      }>
    }>
  }
}

export default function WeatherApp() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [unit, setUnit] = useState<"C" | "F">("C")

  const convertTemp = (temp: number) => {
    if (unit === "F") {
      return Math.round((temp * 9) / 5 + 32)
    }
    return Math.round(temp)
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data")
      }

      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const today = new Date()
  const dailyForecasts = weatherData?.forecast?.list.filter((_, index) => index % 8 === 0).slice(0, 6) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Wrap Weather App</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUnit("C")}
              className={`px-3 py-1 rounded ${unit === "C" ? "bg-white text-blue-600" : "text-white"}`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit("F")}
              className={`px-3 py-1 rounded ${unit === "F" ? "bg-white text-blue-600" : "text-white"}`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              disabled={loading}
            />
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
            <p className="text-white">{error}</p>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Weather Card */}
            <div className="lg:col-span-2">
              <WeatherCard
                city={weatherData.current.name}
                country={weatherData.current.sys.country}
                date={formatDate(today)}
                temperature={convertTemp(weatherData.current.main.temp)}
                condition={weatherData.current.weather[0].main}
                description={weatherData.current.weather[0].description}
                icon={weatherData.current.weather[0].icon}
                unit={unit}
              />

              {/* Daily Forecast */}
              <div className="mt-6">
                <div className="flex items-center gap-4 mb-4">
                  <button className="text-white font-semibold border-b-2 border-white pb-1">Today</button>
                  <button className="text-white/70 font-semibold">Week</button> {/* JUST FOR DECO */}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {dailyForecasts.map((forecast, index) => (
                    <ForecastCard
                      key={index}
                      date={new Date(forecast.dt * 1000)}
                      condition={forecast.weather[0].main}
                      icon={forecast.weather[0].icon}
                      highTemp={convertTemp(forecast.main.temp_max)}
                      lowTemp={convertTemp(forecast.main.temp_min)}
                      unit={unit}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Today's Highlights */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Today's Highlights</h3>
              <div className="space-y-4">
                <HighlightCard
                  title="Temperature Variation"
                  icon={<Thermometer className="w-6 h-6" />}
                  value={`${convertTemp(weatherData.current.main.temp_max)}° / ${convertTemp(weatherData.current.main.temp_min)}°`}
                  subtitle={`Feels like ${convertTemp(weatherData.current.main.feels_like)}°`}
                />
                <HighlightCard
                  title="Wind Speed"
                  icon={<Wind className="w-6 h-6" />}
                  value={`${Math.round(weatherData.current.wind.speed * 3.6)} km/h`}
                  subtitle="Wind speed"
                />
                <HighlightCard
                  title="Humidity"
                  icon={<Droplets className="w-6 h-6" />}
                  value={`${weatherData.current.main.humidity}%`}
                  subtitle="Humidity level"
                />
                <HighlightCard
                  title="Visibility"
                  icon={<Eye className="w-6 h-6" />}
                  value={`${Math.round(weatherData.current.visibility / 1000)} km`}
                  subtitle="Visibility range"
                />
              </div>
            </div>
          </div>
        )}

        {/* Default State */}
        {!weatherData && !loading && !error && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">Welcome to Warp Weather App</h2>
            <p className="text-white/70">Search for a city to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
