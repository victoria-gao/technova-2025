"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, ArrowLeft, MapPin, MessageCircle, User } from "lucide-react"
import Link from "next/link"

// Mock data for liked items
const likedItems = [
  {
    id: 1,
    title: "Vintage Leather Jacket",
    description: "Beautiful brown leather jacket in excellent condition.",
    category: "Clothing",
    condition: "Excellent",
    location: "Downtown",
    timeAgo: "2 hours ago",
    image: "/vintage-brown-leather-jacket.jpg",
    owner: "Sarah M.",
    likedAt: "2 days ago",
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
    owner: "Mike R.",
    likedAt: "1 day ago",
  },
  {
    id: 4,
    title: "Ceramic Plant Pots",
    description: "Set of 3 beautiful ceramic pots in different sizes.",
    category: "Home & Garden",
    condition: "Excellent",
    location: "Westside",
    timeAgo: "3 hours ago",
    image: "/ceramic-plant-pots-terracotta.jpg",
    owner: "Emma L.",
    likedAt: "3 hours ago",
  },
]

// Mock data for received likes on your items
const receivedLikes = [
  {
    id: 101,
    title: "Vintage Film Camera",
    description: "Classic 35mm film camera in working condition.",
    category: "Electronics",
    condition: "Good",
    location: "Your Location",
    image: "/vintage-film-camera.jpg",
    likedBy: "Alex K.",
    likedAt: "1 hour ago",
    likerAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 102,
    title: "Small Succulent Plants",
    description: "Collection of 5 small succulent plants in decorative pots.",
    category: "Home & Garden",
    condition: "Excellent",
    location: "Your Location",
    image: "/small-succulent-plants-pot.jpg",
    likedBy: "Jordan P.",
    likedAt: "4 hours ago",
    likerAvatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for mutual matches
const mutualMatches = [
  {
    id: 1,
    yourItem: {
      id: 101,
      title: "Vintage Film Camera",
      image: "/vintage-film-camera.jpg",
    },
    theirItem: {
      id: 1,
      title: "Vintage Leather Jacket",
      image: "/vintage-brown-leather-jacket.jpg",
    },
    matchedWith: "Sarah M.",
    matchedAt: "30 minutes ago",
    status: "new", // new, chatting, completed
  },
  {
    id: 2,
    yourItem: {
      id: 102,
      title: "Small Succulent Plants",
      image: "/small-succulent-plants-pot.jpg",
    },
    theirItem: {
      id: 3,
      title: "Yoga Mat & Blocks Set",
      image: "/purple-yoga-mat-blocks-set.jpg",
    },
    matchedWith: "Mike R.",
    matchedAt: "2 hours ago",
    status: "chatting",
  },
]

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("liked")

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
            <h1 className="text-xl font-semibold text-green-800">My Matches</h1>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="liked" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Items I Liked ({likedItems.length})
            </TabsTrigger>
            <TabsTrigger value="received" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Likes Received ({receivedLikes.length})
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Mutual Matches ({mutualMatches.length})
            </TabsTrigger>
          </TabsList>

          {/* Items I Liked Tab */}
          <TabsContent value="liked" className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Items You Liked</h2>
              <p className="text-green-600">Keep track of items that caught your interest</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {likedItems.map((item) => (
                <Card key={item.id} className="overflow-hidden shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <div className="relative">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-green-700">
                        {item.condition}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-green-600 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <Heart className="h-3 w-3 text-pink-500" />
                        {item.likedAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-green-600 mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                      <span>•</span>
                      <User className="h-3 w-3" />
                      <span>{item.owner}</span>
                    </div>

                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Likes Received Tab */}
          <TabsContent value="received" className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Likes You Received</h2>
              <p className="text-green-600">People who are interested in your items</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {receivedLikes.map((item) => (
                <Card key={item.id} className="overflow-hidden shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <div className="relative">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-green-700">
                        Your Item
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-green-600 mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="border-green-200 text-green-700 text-xs">
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <Heart className="h-3 w-3 text-pink-500" />
                        {item.likedAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 p-2 bg-pink-50 rounded-lg">
                      <img
                        src={item.likerAvatar || "/placeholder.svg"}
                        alt={item.likedBy}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-green-700">
                        <strong>{item.likedBy}</strong> liked this item
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        View Profile
                      </Button>
                      <Button size="sm" className="flex-1 bg-pink-500 hover:bg-pink-600">
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mutual Matches Tab */}
          <TabsContent value="matches" className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-800 mb-2">Mutual Matches</h2>
              <p className="text-green-600">You both liked each other's items - time to connect!</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {mutualMatches.map((match) => (
                <Card key={match.id} className="overflow-hidden shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-green-800">Match with {match.matchedWith}</CardTitle>
                      <Badge
                        variant={match.status === "new" ? "default" : "secondary"}
                        className={match.status === "new" ? "bg-pink-500" : "bg-green-600"}
                      >
                        {match.status === "new" ? "New Match!" : match.status === "chatting" ? "Chatting" : "Completed"}
                      </Badge>
                    </div>
                    <p className="text-sm text-green-600">Matched {match.matchedAt}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Items Exchange Preview */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-center">
                        <img
                          src={match.yourItem.image || "/placeholder.svg"}
                          alt={match.yourItem.title}
                          className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                        />
                        <p className="text-xs text-green-700 font-medium">Your Item</p>
                        <p className="text-xs text-green-600 line-clamp-1">{match.yourItem.title}</p>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mb-1">
                          <Heart className="h-4 w-4 text-pink-500" />
                        </div>
                        <div className="text-xs text-green-600">↔</div>
                      </div>

                      <div className="flex-1 text-center">
                        <img
                          src={match.theirItem.image || "/placeholder.svg"}
                          alt={match.theirItem.title}
                          className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                        />
                        <p className="text-xs text-green-700 font-medium">Their Item</p>
                        <p className="text-xs text-green-600 line-clamp-1">{match.theirItem.title}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1 bg-pink-500 hover:bg-pink-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {match.status === "new" ? "Start Chat" : "Continue Chat"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
