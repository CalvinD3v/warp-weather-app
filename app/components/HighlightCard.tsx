import type { ReactNode } from "react"

interface HighlightCardProps {
  title: string
  icon: ReactNode
  value: string
  subtitle: string
}

export function HighlightCard({ title, icon, value, subtitle }: HighlightCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-white/70">{icon}</div>
        <h4 className="text-sm font-medium opacity-80">{title}</h4>
      </div>
      <div>
        <p className="text-2xl font-bold mb-1">{value}</p>
        <p className="text-xs opacity-70">{subtitle}</p>
      </div>
    </div>
  )
}
