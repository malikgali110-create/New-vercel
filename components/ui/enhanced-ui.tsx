"use client"

import React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingBag, Sparkles } from "lucide-react"

// Enhanced Typography Components
export function EtsyHeading({ 
  children, 
  level = 1, 
  className, 
  ...props 
}: {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements
  const baseStyles = "font-serif font-bold text-foreground leading-tight tracking-tight"
  
  const sizeStyles = {
    1: "text-4xl md:text-6xl lg:text-7xl",
    2: "text-3xl md:text-4xl lg:text-5xl",
    3: "text-2xl md:text-3xl lg:text-4xl",
    4: "text-xl md:text-2xl lg:text-3xl",
    5: "text-lg md:text-xl lg:text-2xl",
    6: "text-base md:text-lg lg:text-xl"
  }

  return (
    <Component 
      className={cn(baseStyles, sizeStyles[level], className)} 
      {...(props as any)}
    >
      {children}
    </Component>
  )
}

// Enhanced Product Card
export function EtsyProductCard({
  title,
  artist,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  badge,
  isFavorited = false,
  onFavoriteClick,
  onAddToCart,
  className,
  ...props
}: {
  title: string
  artist: string
  price: string
  originalPrice?: string
  rating: number
  reviewCount: number
  image: string
  badge?: string
  isFavorited?: boolean
  onFavoriteClick?: () => void
  onAddToCart?: () => void
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={cn(
      "group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-2xl",
      className
    )} {...props}>
      <div className="relative overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          width={400}
          height={256}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {badge && (
          <Badge className="absolute top-3 left-3 bg-primary text-white font-medium px-3 py-1 rounded-full">
            {badge}
          </Badge>
        )}
        <Button
          size="sm"
          variant="ghost"
          className={cn(
            "absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 hover:bg-white transition-all duration-300",
            isFavorited ? "text-red-500" : "text-gray-600 hover:text-red-500"
          )}
          onClick={onFavoriteClick}
        >
          <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
        </Button>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
            by {artist}
          </p>
        </div>
        
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "h-3 w-3",
                i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
              )} 
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-foreground">{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
            )}
          </div>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-chart-4 text-white rounded-full px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
            onClick={onAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Section Container
export function EtsySection({
  children,
  className,
  background = "default",
  ...props
}: {
  children: React.ReactNode
  className?: string
  background?: "default" | "warm" | "accent" | "gradient"
} & React.HTMLAttributes<HTMLElement>) {
  const backgroundStyles = {
    default: "bg-background",
    warm: "bg-gradient-to-br from-orange-50 to-amber-50",
    accent: "bg-gradient-to-br from-cyan-50 to-blue-50",
    gradient: "bg-gradient-to-br from-primary/5 via-accent/5 to-chart-3/5"
  }

  return (
    <section 
      className={cn(
        "py-16 md:py-24 px-4 relative overflow-hidden",
        backgroundStyles[background],
        className
      )} 
      {...props}
    >
      {children}
    </section>
  )
}

// Enhanced Button Variants
export function EtsyButton({
  children,
  variant = "primary",
  size = "default",
  className,
  ...props
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost" | "warm"
  size?: "sm" | "default" | "lg" | "xl"
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantStyles = {
    primary: "bg-primary hover:bg-chart-4 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent",
    ghost: "hover:bg-primary/10 text-primary",
    warm: "bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg hover:shadow-xl"
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg",
    default: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-12 py-5 text-xl rounded-2xl"
  }

  return (
    <button
      className={cn(
        "font-medium transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/20",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Enhanced Badge Component
export function EtsyBadge({
  children,
  variant = "default",
  className,
  ...props
}: {
  children: React.ReactNode
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "new" | "hot"
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>) {
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    new: "bg-gradient-to-r from-blue-500 to-purple-500 text-white animate-pulse",
    hot: "bg-gradient-to-r from-red-500 to-orange-500 text-white animate-bounce"
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Enhanced Container
export function EtsyContainer({
  children,
  size = "default",
  className,
  ...props
}: {
  children: React.ReactNode
  size?: "sm" | "default" | "lg" | "xl" | "full"
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const sizeStyles = {
    sm: "max-w-4xl",
    default: "max-w-6xl",
    lg: "max-w-7xl",
    xl: "max-w-8xl",
    full: "max-w-full"
  }

  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}