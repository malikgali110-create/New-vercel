"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  FileJson,
  Archive,
  CheckCircle,
  Clock,
  AlertCircle,
  Folder,
  File,
  ImageIcon,
  Video,
  FileText,
  Package,
  Sparkles,
  Paintbrush,
} from "lucide-react"

interface DownloadItem {
  id: string
  name: string
  type: "image" | "json" | "video" | "document" | "archive"
  size: string
  format: string
  resolution?: string
  downloadUrl: string
  status: "ready" | "downloading" | "completed" | "error"
  progress?: number
  downloadedAt?: string
}

interface DownloadPackage {
  id: string
  name: string
  description: string
  items: DownloadItem[]
  totalSize: string
  packageType: "collection" | "bundle" | "individual"
  price: number
  currency: string
}

const mockDownloads: DownloadPackage[] = [
  {
    id: "1",
    name: "Abstract Watercolor Dreams - Complete Package",
    description: "Full resolution artwork with metadata and licensing",
    totalSize: "245 MB",
    packageType: "individual",
    price: 120,
    currency: "XRP",
    items: [
      {
        id: "1-1",
        name: "Abstract_Watercolor_Dreams_8K.jpg",
        type: "image",
        size: "85 MB",
        format: "JPG",
        resolution: "7680x4320",
        downloadUrl: "/downloads/abstract-watercolor-8k.jpg",
        status: "ready",
      },
      {
        id: "1-2",
        name: "Abstract_Watercolor_Dreams_4K.jpg",
        type: "image",
        size: "45 MB",
        format: "JPG",
        resolution: "3840x2160",
        downloadUrl: "/downloads/abstract-watercolor-4k.jpg",
        status: "ready",
      },
      {
        id: "1-3",
        name: "Abstract_Watercolor_Dreams_Print.pdf",
        type: "document",
        size: "12 MB",
        format: "PDF",
        resolution: "300 DPI",
        downloadUrl: "/downloads/abstract-watercolor-print.pdf",
        status: "ready",
      },
      {
        id: "1-4",
        name: "metadata.json",
        type: "json",
        size: "2 KB",
        format: "JSON",
        downloadUrl: "/downloads/abstract-watercolor-metadata.json",
        status: "ready",
      },
      {
        id: "1-5",
        name: "license_agreement.pdf",
        type: "document",
        size: "156 KB",
        format: "PDF",
        downloadUrl: "/downloads/license-agreement.pdf",
        status: "ready",
      },
      {
        id: "1-6",
        name: "creation_process.mp4",
        type: "video",
        size: "98 MB",
        format: "MP4",
        resolution: "1920x1080",
        downloadUrl: "/downloads/creation-process.mp4",
        status: "ready",
      },
    ],
  },
  {
    id: "2",
    name: "Mystic Animals Collection - Bulk Download",
    description: "Complete NFT collection with all assets and metadata",
    totalSize: "15.2 GB",
    packageType: "collection",
    price: 500,
    currency: "XRP",
    items: [
      {
        id: "2-1",
        name: "mystic_animals_images.zip",
        type: "archive",
        size: "12.8 GB",
        format: "ZIP",
        downloadUrl: "/downloads/mystic-animals-images.zip",
        status: "ready",
      },
      {
        id: "2-2",
        name: "mystic_animals_metadata.json",
        type: "json",
        size: "2.4 MB",
        format: "JSON",
        downloadUrl: "/downloads/mystic-animals-metadata.json",
        status: "ready",
      },
      {
        id: "2-3",
        name: "traits_rarity_report.pdf",
        type: "document",
        size: "5.2 MB",
        format: "PDF",
        downloadUrl: "/downloads/traits-rarity-report.pdf",
        status: "ready",
      },
    ],
  },
]

