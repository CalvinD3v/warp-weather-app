import Image from "next/image"

interface WeatherCardProps {
  city: string
  country: string
  date: string
  temperature: number
  condition: string
  description: string
  icon: string
  unit: "C" | "F"
}

export function WeatherCard({
  city,
  country,
  date,
  temperature,
  condition,
  description,
  icon,
  unit,
}: WeatherCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm opacity-80 mb-1">{date}</p>
          <h2 className="text-2xl font-bold">{city}</h2>
          <p className="text-sm opacity-80">{country}</p>
        </div>
        <div className="text-right">
          <div className="text-6xl font-light mb-2">{temperature}°</div>
          <div className="flex items-center gap-2">
            <Image src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={condition} width={40} height={40} />
            <div>
              <p className="font-medium">{condition}</p>
              <p className="text-sm opacity-80 capitalize">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
