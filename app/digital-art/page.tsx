"use client"

import { useState } from "react"
import { DemoPopup } from "@/components/demo-popup"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, Download, Heart, Share2, Grid3X3, List } from "lucide-react"
import Link from "next/link"
import { DirectPurchaseModal } from "@/components/direct-purchase-modal"

interface DigitalArt {
  id: string
  title: string
  artist: string
  price: number
  currency: string
  image: string
  category: string
  tags: string[]
  rating: number
  downloads: number
  description: string
  resolution: string
  fileFormat: string[]
  license: string
}

const digitalArtworks: DigitalArt[] = [
  {
    id: "abstract-dreams-001",
    title: "Abstract Dreams",
    artist: "Sarah Chen",
    price: 0.025,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Abstract",
    tags: ["abstract", "colorful", "modern", "digital painting"],
    rating: 4.8,
    downloads: 1247,
    description: "A vibrant abstract composition exploring the intersection of dreams and reality through bold colors and flowing forms.",
    resolution: "4096x4096",
    fileFormat: ["PNG", "JPG", "SVG"],
    license: "Commercial Use"
  },
  {
    id: "sunset-landscape-002",
    title: "Sunset Landscape",
    artist: "Alex Rivera",
    price: 0.035,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Landscape",
    tags: ["landscape", "sunset", "nature", "peaceful"],
    rating: 4.7,
    downloads: 892,
    description: "A serene landscape capturing the golden hour with warm tones and dramatic lighting.",
    resolution: "3840x2160",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "cyberpunk-city-003",
    title: "Cyberpunk City",
    artist: "Mike Johnson",
    price: 0.045,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Sci-Fi",
    tags: ["cyberpunk", "futuristic", "neon", "city"],
    rating: 4.9,
    downloads: 1534,
    description: "A futuristic cityscape with neon lights and cyberpunk aesthetics.",
    resolution: "5120x2880",
    fileFormat: ["PNG", "JPG", "PSD"],
    license: "Extended Commercial"
  },
  {
    id: "minimalist-portrait-004",
    title: "Minimalist Portrait",
    artist: "Emma Wilson",
    price: 0.030,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Portrait",
    tags: ["minimalist", "portrait", "clean", "modern"],
    rating: 4.6,
    downloads: 678,
    description: "A clean, minimalist approach to portrait art with subtle details and elegant composition.",
    resolution: "2048x2048",
    fileFormat: ["PNG", "SVG"],
    license: "Personal Use"
  },
  {
    id: "fantasy-dragon-005",
    title: "Fantasy Dragon",
    artist: "David Kim",
    price: 0.050,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Fantasy",
    tags: ["fantasy", "dragon", "mythical", "epic"],
    rating: 4.9,
    downloads: 2156,
    description: "An epic fantasy dragon illustration with intricate details and magical elements.",
    resolution: "4096x4096",
    fileFormat: ["PNG", "JPG", "PSD"],
    license: "Extended Commercial"
  },
  {
    id: "geometric-pattern-006",
    title: "Geometric Pattern",
    artist: "Lisa Park",
    price: 0.020,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Pattern",
    tags: ["geometric", "pattern", "symmetry", "modern"],
    rating: 4.5,
    downloads: 834,
    description: "A sophisticated geometric pattern perfect for backgrounds and design elements.",
    resolution: "3000x3000",
    fileFormat: ["PNG", "SVG", "AI"],
    license: "Commercial Use"
  },
  {
    id: "watercolor-flowers-007",
    title: "Watercolor Flowers",
    artist: "Maria Garcia",
    price: 0.028,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Nature",
    tags: ["watercolor", "flowers", "botanical", "delicate"],
    rating: 4.7,
    downloads: 1123,
    description: "Delicate watercolor flower illustrations with soft, flowing brushstrokes.",
    resolution: "2500x2500",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "space-nebula-008",
    title: "Space Nebula",
    artist: "Chris Taylor",
    price: 0.040,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Space",
    tags: ["space", "nebula", "cosmic", "astronomy"],
    rating: 4.8,
    downloads: 1456,
    description: "A stunning cosmic nebula with vibrant colors and stellar formations.",
    resolution: "5000x3000",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "vintage-poster-009",
    title: "Vintage Poster",
    artist: "Robert Brown",
    price: 0.022,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Vintage",
    tags: ["vintage", "retro", "poster", "classic"],
    rating: 4.6,
    downloads: 987,
    description: "A classic vintage poster design with retro typography and colors.",
    resolution: "2400x3600",
    fileFormat: ["PNG", "JPG", "AI"],
    license: "Commercial Use"
  },
  {
    id: "mandala-art-010",
    title: "Sacred Mandala",
    artist: "Priya Sharma",
    price: 0.032,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Spiritual",
    tags: ["mandala", "spiritual", "meditation", "sacred"],
    rating: 4.9,
    downloads: 1678,
    description: "An intricate mandala design perfect for meditation and spiritual practices.",
    resolution: "4000x4000",
    fileFormat: ["PNG", "SVG", "AI"],
    license: "Commercial Use"
  },
  {
    id: "neon-cityscape-011",
    title: "Neon Cityscape",
    artist: "Jake Miller",
    price: 0.038,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Urban",
    tags: ["neon", "city", "night", "urban"],
    rating: 4.7,
    downloads: 1234,
    description: "A vibrant neon cityscape with glowing lights and urban atmosphere.",
    resolution: "3840x2160",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "botanical-illustration-012",
    title: "Botanical Study",
    artist: "Sophie Green",
    price: 0.026,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Nature",
    tags: ["botanical", "plants", "scientific", "detailed"],
    rating: 4.8,
    downloads: 892,
    description: "Detailed botanical illustrations in vintage scientific style.",
    resolution: "3000x4000",
    fileFormat: ["PNG", "JPG", "SVG"],
    license: "Commercial Use"
  },
  {
    id: "abstract-fluid-013",
    title: "Fluid Dynamics",
    artist: "Alex Chen",
    price: 0.034,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Abstract",
    tags: ["fluid", "abstract", "dynamic", "colorful"],
    rating: 4.6,
    downloads: 1567,
    description: "Dynamic fluid art with flowing colors and organic shapes.",
    resolution: "4096x4096",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "geometric-patterns-006",
    title: "Geometric Patterns",
    artist: "Lisa Park",
    price: 0.020,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Abstract",
    tags: ["geometric", "patterns", "symmetry", "modern"],
    rating: 4.4,
    downloads: 543,
    description: "Mesmerizing geometric patterns with perfect symmetry and vibrant colors.",
    resolution: "4000x4000",
    fileFormat: ["PNG", "SVG", "AI"],
    license: "Commercial Use"
  },
  {
    id: "ocean-waves-014",
    title: "Ocean Waves",
    artist: "Marina Blue",
    price: 0.029,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Nature",
    tags: ["ocean", "waves", "water", "peaceful"],
    rating: 4.7,
    downloads: 1245,
    description: "Serene ocean waves with realistic water movement and foam details.",
    resolution: "3840x2160",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "mountain-landscape-015",
    title: "Mountain Vista",
    artist: "Peak Studios",
    price: 0.042,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Landscape",
    tags: ["mountain", "landscape", "nature", "scenic"],
    rating: 4.8,
    downloads: 1567,
    description: "Majestic mountain landscape with dramatic lighting and atmospheric perspective.",
    resolution: "5120x2880",
    fileFormat: ["PNG", "JPG", "TIFF"],
    license: "Extended Commercial"
  },
  {
    id: "galaxy-spiral-016",
    title: "Spiral Galaxy",
    artist: "Cosmos Art",
    price: 0.048,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Space",
    tags: ["galaxy", "space", "stars", "cosmic"],
    rating: 4.9,
    downloads: 2134,
    description: "Stunning spiral galaxy with vibrant colors and stellar formations.",
    resolution: "4096x4096",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "tropical-sunset-017",
    title: "Tropical Sunset",
    artist: "Island Dreams",
    price: 0.033,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Landscape",
    tags: ["tropical", "sunset", "palm", "beach"],
    rating: 4.6,
    downloads: 987,
    description: "Beautiful tropical sunset with palm trees and golden hour lighting.",
    resolution: "3840x2160",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "crystal-formation-018",
    title: "Crystal Formation",
    artist: "Gem Studio",
    price: 0.037,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Abstract",
    tags: ["crystal", "geometric", "mineral", "prismatic"],
    rating: 4.7,
    downloads: 1456,
    description: "Intricate crystal formations with prismatic light effects.",
    resolution: "4000x4000",
    fileFormat: ["PNG", "JPG", "PSD"],
    license: "Commercial Use"
  },
  {
    id: "forest-path-019",
    title: "Enchanted Forest",
    artist: "Nature's Way",
    price: 0.031,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Nature",
    tags: ["forest", "path", "trees", "mystical"],
    rating: 4.8,
    downloads: 1789,
    description: "Mystical forest path with dappled sunlight and ancient trees.",
    resolution: "3000x4000",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "urban-graffiti-020",
    title: "Street Art",
    artist: "Urban Canvas",
    price: 0.024,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Urban",
    tags: ["graffiti", "street", "urban", "colorful"],
    rating: 4.5,
    downloads: 876,
    description: "Vibrant street art with bold colors and urban energy.",
    resolution: "2880x3840",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "aurora-borealis-021",
    title: "Northern Lights",
    artist: "Arctic Vision",
    price: 0.045,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Nature",
    tags: ["aurora", "northern", "lights", "sky"],
    rating: 4.9,
    downloads: 2345,
    description: "Spectacular aurora borealis dancing across the night sky.",
    resolution: "5120x2880",
    fileFormat: ["PNG", "JPG"],
    license: "Extended Commercial"
  },
  {
    id: "japanese-garden-022",
    title: "Zen Garden",
    artist: "Harmony Arts",
    price: 0.036,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Nature",
    tags: ["zen", "garden", "japanese", "peaceful"],
    rating: 4.7,
    downloads: 1234,
    description: "Serene Japanese zen garden with cherry blossoms and stone paths.",
    resolution: "4000x3000",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "cyberpunk-neon-023",
    title: "Neon Dreams",
    artist: "Future Tech",
    price: 0.041,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Cyberpunk",
    tags: ["cyberpunk", "neon", "futuristic", "tech"],
    rating: 4.8,
    downloads: 1876,
    description: "Futuristic cyberpunk cityscape with glowing neon signs.",
    resolution: "3840x2160",
    fileFormat: ["PNG", "JPG", "PSD"],
    license: "Commercial Use"
  },
  {
    id: "desert-dunes-024",
    title: "Sahara Dunes",
    artist: "Desert Wind",
    price: 0.027,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Landscape",
    tags: ["desert", "dunes", "sand", "golden"],
    rating: 4.6,
    downloads: 987,
    description: "Golden sand dunes stretching endlessly under the desert sun.",
    resolution: "4096x2304",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  },
  {
    id: "underwater-coral-025",
    title: "Coral Reef",
    artist: "Ocean Deep",
    price: 0.039,
    currency: "XRP",
    image: "/placeholder.jpg",
    category: "Nature",
    tags: ["coral", "reef", "underwater", "marine"],
    rating: 4.8,
    downloads: 1567,
    description: "Vibrant coral reef teeming with colorful marine life.",
    resolution: "3840x2160",
    fileFormat: ["PNG", "JPG"],
    license: "Commercial Use"
  }
]