export function DownloadManager() {
  const [downloads, setDownloads] = useState<DownloadPackage[]>(mockDownloads)
  const [activeTab, setActiveTab] = useState("purchased")

  const handleDownload = (packageId: string, itemId?: string) => {
    setDownloads((prev) =>
      prev.map((pkg) => {
        if (pkg.id === packageId) {
          if (itemId) {
            // Download individual item
            return {
              ...pkg,
              items: pkg.items.map((item) =>
                item.id === itemId ? { ...item, status: "downloading", progress: 0 } : item,
              ),
            }
          } else {
            // Download entire package
            return {
              ...pkg,
              items: pkg.items.map((item) => ({ ...item, status: "downloading", progress: 0 })),
            }
          }
        }
        return pkg
      }),
    )

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloads((prev) =>
        prev.map((pkg) => {
          if (pkg.id === packageId) {
            return {
              ...pkg,
              items: pkg.items.map((item) => {
                if (itemId && item.id !== itemId) return item
                if (item.status === "downloading") {
                  const newProgress = Math.min((item.progress || 0) + Math.random() * 20, 100)
                  if (newProgress >= 100) {
                    return {
                      ...item,
                      status: "completed",
                      progress: 100,
                      downloadedAt: new Date().toISOString(),
                    }
                  }
                  return { ...item, progress: newProgress }
                }
                return item
              }),
            }
          }
          return pkg
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 8000)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "json":
        return <FileJson className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "archive":
        return <Archive className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <Download className="h-4 w-4 text-blue-500" />
      case "downloading":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6 relative">
      <div className="absolute top-10 right-10 opacity-10 rotate-12 animate-float">
        <Sparkles className="h-12 w-12 text-accent" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10 -rotate-12 animate-float">
        <Paintbrush className="h-10 w-10 text-primary" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div className="animate-in slide-in-from-left-4 duration-1000">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 animate-pulse">
            <Download className="h-3 w-3 mr-1" />
            Digital Assets
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-balance">Download Manager</h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            Manage your purchased digital assets and downloads
          </p>
        </div>
        <div className="animate-in slide-in-from-right-4 duration-1000 delay-200">
          <Button className="bg-gradient-to-r from-primary to-chart-4 hover:from-chart-4 hover:to-primary text-white border-0 rounded-full micro-bounce hover:scale-105 transition-all duration-300">
            <Package className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>
      </div>

      <div className="animate-in slide-in-from-bottom-4 duration-1000 delay-400">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-muted/30 rounded-full p-1">
            <TabsTrigger
              value="purchased"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Purchased Items
            </TabsTrigger>
            <TabsTrigger
              value="collections"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              NFT Collections
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              Download History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="purchased" className="space-y-6 mt-8">
            {downloads
              .filter((pkg) => pkg.packageType === "individual")
              .map((downloadPackage, index) => (
                <Card
                  key={downloadPackage.id}
                  className="overflow-hidden product-card-hover rounded-2xl bg-card border-2 hover:border-primary/30 transition-all duration-500 animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 via-accent/5 to-transparent">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-serif text-balance">{downloadPackage.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {downloadPackage.description}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="font-medium">{downloadPackage.items.length} files</span>
                          <span className="font-medium">{downloadPackage.totalSize}</span>
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            {downloadPackage.price} {downloadPackage.currency}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDownload(downloadPackage.id)}
                        className="bg-primary hover:bg-chart-4 rounded-full micro-bounce hover:scale-105 transition-all duration-300"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {downloadPackage.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-xl hover:from-muted/30 hover:to-muted/20 transition-all duration-200 border border-border/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-card rounded-xl border-2 border-border/50">
                              {getFileIcon(item.type)}
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-sm">{item.name}</div>
                              <div className="text-xs text-muted-foreground font-medium">
                                {item.format} • {item.size}
                                {item.resolution && ` • ${item.resolution}`}
                              </div>
                              {item.status === "downloading" && item.progress !== undefined && (
                                <div className="mt-2 w-32">
                                  <Progress value={item.progress} className="h-2 bg-muted" />
                                  <div className="text-xs text-muted-foreground mt-1 font-medium">
                                    {Math.round(item.progress)}%
                                  </div>
                                </div>
                              )}
                              {item.status === "completed" && item.downloadedAt && (
                                <div className="text-xs text-green-600 mt-1 font-medium">
                                  Downloaded {new Date(item.downloadedAt).toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusIcon(item.status)}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDownload(downloadPackage.id, item.id)}
                              disabled={item.status === "downloading"}
                              className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200"
                            >
                              {item.status === "completed" ? "Re-download" : "Download"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="collections" className="space-y-6">
            {downloads
              .filter((pkg) => pkg.packageType === "collection")
              .map((downloadPackage) => (
                <Card key={downloadPackage.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-serif flex items-center gap-2">
                          <Folder className="h-5 w-5" />
                          {downloadPackage.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{downloadPackage.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{downloadPackage.items.length} files</span>
                          <span>{downloadPackage.totalSize}</span>
                          <Badge variant="outline" className="text-xs">
                            Collection
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDownload(downloadPackage.id)}
                        className="bg-primary hover:bg-primary/90 rounded-full"
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Download Collection
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid md:grid-cols-2 gap-4">
                      {downloadPackage.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-card rounded-lg border">{getFileIcon(item.type)}</div>
                            <div>
                              <div className="font-medium text-foreground text-sm">{item.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.format} • {item.size}
                              </div>
                              {item.status === "downloading" && item.progress !== undefined && (
                                <div className="mt-2 w-24">
                                  <Progress value={item.progress} className="h-1" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.status)}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDownload(downloadPackage.id, item.id)}
                              disabled={item.status === "downloading"}
                              className="rounded-full text-xs"
                            >
                              {item.status === "completed" ? "✓" : "↓"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Recent Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {downloads
                    .flatMap((pkg) => pkg.items)
                    .filter((item) => item.status === "completed")
                    .slice(0, 10)
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">{getFileIcon(item.type)}</div>
                          <div>
                            <div className="font-medium text-foreground text-sm">{item.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.downloadedAt && `Downloaded ${new Date(item.downloadedAt).toLocaleString()}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Button size="sm" variant="ghost" className="rounded-full text-xs">
                            Re-download
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
