"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, Heart, Share2, Grid3X3, List, Truck, Shield, Award } from "lucide-react"
import Link from "next/link"
import { DirectPurchaseModal } from "@/components/direct-purchase-modal"

interface HandmadeArt {
  id: string
  title: string
  artist: string
  price: number
  currency: string
  image: string
  category: string
  materials: string[]
  dimensions: string
  weight: string
  rating: number
  reviews: number
  description: string
  inStock: boolean
  handmadeBy: string
  origin: string
  shippingTime: string
}

const handmadeArtworks: HandmadeArt[] = [
  {
    id: "ceramic-vase-001",
    title: "Ceramic Vase Set",
    artist: "Emma Wilson",
    price: 0.120,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Ceramics",
    materials: ["Clay", "Glaze", "Natural pigments"],
    dimensions: "25cm H x 15cm W",
    weight: "1.2kg",
    rating: 5.0,
    reviews: 34,
    description: "Handcrafted ceramic vase set with unique glazing technique. Each piece is one-of-a-kind with subtle variations that make it special.",
    inStock: true,
    handmadeBy: "Emma Wilson Studio",
    origin: "Portland, Oregon",
    shippingTime: "7-10 business days"
  },
  {
    id: "wooden-sculpture-002",
    title: "Abstract Wood Sculpture",
    artist: "Marcus Thompson",
    price: 0.250,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Wood Art",
    materials: ["Oak wood", "Natural oil finish"],
    dimensions: "40cm H x 20cm W x 15cm D",
    weight: "2.8kg",
    rating: 4.9,
    reviews: 18,
    description: "Carved from a single piece of sustainably sourced oak, this abstract sculpture captures the natural beauty of wood grain.",
    inStock: true,
    handmadeBy: "Thompson Woodworks",
    origin: "Vermont, USA",
    shippingTime: "10-14 business days"
  },
  {
    id: "textile-wall-hanging-003",
    title: "Bohemian Wall Hanging",
    artist: "Sofia Martinez",
    price: 0.085,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Textiles",
    materials: ["Cotton", "Wool", "Natural dyes"],
    dimensions: "60cm H x 40cm W",
    weight: "0.5kg",
    rating: 4.7,
    reviews: 67,
    description: "Handwoven wall hanging using traditional techniques and natural fibers. Features intricate patterns and earthy color palette.",
    inStock: true,
    handmadeBy: "Martinez Textiles",
    origin: "Guatemala",
    shippingTime: "14-21 business days"
  },
  {
    id: "glass-bowl-004",
    title: "Blown Glass Art Bowl",
    artist: "David Chen",
    price: 0.180,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Glass Art",
    materials: ["Borosilicate glass", "Silver leaf accents"],
    dimensions: "30cm diameter x 12cm H",
    weight: "1.5kg",
    rating: 4.8,
    reviews: 23,
    description: "Stunning blown glass bowl with silver leaf accents. Perfect as a centerpiece or functional art piece.",
    inStock: false,
    handmadeBy: "Chen Glass Studio",
    origin: "Seattle, Washington",
    shippingTime: "21-28 business days"
  },
  {
    id: "metal-sculpture-005",
    title: "Copper Wire Sculpture",
    artist: "Rachel Green",
    price: 95,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Metal Art",
    materials: ["Copper wire", "Patina finish"],
    dimensions: "35cm H x 25cm W",
    weight: "0.8kg",
    rating: 4.6,
    reviews: 41,
    description: "Delicate copper wire sculpture with natural patina finish. Represents the flow of nature through abstract forms.",
    inStock: true,
    handmadeBy: "Green Metal Arts",
    origin: "Austin, Texas",
    shippingTime: "5-7 business days"
  },
  {
    id: "leather-journal-006",
    title: "Hand-bound Leather Journal",
    artist: "Thomas Brown",
    price: 65,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Leather Goods",
    materials: ["Full-grain leather", "Handmade paper", "Waxed thread"],
    dimensions: "20cm H x 15cm W x 3cm D",
    weight: "0.4kg",
    rating: 4.9,
    reviews: 89,
    description: "Traditional hand-bound journal with full-grain leather cover and handmade paper. Perfect for writing, sketching, or journaling.",
    inStock: true,
    handmadeBy: "Brown Leather Co.",
    origin: "Florence, Italy",
    shippingTime: "10-14 business days"
  }
]

