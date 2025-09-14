"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, Eye, Bookmark, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Star, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ArtPiece {
  id: string
  title: string
  artist: string
  price: number
  category: string
  image: string
  likes: number
  views: number
  isLiked: boolean
  isBookmarked: boolean
  tags: string[]
}

const artPieces: ArtPiece[] = [
  {
    id: "1",
    title: "Abstract Watercolor Dreams",
    artist: "Sarah Chen",
    price: 120,
    category: "Digital",
    image: "/abstract-watercolor-painting.jpg",
    likes: 234,
    views: 1567,
    isLiked: false,
    isBookmarked: false,
    tags: ["Abstract", "Watercolor", "Digital"],
  },
  {
    id: "2",
    title: "Classical Portrait Study",
    artist: "Marcus Rivera",
    price: 220,
    category: "Physical",
    image: "/oil-painting-portrait.jpg",
    likes: 189,
    views: 892,
    isLiked: true,
    isBookmarked: false,
    tags: ["Portrait", "Classical", "Oil"],
  },
  {
    id: "3",
    title: "Handcrafted Ceramic Vase",
    artist: "Elena Pottery",
    price: 140,
    category: "Handmade",
    image: "/handmade-ceramic-vase.jpg",
    likes: 156,
    views: 743,
    isLiked: false,
    isBookmarked: true,
    tags: ["Ceramic", "Handmade", "Vase"],
  },
  {
    id: "4",
    title: "Modern Calligraphy Art",
    artist: "Ink Master",
    price: 400,
    category: "Handmade",
    image: "/calligraphy-art-piece.jpg",
    likes: 298,
    views: 1234,
    isLiked: false,
    isBookmarked: false,
    tags: ["Calligraphy", "Modern", "Ink"],
  },
]

export function InteractiveArtGallery() {
  const [pieces, setPieces] = useState<ArtPiece[]>(artPieces)
  const [selectedPiece, setSelectedPiece] = useState<ArtPiece | null>(null)
  const [isAutoplay, setIsAutoplay] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  // Auto-rotate gallery
  useEffect(() => {
    if (isAutoplay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % pieces.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isAutoplay, pieces.length])

  const toggleLike = (id: string) => {
    setPieces((prev) =>
      prev.map((piece) =>
        piece.id === id
          ? { ...piece, isLiked: !piece.isLiked, likes: piece.isLiked ? piece.likes - 1 : piece.likes + 1 }
          : piece,
      ),
    )
  }

  const toggleBookmark = (id: string) => {
    setPieces((prev) =>
      prev.map((piece) => (piece.id === id ? { ...piece, isBookmarked: !piece.isBookmarked } : piece)),
    )
  }

  const incrementViews = (id: string) => {
    setPieces((prev) => prev.map((piece) => (piece.id === id ? { ...piece, views: piece.views + 1 } : piece)))
  }

  const openLightbox = (piece: ArtPiece) => {
    setSelectedPiece(piece)
    incrementViews(piece.id)
    setZoom(1)
    setRotation(0)
  }

  const closeLightbox = () => {
    setSelectedPiece(null)
  }

  return (
    <div className="space-y-8">
      {/* Gallery Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant={isAutoplay ? "default" : "outline"}
            size="sm"
            onClick={() => setIsAutoplay(!isAutoplay)}
            className="rounded-full"
          >
            {isAutoplay ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isAutoplay ? "Pause" : "Auto Play"}
          </Button>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} of {pieces.length}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="rounded-full"
          >
            ←
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentIndex(Math.min(pieces.length - 1, currentIndex + 1))}
            disabled={currentIndex === pieces.length - 1}
            className="rounded-full"
          >
            →
          </Button>
        </div>
      </div>

      {/* Interactive Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pieces.map((piece, index) => (
          <Card
            key={piece.id}
            className={`group overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
              index === currentIndex ? "ring-2 ring-primary shadow-xl scale-105" : ""
            }`}
            onClick={() => openLightbox(piece)}
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={piece.image || "/placeholder.svg"}
                alt={piece.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay with animations */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Interactive buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(piece.id)
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${piece.isLiked ? "fill-red-500 text-red-500" : "text-white"} transition-colors duration-200`}
                  />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleBookmark(piece.id)
                  }}
                >
                  <Bookmark
                    className={`h-4 w-4 ${piece.isBookmarked ? "fill-yellow-500 text-yellow-500" : "text-white"} transition-colors duration-200`}
                  />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <Share2 className="h-4 w-4 text-white" />
                </Button>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <Badge
                  className={`
                  ${piece.category === "Digital" ? "bg-primary" : ""}
                  ${piece.category === "Physical" ? "bg-accent" : ""}
                  ${piece.category === "Handmade" ? "bg-chart-3" : ""}
                  text-white rounded-full px-3 py-1 text-xs font-medium
                `}
                >
                  {piece.category}
                </Badge>
              </div>

              {/* Stats overlay */}
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <h3 className="font-bold font-serif text-lg mb-1">{piece.title}</h3>
                <p className="text-sm opacity-90 mb-2">by {piece.artist}</p>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {piece.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {piece.views}
                  </div>
                </div>
              </div>

              {/* Price tag */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-bold text-foreground">{piece.price} XRP</span>
                </div>
              </div>
            </div>

            {/* Quick actions bar */}
            <div className="p-4 bg-card/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {piece.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPiece && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="relative max-w-4xl w-full max-h-full">
            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 rounded-full text-white"
              onClick={closeLightbox}
            >
              ×
            </Button>

            {/* Image controls */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 hover:bg-white/30 rounded-full text-white"
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 hover:bg-white/30 rounded-full text-white"
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/20 hover:bg-white/30 rounded-full text-white"
                onClick={() => setRotation(rotation + 90)}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Main image */}
            <div className="relative h-96 md:h-[600px] overflow-hidden rounded-2xl">
              <Image
                src={selectedPiece.image || "/placeholder.svg"}
                alt={selectedPiece.title}
                fill
                className="object-contain transition-transform duration-300"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                }}
              />
            </div>

            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold font-serif text-lg text-foreground">{selectedPiece.title}</h3>
                  <p className="text-muted-foreground">by {selectedPiece.artist}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {selectedPiece.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {selectedPiece.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      4.8
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-foreground font-serif">{selectedPiece.price} XRP</div>
                  <Button className="mt-2 bg-primary hover:bg-primary/90 rounded-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
