"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Settings, 
  Heart,
  Star,
  Edit3,
  Plus,
  Trash2
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    bio: "Passionate about sustainable living and giving items a second life. Love vintage finds and eco-friendly swaps!",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 4.8,
    swaps: 23,
    joined: "March 2023"
  });

  const [myItems] = useState([
    {
      id: 1,
      name: "Vintage Camera",
      description: "35mm film camera in working condition",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop",
      category: "Electronics",
      status: "Available"
    },
    {
      id: 2,
      name: "Designer Handbag",
      description: "Gently used leather handbag",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      category: "Fashion",
      status: "Pending"
    },
    {
      id: 3,
      name: "Coffee Maker",
      description: "French press coffee maker",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      category: "Kitchen",
      status: "Swapped"
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/welcome">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-slate-900">My Profile</h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative">
                  <Avatar 
                    src={profile.avatar} 
                    alt={profile.name}
                    fallback={profile.name.charAt(0)}
                    className="h-24 w-24"
                  />
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"
                    >
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
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button onClick={handleSave}>
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                          {profile.name}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        {profile.bio}
                      </p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{profile.rating}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          {profile.swaps} swaps
                        </div>
                        <div className="text-sm text-slate-600">
                          Joined {profile.joined}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Items */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Items</CardTitle>
                  <CardDescription>
                    Items you've listed for swapping
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge 
                          variant={item.status === 'Available' ? 'default' : 
                                  item.status === 'Pending' ? 'secondary' : 'outline'}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {item.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-emerald-600 mb-2">23</div>
                <div className="text-sm text-slate-600">Items Swapped</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-emerald-600 mb-2">4.8</div>
                <div className="text-sm text-slate-600">Average Rating</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-emerald-600 mb-2">12</div>
                <div className="text-sm text-slate-600">Items Listed</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
