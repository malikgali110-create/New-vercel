'use client';

import { Heart, Star, ShoppingCart, Filter, Grid, List, Search, SlidersHorizontal, Truck, Award } from 'lucide-react';
import { useState } from 'react';

export default function PrintProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);

  const printItems = [
    {
      id: 1,
      title: "Canvas Print - Mountain Landscape",
      artist: "Rajesh Mehta",
      price: "0.019 XRP",
      rating: 4.7,
      reviews: 124,
      image: "/placeholder.jpg",
      category: "Canvas",
      featured: true,
      delivery: "3-5 days"
    },
    {
      id: 2,
      title: "Framed Poster - Abstract Art",
      artist: "Anita Desai",
      price: "0.023 XRP",
      rating: 4.8,
      reviews: 189,
      image: "/abstract-preview-1.jpg",
      category: "Poster",
      featured: true,
      delivery: "2-4 days"
    },
    {
      id: 3,
      title: "Metal Print - City Skyline",
      artist: "Karan Johar",
      price: "0.035 XRP",
      rating: 4.9,
      reviews: 267,
      image: "/cyber-preview-1.jpg",
      category: "Metal",
      featured: true,
      delivery: "5-7 days"
    },
    {
      id: 4,
      title: "Acrylic Print - Floral Design",
      artist: "Meera Nair",
      price: "0.028 XRP",
      rating: 4.6,
      reviews: 156,
      image: "/abstract-preview-2.jpg",
      category: "Acrylic",
      featured: false,
      delivery: "4-6 days"
    },
    {
      id: 5,
      title: "Wood Print - Vintage Car",
      artist: "Suresh Kumar",
      price: "0.042 XRP",
      rating: 4.8,
      reviews: 203,
      image: "/vintage-art-poster.jpg",
      category: "Wood",
      featured: true,
      delivery: "6-8 days"
    },
    {
      id: 6,
      title: "Photo Print - Wildlife",
      artist: "Deepika Singh",
      price: "0.016 XRP",
      rating: 4.7,
      reviews: 98,
      image: "/placeholder.jpg",
      category: "Photo",
      featured: false,
      delivery: "2-3 days"
    },
    {
      id: 7,
      title: "Canvas Print - Ocean Waves",
      artist: "Arjun Kapoor",
      price: "0.012 XRP",
      rating: 4.9,
      reviews: 234,
      image: "/cyber-preview-2.jpg",
      category: "Canvas",
      featured: true,
      delivery: "3-5 days"
    },
    {
      id: 8,
      title: "Poster - Space Galaxy",
      artist: "Priya Sharma",
      price: "0.004 XRP",
      rating: 4.7,
      reviews: 167,
      image: "/abstract-preview-3.jpg",
      category: "Poster",
      featured: false,
      delivery: "1-2 days"
    },
    {
      id: 9,
      title: "Metal Print - Architecture",
      artist: "Vikram Singh",
      price: "0.015 XRP",
      rating: 4.8,
      reviews: 189,
      image: "/cyber-preview-3.jpg",
      category: "Metal",
      featured: true,
      delivery: "5-7 days"
    },
    {
      id: 10,
      title: "Acrylic Print - Portrait",
      artist: "Kavya Patel",
      price: "0.018 XRP",
      rating: 4.6,
      reviews: 145,
      image: "/abstract-preview-4.jpg",
      category: "Acrylic",
      featured: false,
      delivery: "4-6 days"
    },
    {
      id: 11,
      title: "Wood Print - Geometric",
      artist: "Rohit Gupta",
      price: "0.031 XRP",
      rating: 4.9,
      reviews: 178,
      image: "/cyber-preview-4.jpg",
      category: "Wood",
      featured: true,
      delivery: "6-8 days"
    },
    {
      id: 12,
      title: "Canvas Print - Sunset",
      artist: "Maya Singh",
      price: "0.021 XRP",
      rating: 4.7,
      reviews: 156,
      image: "/cyber-preview-5.jpg",
      category: "Canvas",
      featured: false,
      delivery: "3-5 days"
    },
    {
      id: 13,
      title: "Photo Print - Street Art",
      artist: "Alex Chen",
      price: "0.008 XRP",
      rating: 4.8,
      reviews: 134,
      image: "/abstract-preview-1.jpg",
      category: "Photo",
      featured: true,
      delivery: "2-3 days"
    },
    {
      id: 14,
      title: "Metal Print - Modern Art",
      artist: "Lisa Park",
      price: "0.039 XRP",
      rating: 4.6,
      reviews: 198,
      image: "/cyber-preview-6.jpg",
      category: "Metal",
      featured: false,
      delivery: "5-7 days"
    },
    {
      id: 15,
      title: "Poster - Minimalist Design",
      artist: "David Kim",
      price: "0.006 XRP",
      rating: 4.9,
      reviews: 223,
      image: "/abstract-preview-2.jpg",
      category: "Poster",
      featured: true,
      delivery: "1-2 days"
    },
    {
      id: 16,
      title: "Acrylic Print - Nature Scene",
      artist: "Emma Wilson",
      price: "0.025 XRP",
      rating: 4.7,
      reviews: 167,
      image: "/cyber-preview-1.jpg",
      category: "Acrylic",
      featured: false,
      delivery: "4-6 days"
    },
    {
      id: 17,
      title: "Wood Print - Rustic Charm",
      artist: "Carlos Silva",
      price: "0.033 XRP",
      rating: 4.8,
      reviews: 189,
      image: "/abstract-preview-3.jpg",
      category: "Wood",
      featured: true,
      delivery: "6-8 days"
    },
    {
      id: 18,
      title: "Canvas Print - Urban Life",
      artist: "Sophie Dubois",
      price: "0.017 XRP",
      rating: 4.6,
      reviews: 145,
      image: "/cyber-preview-2.jpg",
      category: "Canvas",
      featured: false,
      delivery: "3-5 days"
    },
    {
      id: 19,
      title: "Photo Print - Macro Photography",
      artist: "Yuki Tanaka",
      price: "0.011 XRP",
      rating: 4.9,
      reviews: 212,
      image: "/abstract-preview-4.jpg",
      category: "Photo",
      featured: true,
      delivery: "2-3 days"
    },
    {
      id: 20,
      title: "Metal Print - Industrial Design",
      artist: "Marcus Johnson",
      price: "0.041 XRP",
      rating: 4.7,
      reviews: 178,
      image: "/cyber-preview-3.jpg",
      category: "Metal",
      featured: false,
      delivery: "5-7 days"
    },
    {
      id: 21,
      title: "Poster - Typography Art",
      artist: "Nina Rodriguez",
      price: "0.007 XRP",
      rating: 4.8,
      reviews: 156,
      image: "/cyber-preview-4.jpg",
      category: "Poster",
      featured: true,
      delivery: "1-2 days"
    },
    {
      id: 22,
      title: "Acrylic Print - Digital Fusion",
      artist: "James Wright",
      price: "0.029 XRP",
      rating: 4.6,
      reviews: 134,
      image: "/abstract-preview-1.jpg",
      category: "Acrylic",
      featured: false,
      delivery: "4-6 days"
    },
    {
      id: 23,
      title: "Wood Print - Botanical Art",
      artist: "Isabella Martinez",
      price: "0.036 XRP",
      rating: 4.9,
      reviews: 245,
      image: "/cyber-preview-5.jpg",
      category: "Wood",
      featured: true,
      delivery: "6-8 days"
    },
    {
      id: 24,
      title: "Canvas Print - Abstract Waves",
      artist: "Tom Anderson",
      price: "0.022 XRP",
      rating: 4.7,
      reviews: 189,
      image: "/abstract-preview-2.jpg",
      category: "Canvas",
      featured: false,
      delivery: "3-5 days"
    },
    {
      id: 25,
      title: "Photo Print - Landscape Beauty",
      artist: "Anna Schmidt",
      price: "0.013 XRP",
      rating: 4.8,
      reviews: 167,
      image: "/cyber-preview-6.jpg",
      category: "Photo",
      featured: true,
      delivery: "2-3 days"
    },
    {
      id: 26,
      title: "Metal Print - Futuristic Vision",
      artist: "Kenji Nakamura",
      price: "0.044 XRP",
      rating: 4.6,
      reviews: 198,
      image: "/abstract-preview-3.jpg",
      category: "Metal",
      featured: false,
      delivery: "5-7 days"
    },
    {
      id: 27,
      title: "Poster - Retro Style",
      artist: "Maria Garcia",
      price: "0.009 XRP",
      rating: 4.9,
      reviews: 223,
      image: "/cyber-preview-1.jpg",
      category: "Poster",
      featured: true,
      delivery: "1-2 days"
    },
    {
      id: 28,
      title: "Acrylic Print - Color Burst",
      artist: "Erik Larsson",
      price: "0.027 XRP",
      rating: 4.7,
      reviews: 145,
      image: "/abstract-preview-4.jpg",
      category: "Acrylic",
      featured: false,
      delivery: "4-6 days"
    },
    {
      id: 29,
      title: "Wood Print - Vintage Map",
      artist: "Claire Thompson",
      price: "0.038 XRP",
      rating: 4.8,
      reviews: 212,
      image: "/cyber-preview-2.jpg",
      category: "Wood",
      featured: true,
      delivery: "6-8 days"
    },
    {
      id: 30,
      title: "Canvas Print - Dreamy Clouds",
      artist: "Pablo Hernandez",
      price: "0.024 XRP",
      rating: 4.6,
      reviews: 178,
      image: "/abstract-preview-1.jpg",
      category: "Canvas",
      featured: false,
      delivery: "3-5 days"
    },
    {
      id: 31,
      title: "Photo Print - City Lights",
      artist: "Sakura Yamamoto",
      price: "0.014 XRP",
      rating: 4.9,
      reviews: 189,
      image: "/cyber-preview-3.jpg",
      category: "Photo",
      featured: true,
      delivery: "2-3 days"
    },
    {
      id: 32,
      title: "Metal Print - Geometric Patterns",
      artist: "Robert Johnson",
      price: "0.046 XRP",
      rating: 4.7,
      reviews: 156,
      image: "/cyber-preview-4.jpg",
      category: "Metal",
      featured: false,
      delivery: "5-7 days"
    },
    {
      id: 33,
      title: "Poster - Inspirational Quote",
      artist: "Amanda Davis",
      price: "0.005 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/abstract-preview-2.jpg",
      category: "Poster",
      featured: true,
      delivery: "1-2 days"
    },
    {
      id: 34,
      title: "Acrylic Print - Ocean Depths",
      artist: "Hiroshi Sato",
      price: "0.030 XRP",
      rating: 4.6,
      reviews: 167,
      image: "/cyber-preview-5.jpg",
      category: "Acrylic",
      featured: false,
      delivery: "4-6 days"
    },
    {
      id: 35,
      title: "Wood Print - Forest Path",
      artist: "Olga Petrov",
      price: "0.040 XRP",
      rating: 4.9,
      reviews: 198,
      image: "/abstract-preview-3.jpg",
      category: "Wood",
      featured: true,
      delivery: "6-8 days"
    },
    {
      id: 36,
      title: "Canvas Print - Artistic Expression",
      artist: "Zhang Wei",
      price: "0.026 XRP",
      rating: 4.7,
      reviews: 145,
      image: "/cyber-preview-6.jpg",
      category: "Canvas",
      featured: false,
      delivery: "3-5 days"
    },
    {
      id: 37,
      title: "Photo Print - Wildlife Close-up",
      artist: "Natasha Volkov",
      price: "0.016 XRP",
      rating: 4.8,
      reviews: 212,
      image: "/abstract-preview-4.jpg",
      category: "Photo",
      featured: true,
      delivery: "2-3 days"
    },
    {
      id: 38,
      title: "Metal Print - Tech Innovation",
      artist: "Dmitri Kozlov",
      price: "0.048 XRP",
      rating: 4.6,
      reviews: 178,
      image: "/cyber-preview-1.jpg",
      category: "Metal",
      featured: false,
      delivery: "5-7 days"
    },
    {
      id: 39,
      title: "Poster - Modern Minimalism",
      artist: "Kim Min-jun",
      price: "0.008 XRP",
      rating: 4.9,
      reviews: 189,
      image: "/abstract-preview-1.jpg",
      category: "Poster",
      featured: true,
      delivery: "1-2 days"
    },
    {
      id: 40,
      title: "Acrylic Print - Vibrant Energy",
      artist: "Takeshi Yamada",
      price: "0.032 XRP",
      rating: 4.7,
      reviews: 156,
      image: "/cyber-preview-2.jpg",
      category: "Acrylic",
      featured: false,
      delivery: "4-6 days"
    },
    {
      id: 41,
      title: "Wood Print - Artisan Craft",
      artist: "Sophie Wilson",
      price: "0.042 XRP",
      rating: 4.8,
      reviews: 223,
      image: "/abstract-preview-2.jpg",
      category: "Wood",
      featured: true,
      delivery: "6-8 days"
    },
    {
      id: 42,
      title: "Canvas Print - Emotional Journey",
      artist: "Marcus Thompson",
      price: "0.028 XRP",
      rating: 4.6,
      reviews: 167,
      image: "/cyber-preview-3.jpg",
      category: "Canvas",
      featured: false,
      delivery: "3-5 days"
    },
    {
      id: 43,
      title: "Photo Print - Architectural Wonder",
      artist: "Elena Rodriguez",
      price: "0.018 XRP",
      rating: 4.9,
      reviews: 198,
      image: "/abstract-preview-3.jpg",
      category: "Photo",
      featured: true,
      delivery: "2-3 days"
    },
    {
      id: 44,
      title: "Metal Print - Space Exploration",
      artist: "Ivan Petrov",
      price: "0.050 XRP",
      rating: 4.7,
      reviews: 145,
      image: "/cyber-preview-4.jpg",
      category: "Metal",
      featured: false,
      delivery: "5-7 days"
    },
    {
      id: 45,
      title: "Poster - Creative Vision",
      artist: "Luna Martinez",
      price: "0.010 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/abstract-preview-4.jpg",
      category: "Poster",
      featured: true,
      delivery: "1-2 days"
    },
    {
      id: 46,
      title: "Acrylic Print - Harmony Balance",
      artist: "Carlos Rodriguez",
      price: "0.034 XRP",
      rating: 4.6,
      reviews: 178,
      image: "/cyber-preview-5.jpg",
      category: "Acrylic",
      featured: false,
      delivery: "4-6 days"
    },
    {
      id: 47,
      title: "Wood Print - Heritage Design",
      artist: "Maya Patel",
      price: "0.044 XRP",
      rating: 4.9,
      reviews: 212,
      image: "/cyber-preview-6.jpg",
      category: "Wood",
      featured: true,
      delivery: "6-8 days"
    },
    {
      id: 48,
      title: "Canvas Print - Serene Moments",
      artist: "Alex Johnson",
      price: "0.030 XRP",
      rating: 4.7,
      reviews: 189,
      image: "/abstract-preview-1.jpg",
      category: "Canvas",
      featured: false,
      delivery: "3-5 days"
    },
    {
      id: 49,
      title: "Photo Print - Perfect Capture",
      artist: "Lisa Chen",
      price: "0.020 XRP",
      rating: 4.8,
      reviews: 156,
      image: "/cyber-preview-1.jpg",
      category: "Photo",
      featured: true,
      delivery: "2-3 days"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-bg-secondary)' }}>
      {/* Enhanced Header */}
      <div className="relative overflow-hidden" style={{ background: 'var(--brand-gradient-secondary)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Print Products Collection
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Transform your favorite digital art into beautiful physical prints. Canvas, Metal, Wood & More!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search print products..."
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
            
            {/* Features Bar */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-white/90">
                <Truck className="w-5 h-5" />
                <span className="text-sm font-medium">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium">4.8+ Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium" style={{ color: 'var(--brand-text-secondary)' }}>
              {printItems.length} products found
            </span>
            <div className="flex gap-2">
              {['All', 'Canvas', 'Metal', 'Wood', 'Acrylic', 'Photo', 'Poster'].map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm rounded-full border transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: category === 'All' ? 'var(--brand-accent)' : 'transparent',
                    color: category === 'All' ? 'white' : 'var(--brand-text-secondary)',
                    borderColor: 'var(--brand-accent)'
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
                className="px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none focus:ring-brand-accent focus:border-brand-accent"
                style={{
                  borderColor: 'var(--brand-gray-300)'
                }}
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="delivery">Fastest Delivery</option>
            </select>
            
            <div className="flex border rounded-lg overflow-hidden" style={{ borderColor: 'var(--brand-gray-300)' }}>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' ? 'text-white' : 'hover:bg-gray-100'
                }`}
                style={{ backgroundColor: viewMode === 'grid' ? 'var(--brand-accent)' : 'transparent' }}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' ? 'text-white' : 'hover:bg-gray-100'
                }`}
                style={{ backgroundColor: viewMode === 'list' ? 'var(--brand-accent)' : 'transparent' }}
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
          {printItems.map((item) => (
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
              
              {/* Delivery Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: 'var(--brand-success)' }}>
                  {item.delivery}
                </span>
              </div>
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--brand-gradient-warm)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-pink-500/20 to-red-400/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-lg" style={{ background: 'var(--brand-gradient-secondary)' }}></div>
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
                    backgroundColor: 'var(--brand-accent-50)', 
                    color: 'var(--brand-accent)' 
                  }}>
                    {item.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg" style={{ color: 'var(--brand-accent)' }}>
                    {item.price}
                  </span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--brand-success)' }}>
                    <Truck className="w-3 h-3" />
                    <span>{item.delivery}</span>
                  </div>
                </div>
                
                <button className="w-full py-2 text-xs font-medium text-white rounded-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--brand-accent)' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-16">
        <button className="px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg" style={{ background: 'var(--brand-gradient-secondary)' }}>
          Load More Products
        </button>
      </div>
    </div>
  );
}