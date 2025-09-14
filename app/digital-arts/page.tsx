"use client"

import { useState } from "react"
import { DemoPopup } from "@/components/demo-popup"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowLeft, Download, Palette, Star } from "lucide-react"
import Link from "next/link"
import { useHolder } from "@/contexts/holder-context"

// Import demo data
import demoData from "@/data/demo-products.json"

const digitalArts = demoData.digitalArts

const availableTags = [
  "Illustration",
  "Portrait",
  "Calligraphy",
  "Abstract",
  "Nature",
  "Modern",
  "Vintage",
  "Minimalist",
  "Colorful",
  "Black & White",
  "Geometric",
  "Artistic"
]

export default function DigitalArtsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { isHolder } = useHolder()

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
        product.creator.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => product.tags.includes(tag))
      const matchesPrice =
        priceRange === "all" ||
        (() => {
          const price = product.priceUSD
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
          return a.priceXRP - b.priceXRP
        case "price-high":
          return b.priceXRP - a.priceXRP
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
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Digital Arts</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isHolder && (
                <Badge className="bg-gold/10 text-gold border-gold/20">
                  <Star className="h-3 w-3 mr-1" />
                  Holder Benefits Active
                </Badge>
              )}
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {filteredProducts.length} artworks
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Digital Art Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            High-quality digital artwork for personal and commercial use. Instant download with multiple license options.
          </p>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Download className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Instant Download</h3>
                  <p className="text-sm text-muted-foreground">High-res files ready to use</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Palette className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Multiple Formats</h3>
                  <p className="text-sm text-muted-foreground">PNG, JPG, SVG, PDF included</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Star className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Commercial License</h3>
                  <p className="text-sm text-muted-foreground">Use for business projects</p>
                </div>
              </CardContent>
            </Card>
          </div>
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
          <ProductGrid products={filteredProducts.map(product => ({
            id: product.id,
            title: product.title,
            artist: product.creator,
            price: product.priceXRP,
            currency: "XRP",
            image: product.images[0],
            category: product.category,
            tags: product.tags,
            rating: product.rating,
            isNFT: false,
            isFeatured: product.badges.includes('BESTSELLER')
          }))} columns={5} />
        ) : (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">No artworks found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search terms.</p>
            <Button onClick={handleClearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