export default function DigitalArtPage() {
  const [selectedArt, setSelectedArt] = useState<DigitalArt | null>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredArtworks = digitalArtworks.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = filterCategory === "all" || art.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const handlePurchase = (art: DigitalArt) => {
    setSelectedArt(art)
    setShowPurchaseModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <DemoPopup />
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Digital Art Collection</h1>
            <p className="text-xl mb-8">Discover unique digital artworks from talented artists worldwide</p>
            <div className="flex gap-4 justify-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {digitalArtworks.length}+ Artworks
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Instant Download
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Commercial License
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
                placeholder="Search artworks, artists, or tags..."
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
              <SelectItem value="abstract">Abstract</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              <SelectItem value="fantasy">Fantasy</SelectItem>
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
            Showing {filteredArtworks.length} of {digitalArtworks.length} artworks
          </p>
        </div>

        {/* Artworks Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3" : "space-y-4"}>
          {/* Products Grid - 7x7 = 49 products */}
          {filteredArtworks.map((art) => (
            <Card key={art.id} className="overflow-hidden hover:shadow-lg transition-shadow group brand-card">
              {viewMode === "grid" ? (
                <>
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20" />
                    <Badge className="absolute top-2 left-2 bg-white/90 text-black">
                      {art.category}
                    </Badge>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{art.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{art.downloads} downloads</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">{art.price} {art.currency}</span>
                      <Button size="sm" onClick={() => handlePurchase(art)}>
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex p-4 gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{art.title}</h3>
                        <p className="text-sm text-muted-foreground">by {art.artist}</p>
                      </div>
                      <Badge variant="outline">{art.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{art.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{art.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{art.downloads} downloads</span>
                        <span className="text-xs text-muted-foreground">{art.resolution}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{art.price} {art.currency}</span>
                        <Button size="sm" onClick={() => handlePurchase(art)}>
                          Buy Now
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
            <p className="text-muted-foreground text-lg mb-4">No artworks found matching your criteria</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setFilterCategory("all") }}>
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-brand-primary hover:text-white transition-colors">
            Previous
          </button>
          <button className="px-3 py-2 rounded-lg bg-brand-primary text-white font-medium">1</button>
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-brand-primary hover:text-white transition-colors">2</button>
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-brand-primary hover:text-white transition-colors">3</button>
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-brand-primary hover:text-white transition-colors">
            Next
          </button>
        </div>
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
            category: selectedArt.category,
            type: "digital"
          }}
        />
      )}
    </div>
  )
}