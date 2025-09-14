"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Download, FileJson, ImageIcon, FileText, Copy, Check } from "lucide-react"
import Image from "next/image"

interface FilePreviewProps {
  fileName: string
  fileType: "image" | "json" | "document"
  fileUrl: string
  metadata?: any
  trigger?: React.ReactNode
}

export function FilePreview({ fileName, fileType, fileUrl, metadata, trigger }: FilePreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderPreview = () => {
    switch (fileType) {
      case "image":
        return (
          <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
            <Image src={fileUrl || "/placeholder.svg"} alt={fileName} fill className="object-contain" />
          </div>
        )
      case "json":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">JSON Metadata</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(JSON.stringify(metadata, null, 2))}
                className="rounded-full"
              >
                {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-lg max-h-96 overflow-auto">
              <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                {JSON.stringify(metadata || { name: fileName, description: "Sample metadata" }, null, 2)}
              </pre>
            </div>
          </div>
        )
      case "document":
        return (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Document preview not available</p>
            <p className="text-sm text-muted-foreground mt-2">Click download to view the full document</p>
          </div>
        )
      default:
        return (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Preview not available for this file type</p>
          </div>
        )
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" variant="ghost" className="rounded-full">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {fileType === "image" && <ImageIcon className="h-5 w-5" />}
            {fileType === "json" && <FileJson className="h-5 w-5" />}
            {fileType === "document" && <FileText className="h-5 w-5" />}
            {fileName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            {renderPreview()}
          </TabsContent>

          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">File Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="text-foreground">{fileName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge variant="outline" className="text-xs">
                          {fileType.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="text-foreground">2.4 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="text-foreground">
                          {fileType === "image" ? "JPG" : fileType === "json" ? "JSON" : "PDF"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Download Options</h4>
                    <div className="space-y-2">
                      <Button className="w-full bg-primary hover:bg-primary/90 rounded-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Original
                      </Button>
                      {fileType === "image" && (
                        <>
                          <Button variant="outline" className="w-full rounded-full bg-transparent">
                            Download Web (1080p)
                          </Button>
                          <Button variant="outline" className="w-full rounded-full bg-transparent">
                            Download Print (300 DPI)
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metadata" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Blockchain Metadata</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleCopy(
                          JSON.stringify(
                            {
                              name: fileName,
                              description: "Digital artwork with XRPL verification",
                              image: fileUrl,
                              attributes: [
                                { trait_type: "Artist", value: "Sarah Chen" },
                                { trait_type: "Medium", value: "Digital Watercolor" },
                                { trait_type: "Year", value: "2024" },
                              ],
                            },
                            null,
                            2,
                          ),
                        )
                      }
                      className="rounded-full"
                    >
                      {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                      Copy Metadata
                    </Button>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                      {JSON.stringify(
                        {
                          name: fileName,
                          description: "Digital artwork with XRPL verification",
                          image: fileUrl,
                          external_url: "https://store.emotioncapsules.art",
                          attributes: [
                            { trait_type: "Artist", value: "Sarah Chen" },
                            { trait_type: "Medium", value: "Digital Watercolor" },
                            { trait_type: "Year", value: "2024" },
                            { trait_type: "Edition", value: "Limited (1/50)" },
                            { trait_type: "Blockchain", value: "XRPL" },
                          ],
                          properties: {
                            files: [
                              {
                                uri: fileUrl,
                                type: fileType === "image" ? "image/jpeg" : "application/json",
                              },
                            ],
                            category: "image",
                          },
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
