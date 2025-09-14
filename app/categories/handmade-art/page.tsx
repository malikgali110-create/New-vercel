'use client';

import { Heart, Star, ShoppingCart, Filter, Grid, List, Search, SlidersHorizontal, Palette, Brush, Award, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function HandmadeArtPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);

  const handmadeItems = [
    {
      id: 1,
      title: "Watercolor Sunset Dreams",
      artist: "Sarah Mitchell",
      price: "0.125 XRP",
      rating: 4.9,
      reviews: 234,
      image: "/watercolor-1.jpg",
      category: "Watercolor",
      featured: true,
      medium: "Watercolor on Paper",
      size: "16x20 inches"
    },
    {
      id: 2,
      title: "Abstract Oil Expression",
      artist: "Michael Chen",
      price: "0.089 XRP",
      rating: 4.8,
      reviews: 189,
      image: "/oil-painting-1.jpg",
      category: "Oil Painting",
      featured: false,
      medium: "Oil on Canvas",
      size: "24x30 inches"
    },
    {
      id: 3,
      title: "Charcoal Portrait Study",
      artist: "Emma Rodriguez",
      price: "0.067 XRP",
      rating: 4.9,
      reviews: 312,
      image: "/charcoal-1.jpg",
      category: "Charcoal",
      featured: true,
      medium: "Charcoal on Paper",
      size: "18x24 inches"
    },
    {
      id: 4,
      title: "Acrylic Landscape Vista",
      artist: "David Thompson",
      price: "0.098 XRP",
      rating: 4.7,
      reviews: 167,
      image: "/acrylic-1.jpg",
      category: "Acrylic",
      featured: false,
      medium: "Acrylic on Canvas",
      size: "20x24 inches"
    },
    {
      id: 5,
      title: "Pastel Floral Bouquet",
      artist: "Lisa Wang",
      price: "0.076 XRP",
      rating: 4.8,
      reviews: 245,
      image: "/pastel-1.jpg",
      category: "Pastel",
      featured: true,
      medium: "Soft Pastel",
      size: "16x20 inches"
    },
    {
      id: 6,
      title: "Ink Wash Mountain",
      artist: "Hiroshi Tanaka",
      price: "0.054 XRP",
      rating: 4.9,
      reviews: 298,
      image: "/ink-1.jpg",
      category: "Ink",
      featured: false,
      medium: "Ink on Rice Paper",
      size: "14x18 inches"
    },
    {
      id: 7,
      title: "Mixed Media Collage",
      artist: "Anna Kowalski",
      price: "0.112 XRP",
      rating: 4.8,
      reviews: 223,
      image: "/mixed-media-1.jpg",
      category: "Mixed Media",
      featured: true,
      medium: "Mixed Media",
      size: "22x28 inches"
    },
    {
      id: 8,
      title: "Gouache Still Life",
      artist: "Pierre Dubois",
      price: "0.083 XRP",
      rating: 4.7,
      reviews: 178,
      image: "/gouache-1.jpg",
      category: "Gouache",
      featured: false,
      medium: "Gouache on Paper",
      size: "12x16 inches"
    },
    {
      id: 9,
      title: "Pencil Architectural Study",
      artist: "Robert Kim",
      price: "0.045 XRP",
      rating: 4.6,
      reviews: 134,
      image: "/pencil-1.jpg",
      category: "Pencil",
      featured: false,
      medium: "Graphite Pencil",
      size: "11x14 inches"
    },
    {
      id: 10,
      title: "Watercolor Botanical",
      artist: "Maria Santos",
      price: "0.091 XRP",
      rating: 4.9,
      reviews: 267,
      image: "/watercolor-2.jpg",
      category: "Watercolor",
      featured: true,
      medium: "Watercolor on Paper",
      size: "15x20 inches"
    },
    {
      id: 11,
      title: "Oil Portrait Classic",
      artist: "Giovanni Rossi",
      price: "0.156 XRP",
      rating: 4.9,
      reviews: 389,
      image: "/oil-painting-2.jpg",
      category: "Oil Painting",
      featured: true,
      medium: "Oil on Canvas",
      size: "18x24 inches"
    },
    {
      id: 12,
      title: "Charcoal Animal Study",
      artist: "Sophie Laurent",
      price: "0.072 XRP",
      rating: 4.8,
      reviews: 198,
      image: "/charcoal-2.jpg",
      category: "Charcoal",
      featured: false,
      medium: "Charcoal on Paper",
      size: "16x20 inches"
    },
    {
      id: 13,
      title: "Acrylic Abstract Flow",
      artist: "Carlos Mendez",
      price: "0.104 XRP",
      rating: 4.7,
      reviews: 156,
      image: "/acrylic-2.jpg",
      category: "Acrylic",
      featured: false,
      medium: "Acrylic on Canvas",
      size: "24x36 inches"
    },
    {
      id: 14,
      title: "Pastel Seascape",
      artist: "Elena Petrov",
      price: "0.087 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/pastel-2.jpg",
      category: "Pastel",
      featured: true,
      medium: "Oil Pastel",
      size: "20x24 inches"
    },
    {
      id: 15,
      title: "Ink Calligraphy Art",
      artist: "Zhang Wei",
      price: "0.063 XRP",
      rating: 4.9,
      reviews: 312,
      image: "/ink-2.jpg",
      category: "Ink",
      featured: false,
      medium: "Ink on Silk",
      size: "12x18 inches"
    },
    {
      id: 16,
      title: "Mixed Media Portrait",
      artist: "Rachel Green",
      price: "0.134 XRP",
      rating: 4.8,
      reviews: 278,
      image: "/mixed-media-2.jpg",
      category: "Mixed Media",
      featured: true,
      medium: "Mixed Media",
      size: "20x26 inches"
    },
    {
      id: 17,
      title: "Gouache Landscape",
      artist: "Ahmed Hassan",
      price: "0.079 XRP",
      rating: 4.7,
      reviews: 189,
      image: "/gouache-2.jpg",
      category: "Gouache",
      featured: false,
      medium: "Gouache on Paper",
      size: "14x20 inches"
    },
    {
      id: 18,
      title: "Pencil Nature Study",
      artist: "Jennifer Lee",
      price: "0.051 XRP",
      rating: 4.6,
      reviews: 145,
      image: "/pencil-2.jpg",
      category: "Pencil",
      featured: false,
      medium: "Colored Pencil",
      size: "9x12 inches"
    },
    {
      id: 19,
      title: "Watercolor City Scene",
      artist: "Thomas Anderson",
      price: "0.108 XRP",
      rating: 4.8,
      reviews: 256,
      image: "/watercolor-3.jpg",
      category: "Watercolor",
      featured: true,
      medium: "Watercolor on Paper",
      size: "18x24 inches"
    },
    {
      id: 20,
      title: "Oil Still Life",
      artist: "Isabella Martinez",
      price: "0.142 XRP",
      rating: 4.9,
      reviews: 334,
      image: "/oil-painting-3.jpg",
      category: "Oil Painting",
      featured: true,
      medium: "Oil on Canvas",
      size: "16x20 inches"
    },
    {
      id: 21,
      title: "Charcoal Figure Drawing",
      artist: "Marcus Johnson",
      price: "0.068 XRP",
      rating: 4.7,
      reviews: 167,
      image: "/charcoal-3.jpg",
      category: "Charcoal",
      featured: false,
      medium: "Charcoal on Paper",
      size: "18x24 inches"
    },
    {
      id: 22,
      title: "Acrylic Floral Garden",
      artist: "Yuki Nakamura",
      price: "0.095 XRP",
      rating: 4.8,
      reviews: 223,
      image: "/acrylic-3.jpg",
      category: "Acrylic",
      featured: false,
      medium: "Acrylic on Canvas",
      size: "20x30 inches"
    },
    {
      id: 23,
      title: "Pastel Animal Portrait",
      artist: "Olivia Brown",
      price: "0.081 XRP",
      rating: 4.9,
      reviews: 289,
      image: "/pastel-3.jpg",
      category: "Pastel",
      featured: true,
      medium: "Soft Pastel",
      size: "16x20 inches"
    },
    {
      id: 24,
      title: "Ink Abstract Expression",
      artist: "Liu Ming",
      price: "0.057 XRP",
      rating: 4.6,
      reviews: 178,
      image: "/ink-3.jpg",
      category: "Ink",
      featured: false,
      medium: "Ink on Paper",
      size: "14x18 inches"
    },
    {
      id: 25,
      title: "Mixed Media Texture",
      artist: "Victoria Smith",
      price: "0.118 XRP",
      rating: 4.8,
      reviews: 245,
      image: "/mixed-media-3.jpg",
      category: "Mixed Media",
      featured: true,
      medium: "Mixed Media",
      size: "24x30 inches"
    },
    {
      id: 26,
      title: "Gouache Portrait Study",
      artist: "François Moreau",
      price: "0.086 XRP",
      rating: 4.7,
      reviews: 198,
      image: "/gouache-3.jpg",
      category: "Gouache",
      featured: false,
      medium: "Gouache on Paper",
      size: "12x16 inches"
    },
    {
      id: 27,
      title: "Pencil Realistic Eye",
      artist: "Alex Turner",
      price: "0.048 XRP",
      rating: 4.8,
      reviews: 167,
      image: "/pencil-3.jpg",
      category: "Pencil",
      featured: false,
      medium: "Graphite Pencil",
      size: "8x10 inches"
    },
    {
      id: 28,
      title: "Watercolor Abstract",
      artist: "Nina Petersen",
      price: "0.102 XRP",
      rating: 4.9,
      reviews: 312,
      image: "/watercolor-4.jpg",
      category: "Watercolor",
      featured: true,
      medium: "Watercolor on Paper",
      size: "16x22 inches"
    },
    {
      id: 29,
      title: "Oil Impressionist Scene",
      artist: "Henri Dubois",
      price: "0.167 XRP",
      rating: 4.9,
      reviews: 423,
      image: "/oil-painting-4.jpg",
      category: "Oil Painting",
      featured: true,
      medium: "Oil on Canvas",
      size: "22x28 inches"
    },
    {
      id: 30,
      title: "Charcoal Landscape",
      artist: "Diana Wilson",
      price: "0.074 XRP",
      rating: 4.7,
      reviews: 189,
      image: "/charcoal-4.jpg",
      category: "Charcoal",
      featured: false,
      medium: "Charcoal on Paper",
      size: "16x24 inches"
    },
    {
      id: 31,
      title: "Acrylic Modern Art",
      artist: "Kevin Park",
      price: "0.089 XRP",
      rating: 4.6,
      reviews: 156,
      image: "/acrylic-4.jpg",
      category: "Acrylic",
      featured: false,
      medium: "Acrylic on Canvas",
      size: "18x24 inches"
    },
    {
      id: 32,
      title: "Pastel Sky Study",
      artist: "Sophia Garcia",
      price: "0.078 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/pastel-4.jpg",
      category: "Pastel",
      featured: true,
      medium: "Oil Pastel",
      size: "14x20 inches"
    },
    {
      id: 33,
      title: "Ink Minimalist Art",
      artist: "Kenji Sato",
      price: "0.061 XRP",
      rating: 4.7,
      reviews: 178,
      image: "/ink-4.jpg",
      category: "Ink",
      featured: false,
      medium: "Ink on Paper",
      size: "10x14 inches"
    },
    {
      id: 34,
      title: "Mixed Media Collage 2",
      artist: "Laura Thompson",
      price: "0.125 XRP",
      rating: 4.8,
      reviews: 267,
      image: "/mixed-media-4.jpg",
      category: "Mixed Media",
      featured: true,
      medium: "Mixed Media",
      size: "20x24 inches"
    },
    {
      id: 35,
      title: "Gouache Floral Study",
      artist: "Marco Rossi",
      price: "0.084 XRP",
      rating: 4.6,
      reviews: 145,
      image: "/gouache-4.jpg",
      category: "Gouache",
      featured: false,
      medium: "Gouache on Paper",
      size: "12x18 inches"
    },
    {
      id: 36,
      title: "Pencil Portrait Master",
      artist: "Catherine Lee",
      price: "0.053 XRP",
      rating: 4.9,
      reviews: 298,
      image: "/pencil-4.jpg",
      category: "Pencil",
      featured: false,
      medium: "Graphite Pencil",
      size: "11x14 inches"
    },
    {
      id: 37,
      title: "Watercolor Ocean Waves",
      artist: "James Mitchell",
      price: "0.115 XRP",
      rating: 4.8,
      reviews: 256,
      image: "/watercolor-5.jpg",
      category: "Watercolor",
      featured: true,
      medium: "Watercolor on Paper",
      size: "18x26 inches"
    },
    {
      id: 38,
      title: "Oil Classical Study",
      artist: "Antonio Silva",
      price: "0.178 XRP",
      rating: 4.9,
      reviews: 445,
      image: "/oil-painting-5.jpg",
      category: "Oil Painting",
      featured: true,
      medium: "Oil on Canvas",
      size: "24x32 inches"
    },
    {
      id: 39,
      title: "Charcoal Urban Scene",
      artist: "Maya Patel",
      price: "0.071 XRP",
      rating: 4.7,
      reviews: 189,
      image: "/charcoal-5.jpg",
      category: "Charcoal",
      featured: false,
      medium: "Charcoal on Paper",
      size: "16x20 inches"
    },
    {
      id: 40,
      title: "Acrylic Color Burst",
      artist: "Ryan O'Connor",
      price: "0.093 XRP",
      rating: 4.8,
      reviews: 223,
      image: "/acrylic-5.jpg",
      category: "Acrylic",
      featured: false,
      medium: "Acrylic on Canvas",
      size: "20x24 inches"
    },
    {
      id: 41,
      title: "Pastel Dreamy Landscape",
      artist: "Chloe Anderson",
      price: "0.082 XRP",
      rating: 4.9,
      reviews: 278,
      image: "/pastel-5.jpg",
      category: "Pastel",
      featured: true,
      medium: "Soft Pastel",
      size: "16x24 inches"
    },
    {
      id: 42,
      title: "Ink Traditional Art",
      artist: "Takeshi Yamamoto",
      price: "0.065 XRP",
      rating: 4.8,
      reviews: 198,
      image: "/ink-5.jpg",
      category: "Ink",
      featured: false,
      medium: "Ink on Rice Paper",
      size: "12x16 inches"
    },
    {
      id: 43,
      title: "Mixed Media Fantasy",
      artist: "Zoe Williams",
      price: "0.139 XRP",
      rating: 4.9,
      reviews: 334,
      image: "/mixed-media-5.jpg",
      category: "Mixed Media",
      featured: true,
      medium: "Mixed Media",
      size: "22x30 inches"
    },
    {
      id: 44,
      title: "Gouache Nature Scene",
      artist: "Luca Bianchi",
      price: "0.087 XRP",
      rating: 4.7,
      reviews: 167,
      image: "/gouache-5.jpg",
      category: "Gouache",
      featured: false,
      medium: "Gouache on Paper",
      size: "14x18 inches"
    },
    {
      id: 45,
      title: "Pencil Detailed Study",
      artist: "Grace Kim",
      price: "0.056 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/pencil-5.jpg",
      category: "Pencil",
      featured: false,
      medium: "Colored Pencil",
      size: "9x12 inches"
    },
    {
      id: 46,
      title: "Watercolor Masterpiece",
      artist: "Vincent Clarke",
      price: "0.198 XRP",
      rating: 4.9,
      reviews: 512,
      image: "/watercolor-6.jpg",
      category: "Watercolor",
      featured: true,
      medium: "Watercolor on Paper",
      size: "20x30 inches"
    },
    {
      id: 47,
      title: "Oil Contemporary Art",
      artist: "Natasha Volkov",
      price: "0.156 XRP",
      rating: 4.8,
      reviews: 389,
      image: "/oil-painting-6.jpg",
      category: "Oil Painting",
      featured: true,
      medium: "Oil on Canvas",
      size: "18x26 inches"
    },
    {
      id: 48,
      title: "Charcoal Expressive Art",
      artist: "Samuel Davis",
      price: "0.076 XRP",
      rating: 4.7,
      reviews: 198,
      image: "/charcoal-6.jpg",
      category: "Charcoal",
      featured: false,
      medium: "Charcoal on Paper",
      size: "16x22 inches"
    },
    {
      id: 49,
      title: "Acrylic Final Creation",
      artist: "Isabella Chen",
      price: "0.145 XRP",
      rating: 4.9,
      reviews: 456,
      image: "/acrylic-6.jpg",
      category: "Acrylic",
      featured: true,
      medium: "Acrylic on Canvas",
      size: "24x36 inches"
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-bg-secondary)' }}>
      {/* Enhanced Header */}
      <div className="relative overflow-hidden" style={{ background: 'var(--brand-gradient-primary)' }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Handmade Art Collection
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover authentic handcrafted artworks from talented artists worldwide. Each piece tells a unique story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search handmade artworks..."
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
                <Palette className="w-5 h-5" />
                <span className="text-sm font-medium">Authentic Art</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Brush className="w-5 h-5" />
                <span className="text-sm font-medium">Handcrafted</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium">Unique Pieces</span>
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
              {handmadeItems.length} artworks available
            </span>
            <div className="flex gap-2">
              {['All', 'Watercolor', 'Oil Painting', 'Charcoal', 'Acrylic', 'Pastel', 'Mixed Media'].map((category) => (
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
              <option value="newest">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="medium">By Medium</option>
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

      {/* Art Grid - 7 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
          {handmadeItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              style={{ backgroundColor: 'var(--brand-bg-card)' }}
            >
              {/* Featured Badge */}
              {item.featured && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-white rounded-full" style={{ backgroundColor: 'var(--brand-accent)' }}>
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </div>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 text-xs font-bold text-white rounded-full" style={{ backgroundColor: 'var(--brand-secondary)' }}>
                  {item.category}
                </span>
              </div>
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--brand-gradient-accent)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-400/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-lg" style={{ background: 'var(--brand-gradient-primary)' }}></div>
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
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{item.rating}</span>
                    <span className="text-xs" style={{ color: 'var(--brand-text-tertiary)' }}>({item.reviews})</span>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--brand-text-tertiary)' }}>
                    {item.size}
                  </span>
                </div>
                
                <div className="mb-2">
                  <p className="text-xs" style={{ color: 'var(--brand-text-secondary)' }}>
                    {item.medium}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg" style={{ color: 'var(--brand-accent)' }}>
                    {item.price}
                  </span>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--brand-secondary)' }}>
                    <Palette className="w-3 h-3" />
                    <span>XRP</span>
                  </div>
                </div>
                
                <button className="w-full py-2 text-xs font-medium text-white rounded-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--brand-accent)' }}>
                  Purchase Art
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-16">
        <button className="px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg" style={{ background: 'var(--brand-gradient-primary)' }}>
          Explore More Artworks
        </button>
      </div>
    </div>
  );
}