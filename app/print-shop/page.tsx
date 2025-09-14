"use client"

import { useState } from "react"
import { DemoPopup } from "@/components/demo-popup"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Printer, ArrowLeft, Truck, Shield, Star, Eye, ShoppingCart, Search, Filter, X } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useHolder } from "@/contexts/holder-context"

// Import demo data
import demoData from "@/data/demo-products.json"

const printProducts = demoData.printProducts

const categories = [
  { id: "all", name: "All Products" },
  { id: "posters", name: "Posters" },
  { id: "canvas", name: "Canvas" },
  { id: "apparel", name: "Apparel" },
  { id: "accessories", name: "Accessories" }
]

const availableTags = [
  "Premium",
  "Eco-Friendly",
  "Limited Edition",
  "Bestseller",
  "Custom Size",
  "Fast Shipping",
  "Waterproof",
  "UV Resistant"
]

export default function PrintShopPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState("all")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { dispatch } = useCart()
  const { isHolder } = useHolder()

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSortBy("featured")
    setPriceRange("all")
    setSelectedTags([])
  }

  const addToCart = (product: any, selectedSize?: string, selectedMaterial?: string) => {
    const basePrice = product.priceXRP
    let finalPrice = basePrice
    
    // Apply size multiplier if selected
    if (selectedSize && product.sizes) {
      const sizeOption = product.sizes.find((s: any) => s.name === selectedSize)
      if (sizeOption) {
        finalPrice = basePrice * sizeOption.priceMultiplier
      }
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${selectedSize || 'default'}-${selectedMaterial || 'default'}`,
        title: product.title,
        artist: product.creator,
        price: finalPrice,
        priceUSD: finalPrice * 3, // XRP to USD conversion
        currency: "XRP",
        image: product.images[0],
        category: "Print",
        productType: "print",
        licenseType: "personal",
        printOptions: {
          size: selectedSize || product.sizes?.[0]?.name || "Standard",
          material: selectedMaterial || "Premium Paper"
        }
      },
    })
  }

  // Filter and sort products
  const filteredProducts = printProducts
    .filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.creator.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory
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

      return matchesSearch && matchesCategory && matchesTags && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceXRP - b.priceXRP
        case "price-high":
          return b.priceXRP - a.priceXRP
        case "rating":
          return b.rating - a.rating
        case "newest":
          return b.id.localeCompare(a.id)
        default:
          return 0 // featured - keep original order
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
                <Printer className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Print Shop</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isHolder && (
                <Badge className="bg-gold/10 text-gold border-gold/20">
                  <Star className="h-3 w-3 mr-1" />
                  50% Off Prints
                </Badge>
              )}
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {filteredProducts.length} products
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Premium Print Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Transform digital art into physical masterpieces. Premium quality prints with worldwide shipping.
          </p>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Truck className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Worldwide Delivery</h3>
                  <p className="text-sm text-muted-foreground">Fast & secure shipping</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">Museum-grade materials</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Star className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Satisfaction Guarantee</h3>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-4 p-4 bg-card rounded-lg border mb-8">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search print products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4">
            {/* Category */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-50">$0 - $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="500+">$500+</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button variant="outline" onClick={handleClearFilters} className="gap-2 bg-transparent">
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <PrintProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Printer className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">No products found matching your criteria.</p>
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

function PrintProductCard({ product, onAddToCart }: { product: any; onAddToCart: (product: any, size?: string, material?: string) => void }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.name || "")
  const [selectedMaterial, setSelectedMaterial] = useState("Premium Paper")
  const { isHolder } = useHolder()

  const calculatePrice = () => {
    let basePrice = product.priceXRP
    if (selectedSize && product.sizes) {
      const sizeOption = product.sizes.find((s: any) => s.name === selectedSize)
      if (sizeOption) {
        basePrice = product.priceXRP * sizeOption.priceMultiplier
      }
    }
    return isHolder ? basePrice * 0.5 : basePrice // 50% off for holders
  }

  const finalPrice = calculatePrice()
  const originalPrice = product.priceXRP * (product.sizes?.find((s: any) => s.name === selectedSize)?.priceMultiplier || 1)

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 hover:scale-[1.02] bg-gradient-to-br from-white via-slate-50/50 to-gray-50/50 hover:from-white hover:via-purple-50/30 hover:to-pink-50/30 relative">
      {/* Animated Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg blur-sm" />
      
      <div className="relative aspect-square overflow-hidden">
        {/* Loading Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
        />

        {/* Enhanced Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
          <Link href={`/print-shop/${product.id}`}>
            <Button size="sm" variant="secondary" className="bg-gradient-to-r from-white/95 to-slate-50/95 hover:from-white hover:to-slate-50 text-slate-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 group/btn">
              <Eye className="h-4 w-4 group-hover/btn:text-blue-600 transition-colors duration-200" />
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">Quick View</span>
            </Button>
          </Link>
          <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 group/btn" onClick={() => onAddToCart(product, selectedSize, selectedMaterial)}>
            <ShoppingCart className="h-4 w-4 group-hover/btn:text-white transition-colors duration-200" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">Add to Cart</span>
          </Button>
        </div>

        {/* Enhanced Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.badges.map((badge: string) => (
            <Badge key={badge} className={`
              transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl
              ${badge === 'NEW' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse' : ''}
              ${badge === 'BESTSELLER' ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white hover:animate-bounce' : ''}
              ${badge === 'LIMITED' ? 'bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white animate-pulse' : ''}
              ${badge === 'PREMIUM' ? 'bg-gradient-to-r from-yellow-400 via-gold to-amber-400 text-black hover:rotate-1' : ''}
            `}>
              {badge === 'NEW' && <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />}
              {badge === 'BESTSELLER' && <div className="w-2 h-2 bg-white rounded-full mr-1 animate-bounce" />}
              {badge === 'LIMITED' && <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />}
              {badge === 'PREMIUM' && <div className="w-2 h-2 bg-black rounded-full mr-1 animate-pulse" />}
              {badge}
            </Badge>
          ))}
          {isHolder && (
            <Badge className="bg-gradient-to-r from-yellow-400 via-gold to-amber-400 text-black animate-pulse hover:animate-bounce transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-lg">
              <div className="w-2 h-2 bg-black rounded-full mr-1 animate-pulse" />
              50% OFF
            </Badge>
          )}
        </div>

        {/* Enhanced Price Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="flex flex-col items-end gap-2">
            {isHolder && (
              <Badge variant="secondary" className="bg-gradient-to-r from-red-500/30 to-pink-500/30 text-red-400 border border-red-300/50 line-through text-xs backdrop-blur-sm hover:scale-105 transition-transform duration-200">
                {originalPrice.toFixed(1)} XRP
              </Badge>
            )}
            <Badge variant="secondary" className="bg-gradient-to-r from-slate-800 to-slate-900 text-white border-0 shadow-lg backdrop-blur-sm font-bold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-extrabold">
                {finalPrice.toFixed(1)} XRP
              </span>
            </Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {product.creator}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Size:</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size: any) => (
                    <SelectItem key={size.name} value={size.name}>
                      {size.name} {size.dimensions && `(${size.dimensions})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Material Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Material:</label>
            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Premium Paper">Premium Paper</SelectItem>
                <SelectItem value="Canvas">Canvas</SelectItem>
                <SelectItem value="Metal">Metal Print</SelectItem>
                <SelectItem value="Acrylic">Acrylic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <div className="p-4 pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] transform hover:-translate-y-1" 
          onClick={() => onAddToCart(product, selectedSize, selectedMaterial)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart • ${(finalPrice * 3).toFixed(0)}
          {isHolder && <span className="ml-2 text-xs bg-yellow-400/20 px-2 py-1 rounded-full text-yellow-300 animate-pulse">(50% off!)</span>}
        </Button>
      </div>
    </Card>
  )
}