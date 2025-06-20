import Image from "next/image"

interface ForecastCardProps {
  date: Date
  condition: string
  icon: string
  highTemp: number
  lowTemp: number
}

export function ForecastCard({ date, condition, icon, highTemp, lowTemp }: ForecastCardProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white text-center">
      <p className="text-sm opacity-80 mb-2">{formatTime(date)}</p>
      <div className="flex justify-center mb-2">
        <Image src={`https://openweathermap.org/img/wn/${icon}.png`} alt={condition} width={32} height={32} />
      </div>
      <p className="text-xs opacity-80 mb-2 capitalize">{condition}</p>
      <div className="space-y-1">
        <p className="font-semibold">{highTemp}°</p>
        <p className="text-sm opacity-70">{lowTemp}°</p>
      </div>
    </div>
  )
}
