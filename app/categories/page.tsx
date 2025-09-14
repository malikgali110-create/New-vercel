import { CategoryNavigation } from "@/components/category-navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Palette, TrendingUp, Star, Filter, Search, ArrowRight } from "lucide-react"
import { EnhancedHeader } from "@/components/enhanced-header"
import { FloatingActionMenu } from "@/components/floating-action-menu"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-brand-primary text-white py-2 px-4 text-center text-sm font-medium">
        Powered by <strong>EMOTION CAPSULES</strong> • XRPL-only Payments via XUMM
      </div>

      <EnhancedHeader />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-brand-primary/5 via-brand-accent/5 to-brand-secondary/5">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-brand-primary/10 rounded-2xl">
              <Palette className="h-12 w-12 text-brand-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">Explore Art Categories</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of artworks across Digital, Physical, and Handmade categories. Each with detailed
            subcategories to help you find exactly what you're looking for.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary font-serif">3</div>
              <div className="text-sm text-muted-foreground">Main Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-accent font-serif">24</div>
              <div className="text-sm text-muted-foreground">Subcategories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-secondary font-serif">10K+</div>
              <div className="text-sm text-muted-foreground">Total Artworks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary font-serif">500+</div>
              <div className="text-sm text-muted-foreground">Artists</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8">
              <Search className="h-4 w-4 mr-2" />
              Browse All Categories
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Trending
            </Button>
          </div>
        </div>
      </section>

      {/* Main Categories Navigation */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Filter className="h-3 w-3 mr-1" />
              Browse by Category
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Find Your Perfect Art Style
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each category contains carefully curated subcategories to help you discover exactly what you're looking
              for.
            </p>
          </div>

          <CategoryNavigation />
        </div>
      </section>

      {/* Popular Combinations */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              <Star className="h-3 w-3 mr-1" />
              Popular Combinations
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Trending Art Combinations
            </h2>
            <p className="text-muted-foreground text-lg">Popular category combinations that other collectors love</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Digital + Physical</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">Buy digital art and get matching physical prints</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  Abstract Digital
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Canvas Prints
                </Badge>
              </div>
              <Button size="sm" variant="ghost" className="w-full justify-between">
                Explore Combo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Star className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Handmade Collection</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">Curated handmade pieces from the same artist</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  Ceramics
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Textiles
                </Badge>
              </div>
              <Button size="sm" variant="ghost" className="w-full justify-between">
                View Collection
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-chart-3/30">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-chart-3/10 rounded-lg">
                  <Palette className="h-5 w-5 text-chart-3" />
                </div>
                <h3 className="font-semibold text-foreground">Artist Spotlight</h3>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">Featured artists across all categories</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  Multi-Medium
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Exclusive
                </Badge>
              </div>
              <Button size="sm" variant="ghost" className="w-full justify-between">
                Meet Artists
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <FloatingActionMenu />
    </div>
  )
}
