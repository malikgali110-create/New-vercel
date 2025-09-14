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

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
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
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" className="bg-white/90 text-black hover:bg-white">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/90 text-black hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={addToCart}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isFeatured && (
            <Badge className="bg-accent text-accent-foreground">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {product.isNFT && <Badge className="bg-primary text-primary-foreground">NFT</Badge>}
        </div>

        {/* Price */}
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-0">
            {product.price} {product.currency}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground">by {product.artist}</p>

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

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90" onClick={addToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
