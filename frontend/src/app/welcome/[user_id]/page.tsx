"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Sparkles, ArrowRight } from "lucide-react";

export default function WelcomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">GreenSwap</h1>
            </div>
            {/* <div className="flex items-center gap-4">
              <Link href="/swipe">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  Start Swiping
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  Profile
                </Button>
              </Link>
              <Link href="/matches">
                <Button variant="ghost" size="sm">
                  Matches
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Welcome back!
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Ready to discover amazing items?
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Your sustainable journey continues. Find your next favorite item or share something special with the community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/swipe">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                Start Swiping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="lg">
                Manage Profile
              </Button>
            </Link>
            <Link href="/matches">
              <Button variant="outline" size="lg">
                Matches
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
