"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X, Sliders, Tag, DollarSign, Palette, Brush, Sparkles, Globe, TrendingUp } from "lucide-react"

export function AdvancedSearch() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const categories = [
    { name: "Digital Arts", icon: Sparkles, count: 2847 },
    { name: "Physical Arts", icon: Globe, count: 1923 },
    { name: "Handmade Arts", icon: Brush, count: 856 },
  ]

  const artStyles = [
    "Abstract",
    "Portrait",
    "Landscape",
    "Modern",
    "Classical",
    "Minimalist",
    "Pop Art",
    "Surreal",
    "Watercolor",
    "Oil Painting",
  ]

  const priceRanges = ["Under 50 XRP", "50-100 XRP", "100-250 XRP", "250-500 XRP", "500+ XRP"]

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for digital art, paintings, sculptures, artists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-20 py-4 text-lg rounded-2xl border-2 focus:border-primary bg-card"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="rounded-full">
            <Sliders className="h-4 w-4" />
          </Button>
          <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
            Search
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <Card className="mt-4 border-2">
          <CardContent className="p-6 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center">
                <Palette className="h-4 w-4 mr-2 text-primary" />
                Categories
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedFilters.includes(category.name) ? "default" : "outline"}
                    className="justify-start rounded-xl"
                    onClick={() => toggleFilter(category.name)}
                  >
                    <category.icon className="h-4 w-4 mr-2" />
                    {category.name}
                    <Badge variant="secondary" className="ml-auto">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Art Styles */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center">
                <Tag className="h-4 w-4 mr-2 text-accent" />
                Art Styles
              </h3>
              <div className="flex flex-wrap gap-2">
                {artStyles.map((style) => (
                  <Badge
                    key={style}
                    variant={selectedFilters.includes(style) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => toggleFilter(style)}
                  >
                    {style}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-chart-3" />
                Price Range (XRP)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {priceRanges.map((range) => (
                  <Button
                    key={range}
                    variant={selectedFilters.includes(range) ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => toggleFilter(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {selectedFilters.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-primary" />
                  Active Filters ({selectedFilters.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.map((filter) => (
                    <Badge
                      key={filter}
                      variant="default"
                      className="cursor-pointer"
                      onClick={() => toggleFilter(filter)}
                    >
                      {filter}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFilters([])}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Suggestions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {["Abstract Art", "Digital Portraits", "Handmade Ceramics", "Oil Paintings"].map((suggestion) => (
          <Badge
            key={suggestion}
            variant="outline"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setSearchQuery(suggestion)}
          >
            <TrendingUp className="h-3 w-3 mr-1" />
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  )
}
