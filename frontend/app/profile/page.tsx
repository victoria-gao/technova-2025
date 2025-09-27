"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, Heart, Package, Star, ArrowLeft, Camera, Plus, Edit } from "lucide-react"
import Link from "next/link"

const mockUserItems = [
  {
    id: 1,
    title: "Vintage Camera",
    category: "Electronics",
    status: "Available",
    likes: 12,
    image: "/vintage-film-camera.jpg",
  },
  {
    id: 2,
    title: "Succulent Plants",
    category: "Plants",
    status: "Exchanged",
    likes: 8,
    image: "/small-succulent-plants-pot.jpg",
  },
  {
    id: 3,
    title: "Cookbook Collection",
    category: "Books",
    status: "Available",
    likes: 5,
    image: "/cookbook-collection-stack.jpg",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    bio: "Passionate about sustainable living and reducing waste. Love finding new homes for pre-loved items!",
    location: "San Francisco, CA",
    joinDate: "March 2024",
  })

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
            <h1 className="text-xl font-semibold text-green-800">My Profile</h1>
            <Button
              variant="ghost"
              size="sm"
              className="text-green-600 hover:text-green-700"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/woman-profile.png" />
                    <AvatarFallback className="bg-green-100 text-green-700 text-2xl">SJ</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h1 className="text-3xl font-bold text-green-800">{profile.name}</h1>
                        <p className="text-green-600 mt-2 leading-relaxed">{profile.bio}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-green-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {profile.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined {profile.joinDate}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">25</div>
                <div className="text-sm text-green-600">Items Exchanged</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-pink-500 mb-2">142</div>
                <div className="text-sm text-green-600">Likes Received</div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">4.8</div>
                <div className="text-sm text-green-600 flex items-center justify-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Rating
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-700 mb-2">18</div>
                <div className="text-sm text-green-600">Active Items</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <Tabs defaultValue="items" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="items"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    My Items
                  </TabsTrigger>
                  <TabsTrigger
                    value="liked"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Liked Items
                  </TabsTrigger>
                  <TabsTrigger
                    value="exchanges"
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    Exchanges
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="items" className="mt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-green-800">My Listed Items</h3>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mockUserItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              variant={item.status === "Available" ? "default" : "secondary"}
                              className={item.status === "Available" ? "bg-green-600" : ""}
                            >
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-green-800 mb-1">{item.title}</h4>
                          <p className="text-sm text-green-600 mb-2">{item.category}</p>
                          <div className="flex items-center gap-1 text-sm text-pink-500">
                            <Heart className="h-4 w-4" />
                            {item.likes} likes
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="liked" className="mt-6">
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-pink-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">No liked items yet</h3>
                    <p className="text-green-600 mb-4">Start swiping to discover amazing items!</p>
                    <Link href="/swipe">
                      <Button className="bg-green-600 hover:bg-green-700">Start Swiping</Button>
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="exchanges" className="mt-6">
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-green-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-800 mb-2">No exchanges yet</h3>
                    <p className="text-green-600">Your exchange history will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