export default function HandmadeArtPage() {
  const [selectedArt, setSelectedArt] = useState<HandmadeArt | null>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterAvailability, setFilterAvailability] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArtworks = handmadeArtworks.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.materials.some(material => material.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = filterCategory === "all" || art.category.toLowerCase() === filterCategory.toLowerCase()
    const matchesAvailability = filterAvailability === "all" || 
                               (filterAvailability === "in-stock" && art.inStock) ||
                               (filterAvailability === "out-of-stock" && !art.inStock)
    return matchesSearch && matchesCategory && matchesAvailability
  })

  const handlePurchase = (art: HandmadeArt) => {
    setSelectedArt(art)
    setShowPurchaseModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Handmade Art Collection</h1>
            <p className="text-xl mb-8">Unique handcrafted pieces from skilled artisans around the world</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                Authentic Handmade
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Truck className="h-4 w-4 mr-2" />
                Worldwide Shipping
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Quality Guaranteed
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search artworks, artists, or materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="ceramics">Ceramics</SelectItem>
              <SelectItem value="wood art">Wood Art</SelectItem>
              <SelectItem value="textiles">Textiles</SelectItem>
              <SelectItem value="glass art">Glass Art</SelectItem>
              <SelectItem value="metal art">Metal Art</SelectItem>
              <SelectItem value="leather goods">Leather Goods</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterAvailability} onValueChange={setFilterAvailability}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArtworks.length} of {handmadeArtworks.length} handmade pieces
          </p>
        </div>

        {/* Artworks Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {filteredArtworks.map((art) => (
            <Card key={art.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              {viewMode === "grid" ? (
                <>
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20" />
                    <Badge className="absolute top-2 left-2 bg-white/90 text-black">
                      {art.category}
                    </Badge>
                    {!art.inStock && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        Out of Stock
                      </Badge>
                    )}
                    <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{art.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {art.artist}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{art.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{art.reviews} reviews</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{art.dimensions} • {art.origin}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">{art.price} {art.currency}</span>
                      <Button 
                        size="sm" 
                        onClick={() => handlePurchase(art)}
                        disabled={!art.inStock}
                      >
                        {art.inStock ? "Buy Now" : "Sold Out"}
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex p-4 gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20" />
                    {!art.inStock && (
                      <Badge className="absolute top-1 right-1 bg-red-500 text-white text-xs">
                        Out
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{art.title}</h3>
                        <p className="text-sm text-muted-foreground">by {art.artist}</p>
                      </div>
                      <Badge variant="outline">{art.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{art.description}</p>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{art.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{art.reviews} reviews</span>
                      <span className="text-xs text-muted-foreground">{art.dimensions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">{art.origin}</span>
                        <span className="text-xs text-muted-foreground">Ships in {art.shippingTime}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{art.price} {art.currency}</span>
                        <Button 
                          size="sm" 
                          onClick={() => handlePurchase(art)}
                          disabled={!art.inStock}
                        >
                          {art.inStock ? "Buy Now" : "Sold Out"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">No handmade pieces found matching your criteria</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setFilterCategory("all"); setFilterAvailability("all") }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      {selectedArt && (
        <DirectPurchaseModal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          product={{
            id: selectedArt.id,
            title: selectedArt.title,
            artist: selectedArt.artist,
            price: selectedArt.price,
            currency: selectedArt.currency,
            image: selectedArt.image,
            category: selectedArt.category
          }}
        />
      )}
    </div>
  )
}