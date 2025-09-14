"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  Globe,
  Brush,
  Palette,
  Camera,
  Scissors,
  Feather,
  Paintbrush,
  Layers,
  Zap,
  Frame,
  Shirt,
  Gem,
  Hammer,
  Coffee,
  Star,
  TrendingUp,
  Filter,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Subcategory {
  name: string
  count: number
  icon: any
  trending?: boolean
  featured?: boolean
}

interface Category {
  name: string
  slug: string
  icon: any
  color: string
  description: string
  subcategories: Subcategory[]
  featuredImage: string
}

const categories: Category[] = [
  {
    name: "Digital Arts",
    slug: "digital-arts",
    icon: Sparkles,
    color: "primary",
    description: "NFT-ready digital creations, AI art, and downloadable designs",
    featuredImage: "/abstract-digital-painting.jpg",
    subcategories: [
      { name: "Abstract Digital Art", count: 847, icon: Palette, trending: true },
      { name: "Digital Portraits", count: 623, icon: Camera, featured: true },
      { name: "AI Generated Art", count: 456, icon: Zap, trending: true },
      { name: "Vector Illustrations", count: 389, icon: Layers },
      { name: "Digital Paintings", count: 312, icon: Paintbrush },
      { name: "Pixel Art", count: 156, icon: Layers },
      { name: "3D Digital Art", count: 234, icon: Layers },
      { name: "Digital Collages", count: 178, icon: Scissors },
    ],
  },
  {
    name: "Physical Arts",
    slug: "physical-arts",
    icon: Globe,
    color: "accent",
    description: "Museum-quality prints, frames, and physical reproductions",
    featuredImage: "/watercolor-landscape-print.jpg",
    subcategories: [
      { name: "Canvas Prints", count: 567, icon: Frame, featured: true },
      { name: "Framed Artwork", count: 445, icon: Frame },
      { name: "Metal Prints", count: 234, icon: Frame },
      { name: "Poster Prints", count: 389, icon: Frame },
      { name: "Acrylic Prints", count: 156, icon: Frame },
      { name: "Wood Prints", count: 123, icon: Frame },
      { name: "Fine Art Prints", count: 298, icon: Frame, trending: true },
      { name: "Photography Prints", count: 201, icon: Camera },
    ],
  },
  {
    name: "Handmade Arts",
    slug: "handmade-arts",
    icon: Brush,
    color: "chart-3",
    description: "Original handcrafted pieces by talented artisans worldwide",
    featuredImage: "/handmade-ceramic-art.jpg",
    subcategories: [
      { name: "Ceramics & Pottery", count: 234, icon: Coffee, featured: true },
      { name: "Textiles & Fabrics", count: 189, icon: Shirt },
      { name: "Jewelry & Accessories", count: 156, icon: Gem, trending: true },
      { name: "Wood Crafts", count: 123, icon: Hammer },
      { name: "Glass Art", count: 89, icon: Gem },
      { name: "Sculptures", count: 67, icon: Hammer },
      { name: "Calligraphy", count: 145, icon: Feather, trending: true },
      { name: "Embroidery", count: 98, icon: Shirt },
    ],
  },
]

export function CategoryNavigation() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])

  const toggleCategory = (slug: string) => {
    setExpandedCategory(expandedCategory === slug ? null : slug)
  }

  const toggleSubcategory = (subcategory: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((s) => s !== subcategory) : [...prev, subcategory],
    )
  }

  return (
    <div className="space-y-6">
      {/* Category Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => (
          <Card
            key={category.slug}
            className="group overflow-hidden rounded-2xl border-2 hover:border-primary/30 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={category.featuredImage || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <Badge className={`bg-${category.color} text-${category.color}-foreground rounded-full px-4 py-2`}>
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </Badge>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-serif font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-90">{category.subcategories.length} subcategories</p>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-4 leading-relaxed">{category.description}</p>
              <Button variant="ghost" className="w-full justify-between" onClick={() => toggleCategory(category.slug)}>
                <span>Explore Subcategories</span>
                {expandedCategory === category.slug ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Subcategory Navigation */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.slug}>
            {expandedCategory === category.slug && (
              <Card className="border-2 animate-in slide-in-from-top-2 duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 bg-${category.color}/10 rounded-xl`}>
                        <category.icon className={`h-8 w-8 text-${category.color}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-foreground">{category.name}</h3>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <Link href={`/${category.slug}`}>
                      <Button className={`bg-${category.color} hover:bg-${category.color}/90 rounded-full`}>
                        View All
                      </Button>
                    </Link>
                  </div>

                  {/* Subcategory Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.subcategories.map((subcategory) => (
                      <Button
                        key={subcategory.name}
                        variant={selectedSubcategories.includes(subcategory.name) ? "default" : "outline"}
                        className="h-auto p-4 justify-start flex-col items-start space-y-2 rounded-xl relative"
                        onClick={() => toggleSubcategory(subcategory.name)}
                      >
                        {/* Trending/Featured Badges */}
                        {subcategory.trending && (
                          <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Hot
                          </Badge>
                        )}
                        {subcategory.featured && (
                          <Badge className="absolute top-2 right-2 bg-yellow-500 text-white text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}

                        <div className="flex items-center space-x-3 w-full">
                          <subcategory.icon className="h-5 w-5 flex-shrink-0" />
                          <div className="text-left flex-1">
                            <div className="font-medium text-sm">{subcategory.name}</div>
                            <div className="text-xs text-muted-foreground">{subcategory.count} items</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-8 p-4 bg-muted/30 rounded-xl">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {category.subcategories.reduce((sum, sub) => sum + sub.count, 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Items</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {category.subcategories.filter((sub) => sub.trending).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Trending</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {category.subcategories.filter((sub) => sub.featured).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Featured</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Selected Filters Summary */}
      {selectedSubcategories.length > 0 && (
        <Card className="border-2 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center">
                <Filter className="h-4 w-4 mr-2 text-primary" />
                Selected Categories ({selectedSubcategories.length})
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSubcategories([])}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSubcategories.map((subcategory) => (
                <Badge
                  key={subcategory}
                  variant="default"
                  className="cursor-pointer"
                  onClick={() => toggleSubcategory(subcategory)}
                >
                  {subcategory}
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-2 hover:bg-transparent">
                    ×
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
