"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Globe, Star } from "lucide-react"

interface StatItem {
  icon: any
  value: number
  label: string
  color: string
  suffix?: string
}

const stats: StatItem[] = [
  { icon: TrendingUp, value: 10000, label: "Artworks", color: "text-primary", suffix: "+" },
  { icon: Users, value: 500, label: "Artists", color: "text-foreground", suffix: "+" },
  { icon: Globe, value: 50, label: "Countries", color: "text-chart-3", suffix: "+" },
  { icon: Star, value: 99, label: "Satisfaction", color: "text-accent", suffix: "%" },
]

export function AnimatedStats() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("animated-stats")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000 // 2 seconds
        const steps = 60
        const increment = stat.value / steps
        let current = 0

        const timer = setInterval(() => {
          current += increment
          if (current >= stat.value) {
            current = stat.value
            clearInterval(timer)
          }

          setAnimatedValues((prev) => {
            const newValues = [...prev]
            newValues[index] = Math.floor(current)
            return newValues
          })
        }, duration / steps)
      })
    }
  }, [isVisible])

  return (
    <div id="animated-stats" className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="text-center product-card-hover p-6 rounded-2xl bg-card border group"
          style={{
            animationDelay: `${index * 200}ms`,
          }}
        >
          <div className="mb-4 flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
              <stat.icon className={`h-8 w-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
            </div>
          </div>
          <div
            className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2 font-serif transition-all duration-300 group-hover:scale-110`}
          >
            {animatedValues[index]}
            {stat.suffix}
          </div>
          <div className="text-muted-foreground font-medium">{stat.label}</div>
        </Card>
      ))}
    </div>
  )
}
