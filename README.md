# Warp Weather App

A modern, responsive weather application built with Next.js 15 and the OpenWeatherMap API.

## Features

- 🌤️ Current weather display with detailed information
- 📅 6-day weather forecast
- 🔍 City search functionality
- 🌡️ Temperature unit toggle (Celsius/Fahrenheit)
- 📱 Responsive design
- ⚡ Loading states and error handling
- 🔒 Secure API key handling with Next.js API routes

## Temperature Unit

This application displays temperatures in **Celsius** by default, with an the option to toggle to Fahrenheit using the temperature unit buttons in the top-right corner.

## Getting Started

### Prerequisites

- Node.js 18.18 or later
- npm, yarn, or pnpm(recommended)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/CalvinD3v/warp-weather-app.git
cd warp-weather-app
\`\`\`

2. Install dependencies:
\`\`\`bash
   **pnpm install** or **npm install** or **yarn install****
\`\`\`

3. Run the development server:
\`\`\`bash
   **pnpm dev** or **npm run dev** or **yarn dev**
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Decisions
based on the following design: [https://www.figma.com/community/file/1388954110053705224/weathertrip-weather-app](http://localhost:3000)
### API Security
- Implemented Next.js API routes to proxy requests to OpenWeatherMap API
- API key is securely stored on the server-side, never exposed to the client
- Proper error handling for various API failure scenarios

### User Experience
- Clean, modern design with glassmorphism effects
- Responsive layout that works on all device sizes
- Loading states with spinner animation
- User-friendly error messages for different scenarios
- Temperature unit toggle for user preference

### Technical Architecture
- Used Next.js 15 with App Router for modern React development
- TypeScript for type safety and better developer experience
- Component-based architecture for reusability
- Proper separation of concerns with API routes

### Weather Data
- Displays current weather conditions with icon
- Shows 6-day forecast with daily highs and lows
- Includes additional weather metrics (humidity, wind speed, visibility, feels-like temperature)
- Uses OpenWeatherMap icons for consistent weather representation

## API Integration

The app integrates with the OpenWeatherMap API to fetch:
- Current weather data for searched cities
- 5-day weather forecast data
- Weather icons and descriptions

Error handling covers:
- Invalid city names (404 responses)
- Network failures
- API rate limiting
- Malformed requests

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **OpenWeatherMap API** - Weather data source

## Project Structure

\`\`\`
app/
├── api/
│   └── weather/
│       └── route.ts          # API route for weather data
├── components/
│   ├── WeatherCard.tsx       # Main weather display component
│   ├── ForecastCard.tsx      # Daily forecast component
│   └── HighlightCard.tsx     # Weather highlights component
├── globals.css               # Global styles
├── layout.tsx               # Root layout
└── page.tsx                 # Main page component
\`\`\`

## Future Enhancements

- Geolocation-based weather detection
- Weather alerts and notifications
- Historical weather data
- Multiple city comparison
- Weather maps integration
- PWA capabilities for offline usage
- Also some auto-completion for input field (for better UX)
