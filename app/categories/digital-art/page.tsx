'use client';

import { Heart, Star, ShoppingCart, Filter, Grid, List, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function DigitalArtPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);

  const digitalArtItems = [
    {
      id: 1,
      title: "Abstract Digital Painting",
      artist: "Priya Sharma",
      price: "0.025 XRP",
      rating: 4.8,
      reviews: 156,
      image: "/abstract-preview-1.jpg",
      category: "Abstract",
      featured: true
    },
    {
      id: 2,
      title: "Cyberpunk City Landscape",
      artist: "Arjun Patel",
      price: "0.033 XRP",
      rating: 4.9,
      reviews: 203,
      image: "/cyber-preview-1.jpg",
      category: "Landscape",
      featured: true
    },
    {
      id: 3,
      title: "Minimalist Portrait",
      artist: "Sneha Gupta",
      price: "0.019 XRP",
      rating: 4.7,
      reviews: 89,
      image: "/abstract-preview-2.jpg",
      category: "Portrait",
      featured: false
    },
    {
      id: 4,
      title: "Fantasy Dragon Art",
      artist: "Vikram Singh",
      price: "0.042 XRP",
      rating: 4.9,
      reviews: 312,
      image: "/cyber-preview-2.jpg",
      category: "Fantasy",
      featured: true
    },
    {
      id: 5,
      title: "Digital Mandala",
      artist: "Kavya Reddy",
      price: "0.028 XRP",
      rating: 4.6,
      reviews: 145,
      image: "/abstract-preview-3.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 6,
      title: "Futuristic Robot",
      artist: "Rohit Kumar",
      price: "0.036 XRP",
      rating: 4.8,
      reviews: 198,
      image: "/cyber-preview-3.jpg",
      category: "Sci-Fi",
      featured: true
    },
    {
      id: 7,
      title: "Tech Future Vision",
      artist: "Zara Ahmed",
      price: "0.009 XRP",
      rating: 4.9,
      reviews: 112,
      image: "/cyber-preview-4.jpg",
      category: "Sci-Fi",
      featured: false
    },
    {
      id: 8,
      title: "Golden Hour Dreams",
      artist: "Ryan Foster",
      price: "0.011 XRP",
      rating: 4.7,
      reviews: 145,
      image: "/abstract-preview-4.jpg",
      category: "Landscape",
      featured: false
    },
    {
      id: 9,
      title: "Crystal Cave Mystery",
      artist: "Aria Singh",
      price: "0.014 XRP",
      rating: 4.8,
      reviews: 67,
      image: "/cyber-preview-5.jpg",
      category: "Fantasy",
      featured: true
    },
    {
      id: 10,
      title: "Mint Fresh Vibes",
      artist: "Leo Zhang",
      price: "0.004 XRP",
      rating: 4.6,
      reviews: 98,
      image: "/abstract-preview-1.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 11,
      title: "Cherry Blossom Digital",
      artist: "Emma Brown",
      price: "0.022 XRP",
      rating: 4.8,
      reviews: 134,
      image: "/cyber-preview-6.jpg",
      category: "Nature",
      featured: true
    },
    {
      id: 12,
      title: "Neon Dreams",
      artist: "Alex Chen",
      price: "0.031 XRP",
      rating: 4.7,
      reviews: 176,
      image: "/abstract-preview-2.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 13,
      title: "Digital Ocean Waves",
      artist: "Maya Patel",
      price: "0.018 XRP",
      rating: 4.9,
      reviews: 223,
      image: "/cyber-preview-1.jpg",
      category: "Landscape",
      featured: true
    },
    {
      id: 14,
      title: "Space Explorer",
      artist: "David Kim",
      price: "0.045 XRP",
      rating: 4.8,
      reviews: 189,
      image: "/abstract-preview-3.jpg",
      category: "Sci-Fi",
      featured: false
    },
    {
      id: 15,
      title: "Mystic Forest",
      artist: "Luna Rodriguez",
      price: "0.027 XRP",
      rating: 4.6,
      reviews: 156,
      image: "/cyber-preview-2.jpg",
      category: "Fantasy",
      featured: true
    },
    {
      id: 16,
      title: "Digital Butterfly",
      artist: "Sophie Wilson",
      price: "0.013 XRP",
      rating: 4.7,
      reviews: 98,
      image: "/abstract-preview-4.jpg",
      category: "Nature",
      featured: false
    },
    {
      id: 17,
      title: "Cosmic Energy",
      artist: "Raj Sharma",
      price: "0.039 XRP",
      rating: 4.9,
      reviews: 267,
      image: "/cyber-preview-3.jpg",
      category: "Abstract",
      featured: true
    },
    {
      id: 18,
      title: "Digital Sunset",
      artist: "Nina Johansson",
      price: "0.021 XRP",
      rating: 4.8,
      reviews: 145,
      image: "/abstract-preview-1.jpg",
      category: "Landscape",
      featured: false
    },
    {
      id: 19,
      title: "Pixel Art Master",
      artist: "Carlos Martinez",
      price: "0.016 XRP",
      rating: 4.7,
      reviews: 123,
      image: "/cyber-preview-4.jpg",
      category: "Pixel Art",
      featured: true
    },
    {
      id: 20,
      title: "Digital Phoenix",
      artist: "Yuki Tanaka",
      price: "0.034 XRP",
      rating: 4.9,
      reviews: 198,
      image: "/abstract-preview-2.jpg",
      category: "Fantasy",
      featured: false
    },
    {
      id: 21,
      title: "Cyber Samurai",
      artist: "Kenji Nakamura",
      price: "0.041 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/cyber-preview-5.jpg",
      category: "Sci-Fi",
      featured: true
    },
    {
      id: 22,
      title: "Digital Zen Garden",
      artist: "Mei Lin",
      price: "0.024 XRP",
      rating: 4.6,
      reviews: 167,
      image: "/abstract-preview-3.jpg",
      category: "Nature",
      featured: false
    },
    {
      id: 23,
      title: "Holographic Dreams",
      artist: "Ivan Petrov",
      price: "0.037 XRP",
      rating: 4.9,
      reviews: 289,
      image: "/cyber-preview-6.jpg",
      category: "Abstract",
      featured: true
    },
    {
      id: 24,
      title: "Digital Storm",
      artist: "Elena Volkov",
      price: "0.029 XRP",
      rating: 4.7,
      reviews: 156,
      image: "/abstract-preview-4.jpg",
      category: "Landscape",
      featured: false
    },
    {
      id: 25,
      title: "Quantum Particles",
      artist: "Dr. Sarah Chen",
      price: "0.043 XRP",
      rating: 4.8,
      reviews: 201,
      image: "/cyber-preview-1.jpg",
      category: "Sci-Fi",
      featured: true
    },
    {
      id: 26,
      title: "Digital Kaleidoscope",
      artist: "Marco Rossi",
      price: "0.017 XRP",
      rating: 4.6,
      reviews: 134,
      image: "/abstract-preview-1.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 27,
      title: "Virtual Reality Portal",
      artist: "Anna Schmidt",
      price: "0.035 XRP",
      rating: 4.9,
      reviews: 245,
      image: "/cyber-preview-2.jpg",
      category: "Sci-Fi",
      featured: true
    },
    {
      id: 28,
      title: "Digital Waterfall",
      artist: "Tom Anderson",
      price: "0.026 XRP",
      rating: 4.7,
      reviews: 178,
      image: "/abstract-preview-2.jpg",
      category: "Landscape",
      featured: false
    },
    {
      id: 29,
      title: "Neon Tiger",
      artist: "Lisa Park",
      price: "0.038 XRP",
      rating: 4.8,
      reviews: 212,
      image: "/cyber-preview-3.jpg",
      category: "Fantasy",
      featured: true
    },
    {
      id: 30,
      title: "Digital Constellation",
      artist: "James Wright",
      price: "0.032 XRP",
      rating: 4.6,
      reviews: 189,
      image: "/abstract-preview-3.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 31,
      title: "Cyber Lotus",
      artist: "Sakura Yamamoto",
      price: "0.023 XRP",
      rating: 4.9,
      reviews: 167,
      image: "/cyber-preview-4.jpg",
      category: "Nature",
      featured: true
    },
    {
      id: 32,
      title: "Digital Prism",
      artist: "Robert Johnson",
      price: "0.019 XRP",
      rating: 4.7,
      reviews: 145,
      image: "/abstract-preview-4.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 33,
      title: "Hologram City",
      artist: "Maria Garcia",
      price: "0.044 XRP",
      rating: 4.8,
      reviews: 223,
      image: "/cyber-preview-5.jpg",
      category: "Sci-Fi",
      featured: true
    },
    {
      id: 34,
      title: "Digital Aurora",
      artist: "Erik Larsson",
      price: "0.031 XRP",
      rating: 4.6,
      reviews: 156,
      image: "/abstract-preview-1.jpg",
      category: "Landscape",
      featured: false
    },
    {
      id: 35,
      title: "Pixel Dragon",
      artist: "Kim Min-jun",
      price: "0.027 XRP",
      rating: 4.9,
      reviews: 198,
      image: "/cyber-preview-6.jpg",
      category: "Fantasy",
      featured: true
    },
    {
      id: 36,
      title: "Digital Nebula",
      artist: "Claire Thompson",
      price: "0.036 XRP",
      rating: 4.7,
      reviews: 167,
      image: "/abstract-preview-2.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 37,
      title: "Cyber Garden",
      artist: "Hiroshi Sato",
      price: "0.025 XRP",
      rating: 4.8,
      reviews: 189,
      image: "/cyber-preview-1.jpg",
      category: "Nature",
      featured: true
    },
    {
      id: 38,
      title: "Digital Vortex",
      artist: "Amanda Davis",
      price: "0.033 XRP",
      rating: 4.6,
      reviews: 134,
      image: "/abstract-preview-3.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 39,
      title: "Neon Butterfly",
      artist: "Pablo Hernandez",
      price: "0.021 XRP",
      rating: 4.9,
      reviews: 212,
      image: "/cyber-preview-2.jpg",
      category: "Nature",
      featured: true
    },
    {
      id: 40,
      title: "Digital Matrix",
      artist: "Olga Petrov",
      price: "0.039 XRP",
      rating: 4.7,
      reviews: 178,
      image: "/abstract-preview-4.jpg",
      category: "Sci-Fi",
      featured: false
    },
    {
      id: 41,
      title: "Cyber Phoenix",
      artist: "Zhang Wei",
      price: "0.042 XRP",
      rating: 4.8,
      reviews: 245,
      image: "/cyber-preview-3.jpg",
      category: "Fantasy",
      featured: true
    },
    {
      id: 42,
      title: "Digital Harmony",
      artist: "Isabella Martinez",
      price: "0.028 XRP",
      rating: 4.6,
      reviews: 156,
      image: "/abstract-preview-1.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 43,
      title: "Holographic Fish",
      artist: "Takeshi Yamada",
      price: "0.024 XRP",
      rating: 4.9,
      reviews: 189,
      image: "/cyber-preview-4.jpg",
      category: "Nature",
      featured: true
    },
    {
      id: 44,
      title: "Digital Spiral",
      artist: "Sophie Dubois",
      price: "0.030 XRP",
      rating: 4.7,
      reviews: 167,
      image: "/abstract-preview-2.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 45,
      title: "Cyber Whale",
      artist: "Marcus Johnson",
      price: "0.037 XRP",
      rating: 4.8,
      reviews: 223,
      image: "/cyber-preview-5.jpg",
      category: "Fantasy",
      featured: true
    },
    {
      id: 46,
      title: "Digital Fractal",
      artist: "Natasha Volkov",
      price: "0.026 XRP",
      rating: 4.6,
      reviews: 145,
      image: "/abstract-preview-3.jpg",
      category: "Abstract",
      featured: false
    },
    {
      id: 47,
      title: "Neon Forest",
      artist: "Carlos Silva",
      price: "0.034 XRP",
      rating: 4.9,
      reviews: 198,
      image: "/cyber-preview-6.jpg",
      category: "Nature",
      featured: true
    },
    {
      id: 48,
      title: "Digital Eclipse",
      artist: "Emma Wilson",
      price: "0.029 XRP",
      rating: 4.7,
      reviews: 178,
      image: "/abstract-preview-4.jpg",
      category: "Landscape",
      featured: false
    },
    {
      id: 49,
      title: "Cyber Crystal",
      artist: "Dmitri Kozlov",
      price: "0.041 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/cyber-preview-1.jpg",
      category: "Fantasy",
      featured: true
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-bg-secondary)' }}>
      {/* Enhanced Header */}
      <div className="relative overflow-hidden" style={{ background: 'var(--brand-gradient-primary)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Digital Art Collection
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover stunning digital artworks from talented artists worldwide. Pay with XRP for instant access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search digital art..."
                  className="pl-10 pr-4 py-3 w-80 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none"
                />
              </div>
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium" style={{ color: 'var(--brand-text-secondary)' }}>
              {digitalArtItems.length} artworks found
            </span>
            <div className="flex gap-2">
              {['All', 'Abstract', 'Landscape', 'Fantasy', 'Sci-Fi', 'Nature'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm rounded-full border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: category === 'All' ? 'var(--brand-primary)' : 'transparent',
                    color: category === 'All' ? 'white' : 'var(--brand-text-secondary)',
                    borderColor: 'var(--brand-primary)'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                style={{
                  borderColor: 'var(--brand-gray-300)'
                }}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: 'var(--brand-gray-300)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid - 7 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
          {digitalArtItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              style={{ backgroundColor: 'var(--brand-bg-card)' }}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-1 text-xs font-bold text-white rounded-full" style={{ backgroundColor: 'var(--brand-accent)' }}>
                    Featured
                  </span>
                </div>
              )}
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--brand-gradient-cool)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-400/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full" style={{ background: 'var(--brand-gradient-primary)' }}></div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <Heart className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2" style={{ color: 'var(--brand-text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'var(--brand-text-tertiary)' }}>
                    by {item.artist}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{item.rating}</span>
                    <span className="text-xs" style={{ color: 'var(--brand-text-tertiary)' }}>({item.reviews})</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ 
                    backgroundColor: 'var(--brand-primary-50)', 
                    color: 'var(--brand-primary)' 
                  }}>
                    {item.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg" style={{ color: 'var(--brand-primary)' }}>
                    {item.price}
                  </span>
                  <button className="px-3 py-1.5 text-xs font-medium text-white rounded-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--brand-primary)' }}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-16">
        <button className="px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg" style={{ background: 'var(--brand-gradient-primary)' }}>
          Load More Artworks
        </button>
      </div>
    </div>
  );
}