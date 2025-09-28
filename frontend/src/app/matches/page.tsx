"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  MessageCircle, 
  MapPin, 
  Clock, 
  CheckCircle,
  XCircle,
  Star,
  Filter,
  Search
} from "lucide-react";
import Link from "next/link";

// Mock data for matches
const mockMatches = [
  {
    id: 1,
    item: {
      name: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop",
      category: "Clothing"
    },
    user: {
      name: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      distance: "0.5 miles"
    },
    status: "pending",
    matchedAt: "2 hours ago",
    message: "Hi! I'm interested in your vintage camera. Would you like to swap for my denim jacket?"
  },
  {
    id: 2,
    item: {
      name: "Coffee Table Books Collection",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
      category: "Books"
    },
    user: {
      name: "Alex K.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      distance: "1.2 miles"
    },
    status: "accepted",
    matchedAt: "1 day ago",
    message: "Perfect! When would be a good time to meet?"
  },
  {
    id: 3,
    item: {
      name: "Indoor Plant Collection",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      category: "Plants"
    },
    user: {
      name: "Emma L.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      distance: "0.8 miles"
    },
    status: "completed",
    matchedAt: "3 days ago",
    message: "Thanks for the great swap! The plants are thriving in my living room."
  }
];

export default function MatchesPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMatches = mockMatches.filter(match => {
    if (selectedFilter === "all") return true;
    return match.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-emerald-100 text-emerald-800";
      case "declined": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-3 w-3" />;
      case "accepted": return <CheckCircle className="h-3 w-3" />;
      case "completed": return <CheckCircle className="h-3 w-3" />;
      case "declined": return <XCircle className="h-3 w-3" />;
      default: return null;
    }
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
            <h1 className="text-lg font-semibold text-slate-900">My Matches</h1>
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

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b p-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search matches..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {["all", "pending", "accepted", "completed"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {filteredMatches.length === 0 ? (
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-12">
                <div className="p-4 bg-slate-100 rounded-full w-fit mx-auto mb-6">
                  <MessageCircle className="h-8 w-8 text-slate-600" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  No matches yet
                </h2>
                <p className="text-slate-600 mb-6">
                  Start swiping to find items you love and make connections with other users.
                </p>
                <Link href="/swipe">
                  <Button>
                    Start Swiping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredMatches.map((match) => (
                <Card key={match.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={match.item.image}
                          alt={match.item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      </div>

                      {/* Match Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-1">
                              {match.item.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{match.user.distance}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{match.matchedAt}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(match.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(match.status)}
                              <span className="capitalize">{match.status}</span>
                            </div>
                          </Badge>
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-3">
                          <Avatar 
                            src={match.user.avatar} 
                            alt={match.user.name}
                            fallback={match.user.name.charAt(0)}
                            className="h-8 w-8"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900 text-sm">
                                {match.user.name}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-slate-600">
                                  {match.user.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="bg-slate-50 rounded-lg p-3">
                          <p className="text-sm text-slate-700">
                            {match.message}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          {match.status === "pending" && (
                            <>
                              <Button size="sm" variant="outline">
                                Accept
                              </Button>
                              <Button size="sm" variant="outline">
                                Decline
                              </Button>
                            </>
                          )}
                          {match.status === "accepted" && (
                            <Button size="sm" variant="outline">
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
