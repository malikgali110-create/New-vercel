"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for digital arts
const digitalArts = [
  {
    id: "nft-001",
    title: "Cosmic Dreams Collection #1",
    artist: "CryptoArtist",
    price: 0.5,
    currency: "XRP",
    image: "/cosmic-digital-art-nft.jpg",
    category: "Digital",
    tags: ["NFT", "Space", "Abstract", "Rare"],
    rating: 4.8,
    isNFT: true,
    isFeatured: true,
  },
  {
    id: "nft-002",
    title: "Digital Landscape Series",
    artist: "PixelMaster",
    price: 0.3,
    currency: "XRP",
    image: "/digital-landscape.png",
    category: "Digital",
    tags: ["NFT", "Landscape", "Nature", "Digital"],
    rating: 4.6,
    isNFT: true,
  },
  {
    id: "print-001",
    title: "Printable Abstract Art",
    artist: "ModernCreator",
    price: 25,
    currency: "USD",
    image: "/abstract-printable-art.jpg",
    category: "Digital",
    tags: ["Printable", "Abstract", "Modern", "Colorful"],
    rating: 4.5,
  },
  {
    id: "nft-003",
    title: "Emotion Capsule #42",
    artist: "EmotionArtist",
    price: 1.2,
    currency: "XRP",
    image: "/emotion-capsule-digital-art.jpg",
    category: "Digital",
    tags: ["NFT", "Emotion", "Exclusive", "Limited"],
    rating: 4.9,
    isNFT: true,
    isFeatured: true,
  },
  {
    id: "print-002",
    title: "Geometric Patterns Pack",
    artist: "GeometryGuru",
    price: 15,
    currency: "USD",
    image: "/geometric-patterns-digital.jpg",
    category: "Digital",
    tags: ["Printable", "Geometric", "Patterns", "Minimalist"],
    rating: 4.4,
  },
  {
    id: "nft-004",
    title: "Cyberpunk City #7",
    artist: "FutureVision",
    price: 0.8,
    currency: "XRP",
    image: "/cyberpunk-city-digital-art.png",
    category: "Digital",
    tags: ["NFT", "Cyberpunk", "City", "Futuristic"],
    rating: 4.7,
    isNFT: true,
  },
]

const availableTags = [
  "NFT",
  "Printable",
  "Abstract",
  "Space",
  "Landscape",
  "Nature",
  "Modern",
  "Geometric",
  "Cyberpunk",
  "Emotion",
  "Limited",
  "Rare",
]

export default function DigitalArtsPage() {
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
  const filteredProducts = digitalArts
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artist.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => product.tags.includes(tag))
      const matchesPrice =
        priceRange === "all" ||
        (() => {
          const price = product.currency === "XRP" ? product.price * 100 : product.price // Convert XRP to USD equivalent
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
          return b.id.localeCompare(a.id) // newest first
      }
    })

  return (
    <div className="min-h-screen bg-background">
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
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Digital Arts</h1>
              </div>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">{filteredProducts.length} artworks</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Digital Art Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover unique NFT collections with exclusive traits and high-quality printable digital artwork. All
            digital assets are blockchain-verified and instantly downloadable.
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
          <ProductGrid products={filteredProducts} columns={4} />
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
