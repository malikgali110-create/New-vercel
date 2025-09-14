"use client"

import { useState } from "react"
import { DemoPopup } from "@/components/demo-popup"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brush, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for handmade arts
const handmadeArts = [
  {
    id: "hand-001",
    title: "Hand-Painted Portrait",
    artist: "MasterPainter",
    price: 450,
    currency: "USD",
    image: "/hand-painted-portrait-artwork.jpg",
    category: "Handmade",
    tags: ["Hand-Painted", "Portrait", "Original", "Rare"],
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: "hand-002",
    title: "Custom Art Shirt",
    artist: "TextileArtist",
    price: 85,
    currency: "USD",
    image: "/custom-hand-painted-shirt.jpg",
    category: "Handmade",
    tags: ["Custom", "Shirt", "Wearable", "Unique"],
    rating: 4.7,
  },
  {
    id: "hand-003",
    title: "Sculpture Miniature",
    artist: "SculptorMaster",
    price: 320,
    currency: "USD",
    image: "/handmade-sculpture-miniature.jpg",
    category: "Handmade",
    tags: ["Sculpture", "3D", "Collectible", "Artisan"],
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: "hand-004",
    title: "Handwoven Tapestry",
    artist: "WeaveArtist",
    price: 280,
    currency: "USD",
    image: "/handwoven-tapestry-art.jpg",
    category: "Handmade",
    tags: ["Tapestry", "Textile", "Traditional", "Large"],
    rating: 4.6,
  },
  {
    id: "hand-005",
    title: "Ceramic Art Bowl",
    artist: "CeramicMaster",
    price: 120,
    currency: "USD",
    image: "/handmade-ceramic-art-bowl.jpg",
    category: "Handmade",
    tags: ["Ceramic", "Functional", "Glazed", "Artisan"],
    rating: 4.5,
  },
  {
    id: "hand-006",
    title: "Leather Art Journal",
    artist: "LeatherCrafter",
    price: 95,
    currency: "USD",
    image: "/handmade-leather-art-journal.jpg",
    category: "Handmade",
    tags: ["Leather", "Journal", "Functional", "Crafted"],
    rating: 4.4,
  },
]

const availableTags = [
  "Hand-Painted",
  "Custom",
  "Sculpture",
  "Tapestry",
  "Ceramic",
  "Leather",
  "Portrait",
  "Original",
  "Wearable",
  "Functional",
  "Collectible",
  "Traditional",
]

export default function HandmadeArtsPage() {
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
  const filteredProducts = handmadeArts
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
                <Brush className="h-6 w-6 text-secondary" />
                <h1 className="text-2xl font-bold text-foreground">Handmade Arts</h1>
              </div>
            </div>
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              {filteredProducts.length} artworks
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Handmade Art Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Rare and unique handcrafted pieces by legendary artists. Each item is one-of-a-kind, made with traditional
            techniques and signed by the artist.
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
