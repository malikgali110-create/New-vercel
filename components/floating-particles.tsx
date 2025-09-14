"use client"

import { useEffect, useState } from "react"
import { Palette, Brush, Sparkles, Heart, Star } from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  icon: any
  color: string
  rotation: number
  rotationSpeed: number
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  const icons = [Palette, Brush, Sparkles, Heart, Star]
  const colors = ["text-primary", "text-accent", "text-chart-3", "text-muted-foreground"]

  useEffect(() => {
    const createParticle = (id: number): Particle => ({
      id,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 0.5 + 0.1,
      icon: icons[Math.floor(Math.random() * icons.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 2,
    })

    // Initialize particles
    const initialParticles = Array.from({ length: 15 }, (_, i) => createParticle(i))
    setParticles(initialParticles)

    // Animation loop
    const animate = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y - particle.speed,
          rotation: particle.rotation + particle.rotationSpeed,
          // Reset particle when it goes off screen
          ...(particle.y < -50
            ? {
                y: window.innerHeight + 50,
                x: Math.random() * window.innerWidth,
              }
            : {}),
        })),
      )
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => {
        const IconComponent = particle.icon
        return (
          <div
            key={particle.id}
            className="absolute opacity-10"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `rotate(${particle.rotation}deg)`,
              transition: "opacity 0.3s ease",
            }}
          >
            <IconComponent className={`${particle.color}`} style={{ width: particle.size, height: particle.size }} />
          </div>
        )
      })}
    </div>
  )
}
