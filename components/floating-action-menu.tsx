"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Heart,
  Share2,
  MessageCircle,
  ShoppingCart,
  Bookmark,
  Filter,
  Grid3X3,
  List,
  SortAsc,
} from "lucide-react"

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const actions = [
    { icon: Heart, label: "Favorites", count: 12 },
    { icon: Bookmark, label: "Saved", count: 8 },
    { icon: ShoppingCart, label: "Cart", count: 3 },
    { icon: Share2, label: "Share" },
    { icon: MessageCircle, label: "Support" },
  ]

  return (
    <>
      {/* Main FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col items-end space-y-3">
          {/* Action Buttons */}
          {isOpen && (
            <div className="flex flex-col space-y-2 animate-in slide-in-from-bottom-2 duration-200">
              {actions.map((action, index) => (
                <Button
                  key={action.label}
                  size="sm"
                  variant="secondary"
                  className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <action.icon className="h-4 w-4" />
                  {action.count && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {action.count}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          )}

          {/* Main Toggle Button */}
          <Button
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Plus className={`h-6 w-6 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`} />
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md rounded-full p-1 border shadow-lg">
          <Button
            size="sm"
            variant={viewMode === "grid" ? "default" : "ghost"}
            className="rounded-full"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === "list" ? "default" : "ghost"}
            className="rounded-full"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button size="sm" variant="ghost" className="rounded-full">
            <SortAsc className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
