"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, ArrowLeftRight, MapPin, Star, CalendarDays } from "lucide-react";

// Mock data for trade history
const tradeHistory = [
  {
    id: 101,
    date: "2025-09-15",
    youGave: {
      name: "Vintage Camera",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop",
      category: "Electronics"
    },
    youGot: {
      name: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=300&fit=crop",
      category: "Clothing"
    },
    partner: {
      name: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      distance: "0.5 miles"
    },
    location: "San Francisco, CA"
  },
  {
    id: 102,
    date: "2025-09-01",
    youGave: {
      name: "Coffee Maker",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
      category: "Kitchen"
    },
    youGot: {
      name: "Coffee Table Books Collection",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
      category: "Books"
    },
    partner: {
      name: "Alex K.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      distance: "1.2 miles"
    },
    location: "San Jose, CA"
  },
  {
    id: 103,
    date: "2025-08-12",
    youGave: {
      name: "Indoor Plant Collection",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      category: "Plants"
    },
    youGot: {
      name: "Ceramic Pots Set",
      image: "https://images.unsplash.com/photo-1605745341112-85968c1f524e?w=300&h=300&fit=crop",
      category: "Home"
    },
    partner: {
      name: "Emma L.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      distance: "0.8 miles"
    },
    location: "Oakland, CA"
  }
];

export default function MatchesPage() {
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
            <h1 className="text-lg font-semibold text-slate-900">Trade History</h1>
            <div className="w-9" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {tradeHistory.length === 0 ? (
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="p-12">
                <h2 className="text-xl font-semibold text-slate-900 mb-2">
                  No trades yet
                </h2>
                <p className="text-slate-600 mb-6">
                  When you complete swaps, they’ll show up here.
                </p>
                <Link href="/swipe">
                  <Button>
                    Start Swiping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            tradeHistory.map((t) => (
              <Card key={t.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      <span>{new Date(t.date).toLocaleDateString()}</span>
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Avatar 
                        src={t.partner.avatar}
                        alt={t.partner.name}
                        fallback={t.partner.name.charAt(0)}
                        className="h-8 w-8"
                      />
                      <div className="text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{t.partner.name}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-slate-600">{t.partner.rating}</span>
                          </div>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{t.partner.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
                    {/* You Gave */}
                    <div className="sm:col-span-2">
                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">You gave</div>
                      <div className="flex items-center gap-3">
                        <img src={t.youGave.image} alt={t.youGave.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div>
                          <div className="font-medium text-slate-900">{t.youGave.name}</div>
                          <Badge variant="outline" className="text-xs mt-1">{t.youGave.category}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:flex items-center justify-center">
                      <ArrowLeftRight className="h-5 w-5 text-slate-400" />
                    </div>

                    {/* You Got */}
                    <div className="sm:col-span-2">
                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">You got</div>
                      <div className="flex items-center gap-3">
                        <img src={t.youGot.image} alt={t.youGot.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div>
                          <div className="font-medium text-slate-900">{t.youGot.name}</div>
                          <Badge variant="outline" className="text-xs mt-1">{t.youGot.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-slate-600 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{t.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
