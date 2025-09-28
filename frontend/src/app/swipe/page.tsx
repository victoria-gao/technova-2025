"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Heart, 
  X, 
  MapPin, 
  Clock, 
  User,
  Star,
  Filter,
  Search
} from "lucide-react";
import Link from "next/link";

// Mock data for items
const mockItems = [
  {
    id: 1,
    name: "Vintage Denim Jacket",
    description: "Classic blue denim jacket in excellent condition. Perfect for spring and fall weather.",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=600&fit=crop",
    category: "Clothing",
    condition: "Excellent",
    distance: "0.5 miles",
    user: {
      name: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      swaps: 23
    },
    posted: "2 hours ago"
  },
  {
    id: 2,
    name: "Coffee Table Books Collection",
    description: "Beautiful collection of art and photography books. Perfect for coffee tables or bookshelves.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    category: "Books",
    condition: "Good",
    distance: "1.2 miles",
    user: {
      name: "Alex K.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      swaps: 45
    },
    posted: "5 hours ago"
  },
  {
    id: 3,
    name: "Indoor Plant Collection",
    description: "Assorted houseplants including succulents and ferns. All healthy and well-cared for.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=600&fit=crop",
    category: "Plants",
    condition: "Excellent",
    distance: "0.8 miles",
    user: {
      name: "Emma L.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      swaps: 18
    },
    posted: "1 day ago"
  }
];

export default function SwipePage() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const currentItem = mockItems[currentItemIndex];

  const handleLike = () => {
    if (currentItem && !isExiting) {
      setLikedItems([...likedItems, currentItem.id]);
      setExitDirection('right');
      setIsExiting(true);
      
      // Change item immediately, animation will handle the exit
      nextItem();
      
      // Reset state after a short delay
      setTimeout(() => {
        setIsExiting(false);
        setExitDirection(null);
      }, 100);
    }
  };

  const handlePass = () => {
    if (!isExiting) {
      setExitDirection('left');
      setIsExiting(true);
      
      // Change item immediately, animation will handle the exit
      nextItem();
      
      // Reset state after a short delay
      setTimeout(() => {
        setIsExiting(false);
        setExitDirection(null);
      }, 100);
    }
  };

  const nextItem = () => {
    if (currentItemIndex < mockItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else {
      // End of items - could show a completion screen
      setCurrentItemIndex(0);
    }
  };

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="p-4 bg-emerald-100 rounded-full w-fit mx-auto mb-6">
              <Heart className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              All caught up!
            </h1>
            <p className="text-slate-600 mb-8">
              You've seen all available items. Check back later for new listings or adjust your filters.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setCurrentItemIndex(0)}>
                Start Over
              </Button>
              <Button variant="outline" onClick={() => setShowFilters(true)}>
                Adjust Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-lg font-semibold text-slate-900">Discover Items</h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b p-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                Category
              </Button>
              <Button variant="outline" size="sm">
                Distance
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-sm mx-auto">
          {/* Card Container */}
          <div className="relative h-[620px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItemIndex}
                className="absolute inset-0"
                initial={{ 
                  opacity: 0, 
                  scale: 0.9, 
                  y: 20,
                  x: 0
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  x: 0
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  x: exitDirection === 'right' ? 400 : exitDirection === 'left' ? -400 : 0,
                  y: -20,
                  rotate: exitDirection === 'right' ? 15 : exitDirection === 'left' ? -15 : 0,
                  transition: {
                    duration: 0.4,
                    ease: "easeInOut"
                  }
                }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut"
                }}
              >
                <Card className="overflow-hidden shadow-xl border-0 h-full">
                  <div className="relative">
                    <img
                      src={currentItem.image}
                      alt={currentItem.name}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-slate-900 hover:bg-white/90">
                        {currentItem.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-slate-900 hover:bg-white/90">
                        {currentItem.condition}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                          {currentItem.name}
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {currentItem.description}
                        </p>
                      </div>

                      {/* User Info */}
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <Avatar 
                          src={currentItem.user.avatar} 
                          alt={currentItem.user.name}
                          fallback={currentItem.user.name.charAt(0)}
                          className="h-10 w-10"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">
                              {currentItem.user.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-slate-600">
                                {currentItem.user.rating}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">
                            {currentItem.user.swaps} swaps • {currentItem.posted}
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="h-4 w-4" />
                        <span>{currentItem.distance} away</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-8">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-14 w-14 border-2 border-slate-300 hover:border-slate-400"
              onClick={handlePass}
              disabled={isExiting}
            >
              <div>
                <X className="h-6 w-6 text-slate-600" />
              </div>
            </Button>
            <Button
              size="lg"
              className="rounded-full h-14 w-14 bg-emerald-600 hover:bg-emerald-700"
              onClick={handleLike}
              disabled={isExiting}
            >
              <div>
                <Heart className="h-6 w-6 text-white" />
              </div>
            </Button>
          </div>

          {/* Progress */}
          <div className="mt-6 text-center">
            <div className="text-sm text-slate-500">
              {currentItemIndex + 1} of {mockItems.length}
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1 mt-2">
              <div 
                className="bg-emerald-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentItemIndex + 1) / mockItems.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
