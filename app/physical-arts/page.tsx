"use client"

import { useState } from "react"
import { DemoPopup } from "@/components/demo-popup"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for physical arts
const physicalArts = [
  {
    id: "canvas-001",
    title: "Mountain Landscape Canvas",
    artist: "NaturePainter",
    price: 89,
    currency: "USD",
    image: "/mountain-landscape-canvas-print.jpg",
    category: "Physical",
    tags: ["Canvas", "Landscape", "Nature", "Large"],
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: "frame-001",
    title: "Abstract Framed Art",
    artist: "ModernArtist",
    price: 125,
    currency: "USD",
    image: "/abstract-framed-artwork.jpg",
    category: "Physical",
    tags: ["Framed", "Abstract", "Modern", "Colorful"],
    rating: 4.6,
  },
  {
    id: "shirt-001",
    title: "Artistic T-Shirt Design",
    artist: "FashionCreator",
    price: 35,
    currency: "USD",
    image: "/artistic-t-shirt-design.jpg",
    category: "Physical",
    tags: ["T-Shirt", "Wearable", "Casual", "Unique"],
    rating: 4.4,
  },
  {
    id: "poster-001",
    title: "Vintage Art Poster",
    artist: "RetroDesigner",
    price: 25,
    currency: "USD",
    image: "/vintage-art-poster.jpg",
    category: "Physical",
    tags: ["Poster", "Vintage", "Retro", "Affordable"],
    rating: 4.5,
  },
  {
    id: "canvas-002",
    title: "City Skyline Canvas",
    artist: "UrbanArtist",
    price: 95,
    currency: "USD",
    image: "/city-skyline-canvas-art.jpg",
    category: "Physical",
    tags: ["Canvas", "Urban", "Skyline", "Modern"],
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: "mug-001",
    title: "Art Coffee Mug",
    artist: "CeramicDesigner",
    price: 18,
    currency: "USD",
    image: "/artistic-coffee-mug.jpg",
    category: "Physical",
    tags: ["Mug", "Functional", "Gift", "Small"],
    rating: 4.3,
  },
]

const availableTags = [
  "Canvas",
  "Framed",
  "T-Shirt",
  "Poster",
  "Mug",
  "Landscape",
  "Abstract",
  "Urban",
  "Vintage",
  "Modern",
  "Wearable",
  "Functional",
]

export default function PhysicalArtsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSortBy("newest")
    setPriceRange("all")
    setSelectedTags([])
  }

  // Filter and sort products
  const filteredProducts = physicalArts
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artist.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => product.tags.includes(tag))
      const matchesPrice =
        priceRange === "all" ||
        (() => {
          const price = product.price
          switch (priceRange) {
            case "0-50":
              return price <= 50
            case "50-100":
              return price > 50 && price <= 100
            case "100-500":
              return price > 100 && price <= 500
            case "500+":
              return price > 500
            default:
              return true
          }
        })()

      return matchesSearch && matchesTags && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "oldest":
          return a.id.localeCompare(b.id)
        default:
          return b.id.localeCompare(a.id)
      }
    })

  return (
    <div className="min-h-screen bg-background">
      <DemoPopup />
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-accent" />
                <h1 className="text-2xl font-bold text-foreground">Physical Arts</h1>
              </div>
            </div>
            <Badge className="bg-accent/10 text-accent border-accent/20">{filteredProducts.length} artworks</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Physical Art Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            High-quality prints on canvas, framed artwork, apparel, and more. All items are professionally printed and
            shipped worldwide with care.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ProductFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            availableTags={availableTags}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} columns={5} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No artworks found matching your criteria.</p>
            <Button onClick={handleClearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
