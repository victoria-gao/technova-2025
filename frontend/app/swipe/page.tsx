"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, X, MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

const mockItems = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    description: "Beautiful brown leather jacket in excellent condition. Perfect for fall weather!",
    category: "Clothing",
    condition: "Excellent",
    location: "Downtown",
    timeAgo: "2 hours ago",
    image: "/vintage-brown-leather-jacket.jpg",
  },
  {
    id: 2,
    title: "Wooden Coffee Table",
    description: "Handcrafted oak coffee table with minor scratches. Great for any living room.",
    category: "Furniture",
    condition: "Good",
    location: "Midtown",
    timeAgo: "5 hours ago",
    image: "/wooden-oak-coffee-table.jpg",
  },
  {
    id: 3,
    title: "Yoga Mat & Blocks Set",
    description: "Barely used yoga equipment. Includes mat, blocks, and carrying strap.",
    category: "Sports",
    condition: "Like New",
    location: "Uptown",
    timeAgo: "1 day ago",
    image: "/purple-yoga-mat-blocks-set.jpg",
  },
  {
    id: 4,
    title: "Ceramic Plant Pots",
    description: "Set of 3 beautiful ceramic pots in different sizes. Perfect for indoor plants.",
    category: "Home & Garden",
    condition: "Excellent",
    location: "Westside",
    timeAgo: "3 hours ago",
    image: "/ceramic-plant-pots-terracotta.jpg",
  },
  {
    id: 5,
    title: "Board Game Collection",
    description: "Collection of 5 popular board games. All pieces included and in great condition.",
    category: "Games",
    condition: "Good",
    location: "Eastside",
    timeAgo: "6 hours ago",
    image: "/board-games-collection-stack.jpg",
  },
]

export default function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likes, setLikes] = useState(0)
  const [passes, setPasses] = useState(0)

  const currentItem = mockItems[currentIndex]

  const handleLike = () => {
    setLikes(likes + 1)
    nextItem()
  }

  const handlePass = () => {
    setPasses(passes + 1)
    nextItem()
  }

  const nextItem = () => {
    if (currentIndex < mockItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to start
    }
  }

  if (!currentItem) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-green-800">Discover Items</h1>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-pink-500" />
                <span className="text-green-700">{likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <X className="h-4 w-4 text-gray-500" />
                <span className="text-green-700">{passes}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-sm mx-auto">
          {/* Swipe Card */}
          <Card className="overflow-hidden shadow-2xl border-0 bg-white">
            <div className="relative">
              <img
                src={currentItem.image || "/placeholder.svg"}
                alt={currentItem.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-white/90 text-green-700">
                  {currentItem.condition}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">{currentItem.title}</h2>
                  <p className="text-green-600 leading-relaxed">{currentItem.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    {currentItem.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Clock className="h-4 w-4" />
                    {currentItem.timeAgo}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-green-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{currentItem.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <Button
              size="lg"
              variant="outline"
              className="h-16 w-16 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 bg-transparent"
              onClick={handlePass}
            >
              <X className="h-8 w-8 text-gray-500" />
            </Button>

            <Button
              size="lg"
              className="h-16 w-16 rounded-full bg-pink-500 hover:bg-pink-600 border-0"
              onClick={handleLike}
            >
              <Heart className="h-8 w-8 text-white" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 text-center">
            <p className="text-sm text-green-600">
              Item {currentIndex + 1} of {mockItems.length}
            </p>
            <div className="w-full bg-green-100 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / mockItems.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
