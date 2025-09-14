"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface FilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  priceRange: string
  onPriceRangeChange: (value: string) => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  availableTags: string[]
  onClearFilters: () => void
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  selectedTags,
  onTagToggle,
  availableTags,
  onClearFilters,
}: FilterProps) {
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search artworks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4">
        {/* Sort */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Range */}
        <Select value={priceRange} onValueChange={onPriceRangeChange}>
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
        <Button variant="outline" onClick={onClearFilters} className="gap-2 bg-transparent">
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
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">Active Filters:</span>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge key={tag} className="gap-1">
                {tag}
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => onTagToggle(tag)} />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
