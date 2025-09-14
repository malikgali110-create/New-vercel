"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  title: string
  artist: string
  price: number
  currency: string
  image: string
  category: string
  tags: string[]
  rating: number
  isNFT?: boolean
  isFeatured?: boolean
}

interface ProductGridProps {
  products: Product[]
  columns?: number
}

export function ProductGrid({ products, columns = 5 }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns as keyof typeof gridCols]}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        artist: product.artist,
        price: product.price,
        currency: product.currency,
        image: product.image,
        category: product.category,
        isNFT: product.isNFT,
      },
    })
  }

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 hover:scale-[1.02] bg-gradient-to-br from-white via-slate-50/50 to-gray-50/50 hover:from-white hover:via-purple-50/30 hover:to-pink-50/30 relative">
      {/* Animated Border Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-lg blur-sm" />
      
      <div className="relative aspect-square overflow-hidden">
        {/* Loading Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 group-hover:brightness-110"
        />

        {/* Enhanced Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
          <Button size="sm" variant="secondary" className="bg-gradient-to-r from-white/95 to-slate-50/95 hover:from-white hover:to-slate-50 text-slate-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 group/btn">
            <Eye className="h-4 w-4 group-hover/btn:text-blue-600 transition-colors duration-200" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">Quick View</span>
          </Button>
          <Button size="sm" variant="secondary" className="bg-gradient-to-r from-white/95 to-slate-50/95 hover:from-white hover:to-slate-50 text-slate-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 group/btn">
            <Heart className="h-4 w-4 group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-all duration-200" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">Add to Wishlist</span>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 group/btn" onClick={addToCart}>
            <ShoppingCart className="h-4 w-4 group-hover/btn:text-white transition-colors duration-200" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap">Add to Cart</span>
          </Button>
        </div>

        {/* Enhanced Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isFeatured && (
            <Badge className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white shadow-lg animate-pulse hover:animate-bounce transition-all duration-300 transform hover:scale-110">
              <Star className="h-3 w-3 mr-1 fill-white animate-spin" style={{animationDuration: '3s'}} />
              Featured
            </Badge>
          )}
          {product.isNFT && (
            <Badge className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-1">
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
              NFT
            </Badge>
          )}
        </div>

        {/* Enhanced Price Badge */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="bg-gradient-to-r from-slate-800 to-slate-900 text-white border-0 shadow-lg backdrop-blur-sm font-bold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-extrabold">
              {product.price} {product.currency}
            </span>
          </Badge>
        </div>

        {/* Enhanced Quick Info on Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-10">
          <div className="bg-gradient-to-r from-white/95 to-slate-50/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/20">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
                <span className="font-semibold text-slate-800">{product.category}</span>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 animate-pulse" />
                <span className="font-bold text-yellow-700">{product.rating}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-slate-600 font-medium">by {product.artist}</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Enhanced Product Info Box */}
        <div className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100">
          <h3 className="font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors text-lg">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground font-medium">by {product.artist}</p>
        </div>

        {/* Detailed Rating Section */}
        <div className="flex items-center justify-between bg-yellow-50 p-2 rounded-lg">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-colors ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-gray-700">({product.rating}/5)</span>
        </div>

        {/* Enhanced Tags Section */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Tags</p>
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs hover:bg-primary hover:text-white transition-colors cursor-pointer">
                {tag}
              </Badge>
            ))}
            {product.tags.length > 3 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{product.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* New: Product Details Box */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="font-semibold text-blue-800">Type:</span>
              <p className="text-blue-600">{product.isNFT ? 'Digital NFT' : 'Digital Art'}</p>
            </div>
            <div>
              <span className="font-semibold text-blue-800">Category:</span>
              <p className="text-blue-600">{product.category}</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]" onClick={addToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
