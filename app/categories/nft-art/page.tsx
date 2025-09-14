'use client';

import { Heart, Star, ShoppingCart, Filter, Grid, List, Search, SlidersHorizontal, Shield, Zap, TrendingUp, Award } from 'lucide-react';
import { useState } from 'react';

export default function NFTArtPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);

  const nftItems = [
    {
      id: 1,
      title: "Cyber Genesis #001",
      artist: "CryptoArtist",
      price: "0.045 XRP",
      rating: 4.9,
      reviews: 234,
      image: "/cyber-preview-1.jpg",
      category: "Digital",
      verified: true,
      rarity: "Legendary",
      blockchain: "XRP Ledger"
    },
    {
      id: 2,
      title: "Abstract Dreams #042",
      artist: "DigitalVision",
      price: "0.032 XRP",
      rating: 4.8,
      reviews: 189,
      image: "/abstract-preview-1.jpg",
      category: "Abstract",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 3,
      title: "Neon Cityscape #007",
      artist: "FutureArt",
      price: "0.067 XRP",
      rating: 4.9,
      reviews: 312,
      image: "/cyber-preview-2.jpg",
      category: "Cyberpunk",
      verified: true,
      rarity: "Mythic",
      blockchain: "XRP Ledger"
    },
    {
      id: 4,
      title: "Ethereal Waves #156",
      artist: "WaveCreator",
      price: "0.028 XRP",
      rating: 4.7,
      reviews: 167,
      image: "/abstract-preview-2.jpg",
      category: "Abstract",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 5,
      title: "Digital Phoenix #003",
      artist: "MythicArts",
      price: "0.089 XRP",
      rating: 4.9,
      reviews: 445,
      image: "/cyber-preview-3.jpg",
      category: "Fantasy",
      verified: true,
      rarity: "Legendary",
      blockchain: "XRP Ledger"
    },
    {
      id: 6,
      title: "Quantum Particles #234",
      artist: "ScienceArt",
      price: "0.021 XRP",
      rating: 4.6,
      reviews: 134,
      image: "/abstract-preview-3.jpg",
      category: "Science",
      verified: false,
      rarity: "Common",
      blockchain: "XRP Ledger"
    },
    {
      id: 7,
      title: "Cosmic Journey #089",
      artist: "SpaceExplorer",
      price: "0.054 XRP",
      rating: 4.8,
      reviews: 278,
      image: "/cyber-preview-4.jpg",
      category: "Space",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 8,
      title: "Glitch Reality #012",
      artist: "GlitchMaster",
      price: "0.036 XRP",
      rating: 4.7,
      reviews: 198,
      image: "/abstract-preview-4.jpg",
      category: "Glitch",
      verified: true,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 9,
      title: "Neural Network #456",
      artist: "AIArtist",
      price: "0.043 XRP",
      rating: 4.8,
      reviews: 223,
      image: "/cyber-preview-5.jpg",
      category: "AI Art",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 10,
      title: "Fractal Dimension #678",
      artist: "MathArt",
      price: "0.029 XRP",
      rating: 4.6,
      reviews: 156,
      image: "/abstract-preview-1.jpg",
      category: "Mathematical",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 11,
      title: "Holographic Dreams #321",
      artist: "HoloCreator",
      price: "0.058 XRP",
      rating: 4.9,
      reviews: 289,
      image: "/cyber-preview-6.jpg",
      category: "Holographic",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 12,
      title: "Pixel Paradise #144",
      artist: "PixelMaster",
      price: "0.025 XRP",
      rating: 4.7,
      reviews: 178,
      image: "/abstract-preview-2.jpg",
      category: "Pixel Art",
      verified: false,
      rarity: "Common",
      blockchain: "XRP Ledger"
    },
    {
      id: 13,
      title: "Synthwave Sunset #067",
      artist: "RetroFuture",
      price: "0.041 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/cyber-preview-1.jpg",
      category: "Synthwave",
      verified: true,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 14,
      title: "Data Stream #789",
      artist: "DataViz",
      price: "0.033 XRP",
      rating: 4.6,
      reviews: 167,
      image: "/abstract-preview-3.jpg",
      category: "Data Art",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 15,
      title: "Virtual Reality #555",
      artist: "VRCreator",
      price: "0.072 XRP",
      rating: 4.9,
      reviews: 356,
      image: "/cyber-preview-2.jpg",
      category: "VR Art",
      verified: true,
      rarity: "Legendary",
      blockchain: "XRP Ledger"
    },
    {
      id: 16,
      title: "Blockchain Genesis #001",
      artist: "CryptoFounder",
      price: "0.095 XRP",
      rating: 4.9,
      reviews: 512,
      image: "/abstract-preview-4.jpg",
      category: "Crypto",
      verified: true,
      rarity: "Mythic",
      blockchain: "XRP Ledger"
    },
    {
      id: 17,
      title: "Digital Metamorphosis #234",
      artist: "TransformArt",
      price: "0.047 XRP",
      rating: 4.8,
      reviews: 245,
      image: "/cyber-preview-3.jpg",
      category: "Transformation",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 18,
      title: "Cyber Samurai #098",
      artist: "WarriorArt",
      price: "0.063 XRP",
      rating: 4.8,
      reviews: 298,
      image: "/cyber-preview-4.jpg",
      category: "Warrior",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 19,
      title: "Neon Flora #176",
      artist: "BioArt",
      price: "0.038 XRP",
      rating: 4.7,
      reviews: 189,
      image: "/abstract-preview-1.jpg",
      category: "Bio Art",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 20,
      title: "Matrix Code #999",
      artist: "CodeMaster",
      price: "0.051 XRP",
      rating: 4.9,
      reviews: 267,
      image: "/cyber-preview-5.jpg",
      category: "Code Art",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 21,
      title: "Quantum Entanglement #432",
      artist: "QuantumArt",
      price: "0.076 XRP",
      rating: 4.9,
      reviews: 378,
      image: "/abstract-preview-2.jpg",
      category: "Quantum",
      verified: true,
      rarity: "Legendary",
      blockchain: "XRP Ledger"
    },
    {
      id: 22,
      title: "Digital Consciousness #087",
      artist: "MindArt",
      price: "0.044 XRP",
      rating: 4.7,
      reviews: 212,
      image: "/cyber-preview-6.jpg",
      category: "Consciousness",
      verified: true,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 23,
      title: "Cyber Dragon #013",
      artist: "DragonForge",
      price: "0.081 XRP",
      rating: 4.9,
      reviews: 423,
      image: "/abstract-preview-3.jpg",
      category: "Fantasy",
      verified: true,
      rarity: "Legendary",
      blockchain: "XRP Ledger"
    },
    {
      id: 24,
      title: "Hologram City #765",
      artist: "CityBuilder",
      price: "0.056 XRP",
      rating: 4.8,
      reviews: 289,
      image: "/cyber-preview-1.jpg",
      category: "Architecture",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 25,
      title: "Digital Alchemy #345",
      artist: "AlchemyMaster",
      price: "0.039 XRP",
      rating: 4.6,
      reviews: 167,
      image: "/abstract-preview-4.jpg",
      category: "Alchemy",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 26,
      title: "Neon Geometry #892",
      artist: "GeoArt",
      price: "0.034 XRP",
      rating: 4.7,
      reviews: 198,
      image: "/cyber-preview-2.jpg",
      category: "Geometric",
      verified: false,
      rarity: "Common",
      blockchain: "XRP Ledger"
    },
    {
      id: 27,
      title: "Virtual Ecosystem #456",
      artist: "EcoCreator",
      price: "0.048 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/abstract-preview-1.jpg",
      category: "Ecosystem",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 28,
      title: "Cyber Portal #123",
      artist: "PortalMaker",
      price: "0.062 XRP",
      rating: 4.9,
      reviews: 312,
      image: "/cyber-preview-3.jpg",
      category: "Portal",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 29,
      title: "Digital Nebula #678",
      artist: "SpaceArt",
      price: "0.053 XRP",
      rating: 4.8,
      reviews: 267,
      image: "/abstract-preview-2.jpg",
      category: "Space",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 30,
      title: "Quantum Reality #901",
      artist: "RealityShift",
      price: "0.071 XRP",
      rating: 4.9,
      reviews: 389,
      image: "/cyber-preview-4.jpg",
      category: "Reality",
      verified: true,
      rarity: "Legendary",
      blockchain: "XRP Ledger"
    },
    {
      id: 31,
      title: "Neon Warrior #234",
      artist: "BattleArt",
      price: "0.045 XRP",
      rating: 4.7,
      reviews: 223,
      image: "/abstract-preview-3.jpg",
      category: "Warrior",
      verified: true,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 32,
      title: "Digital Symphony #567",
      artist: "MusicViz",
      price: "0.037 XRP",
      rating: 4.6,
      reviews: 178,
      image: "/cyber-preview-5.jpg",
      category: "Music",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 33,
      title: "Cyber Lotus #890",
      artist: "ZenArt",
      price: "0.042 XRP",
      rating: 4.8,
      reviews: 245,
      image: "/abstract-preview-4.jpg",
      category: "Zen",
      verified: true,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 34,
      title: "Virtual Maze #123",
      artist: "MazeBuilder",
      price: "0.031 XRP",
      rating: 4.5,
      reviews: 156,
      image: "/cyber-preview-6.jpg",
      category: "Puzzle",
      verified: false,
      rarity: "Common",
      blockchain: "XRP Ledger"
    },
    {
      id: 35,
      title: "Digital Storm #456",
      artist: "WeatherArt",
      price: "0.049 XRP",
      rating: 4.8,
      reviews: 267,
      image: "/abstract-preview-1.jpg",
      category: "Weather",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 36,
      title: "Neon Circuit #789",
      artist: "TechArt",
      price: "0.035 XRP",
      rating: 4.7,
      reviews: 189,
      image: "/cyber-preview-1.jpg",
      category: "Technology",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 37,
      title: "Cyber Angel #012",
      artist: "DivineArt",
      price: "0.067 XRP",
      rating: 4.9,
      reviews: 334,
      image: "/abstract-preview-2.jpg",
      category: "Divine",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 38,
      title: "Digital Prism #345",
      artist: "LightArt",
      price: "0.041 XRP",
      rating: 4.6,
      reviews: 212,
      image: "/cyber-preview-2.jpg",
      category: "Light",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 39,
      title: "Virtual Forest #678",
      artist: "NatureDigital",
      price: "0.046 XRP",
      rating: 4.8,
      reviews: 256,
      image: "/abstract-preview-3.jpg",
      category: "Nature",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 40,
      title: "Cyber Mandala #901",
      artist: "SacredGeometry",
      price: "0.054 XRP",
      rating: 4.8,
      reviews: 289,
      image: "/cyber-preview-3.jpg",
      category: "Sacred",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 41,
      title: "Digital Ocean #234",
      artist: "AquaArt",
      price: "0.038 XRP",
      rating: 4.7,
      reviews: 198,
      image: "/abstract-preview-4.jpg",
      category: "Water",
      verified: false,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 42,
      title: "Neon Phoenix #567",
      artist: "RebornArt",
      price: "0.073 XRP",
      rating: 4.9,
      reviews: 367,
      image: "/cyber-preview-4.jpg",
      category: "Rebirth",
      verified: true,
      rarity: "Legendary",
      blockchain: "XRP Ledger"
    },
    {
      id: 43,
      title: "Virtual Galaxy #890",
      artist: "CosmicArt",
      price: "0.059 XRP",
      rating: 4.8,
      reviews: 312,
      image: "/abstract-preview-1.jpg",
      category: "Cosmic",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 44,
      title: "Cyber Meditation #123",
      artist: "MindfulArt",
      price: "0.033 XRP",
      rating: 4.6,
      reviews: 167,
      image: "/cyber-preview-5.jpg",
      category: "Mindful",
      verified: false,
      rarity: "Common",
      blockchain: "XRP Ledger"
    },
    {
      id: 45,
      title: "Digital Harmony #456",
      artist: "BalanceArt",
      price: "0.047 XRP",
      rating: 4.8,
      reviews: 234,
      image: "/abstract-preview-2.jpg",
      category: "Balance",
      verified: true,
      rarity: "Rare",
      blockchain: "XRP Ledger"
    },
    {
      id: 46,
      title: "Neon Infinity #789",
      artist: "InfiniteArt",
      price: "0.084 XRP",
      rating: 4.9,
      reviews: 445,
      image: "/cyber-preview-6.jpg",
      category: "Infinite",
      verified: true,
      rarity: "Mythic",
      blockchain: "XRP Ledger"
    },
    {
      id: 47,
      title: "Virtual Dimension #012",
      artist: "DimensionArt",
      price: "0.061 XRP",
      rating: 4.8,
      reviews: 298,
      image: "/abstract-preview-3.jpg",
      category: "Dimension",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 48,
      title: "Cyber Evolution #345",
      artist: "EvolveArt",
      price: "0.052 XRP",
      rating: 4.7,
      reviews: 267,
      image: "/cyber-preview-1.jpg",
      category: "Evolution",
      verified: true,
      rarity: "Epic",
      blockchain: "XRP Ledger"
    },
    {
      id: 49,
      title: "Digital Transcendence #678",
      artist: "TranscendArt",
      price: "0.092 XRP",
      rating: 4.9,
      reviews: 512,
      image: "/abstract-preview-4.jpg",
      category: "Transcendence",
      verified: true,
      rarity: "Mythic",
      blockchain: "XRP Ledger"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'var(--brand-gray-500)';
      case 'Rare': return 'var(--brand-accent)';
      case 'Epic': return 'var(--brand-secondary)';
      case 'Legendary': return 'var(--brand-success)';
      case 'Mythic': return 'var(--brand-error)';
      default: return 'var(--brand-gray-500)';
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--brand-bg-secondary)' }}>
      {/* Enhanced Header */}
      <div className="relative overflow-hidden" style={{ background: 'var(--brand-gradient-primary)' }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              NFT Art Collection
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover unique digital masterpieces on the XRP Ledger. Own exclusive NFTs from top crypto artists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search NFT collections..."
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
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Verified Artists</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">XRP Ledger</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">Trending Now</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Premium Quality</span>
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
              {nftItems.length} NFTs available
            </span>
            <div className="flex gap-2">
              {['All', 'Digital', 'Abstract', 'Cyberpunk', 'Fantasy', 'Space', 'AI Art'].map((category) => (
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
              <option value="newest">Recently Minted</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="rarity">Rarity</option>
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

      {/* NFT Grid - 7 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
          {nftItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              style={{ backgroundColor: 'var(--brand-bg-card)' }}
            >
              {/* Verified Badge */}
              {item.verified && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-white rounded-full" style={{ backgroundColor: 'var(--brand-success)' }}>
                    <Shield className="w-3 h-3" />
                    Verified
                  </div>
                </div>
              )}
              
              {/* Rarity Badge */}
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 text-xs font-bold text-white rounded-full" style={{ backgroundColor: getRarityColor(item.rarity) }}>
                  {item.rarity}
                </span>
              </div>
              
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--brand-gradient-accent)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-400/20"></div>
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
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--brand-secondary)' }}>
                    <Zap className="w-3 h-3" />
                    <span>XRP</span>
                  </div>
                </div>
                
                <button className="w-full py-2 text-xs font-medium text-white rounded-lg transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--brand-accent)' }}>
                  Buy NFT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-16">
        <button className="px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg" style={{ background: 'var(--brand-gradient-primary)' }}>
          Discover More NFTs
        </button>
      </div>
    </div>
  );
}