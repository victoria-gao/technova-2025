"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Recycle, Heart, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-pink-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">Welcome to GreenSwap!</h1>
            <p className="text-lg text-green-600 mb-8">Start discovering amazing items in your community</p>
            <div className="flex gap-4 justify-center">
              <Link href="/swipe">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Swiping
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  My Profile
                </Button>
              </Link>
              <Link href="/matches">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-pink-500 text-pink-500 hover:bg-pink-50 bg-transparent"
                >
                  My Matches
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">GreenSwap</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-green-600 hover:text-green-700">
                About
              </Button>
              <Button variant="ghost" className="text-green-600 hover:text-green-700">
                How it Works
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Section */}
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-green-800 leading-tight">
              Swipe Right for a<span className="text-pink-500"> Sustainable</span> Future
            </h2>
            <p className="text-xl text-green-600 leading-relaxed">
              Discover, exchange, and give new life to pre-loved items in your community. Join thousands making a
              positive impact on our planet, one swap at a time.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">50K+</div>
                <div className="text-sm text-green-600">Items Exchanged</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">25K+</div>
                <div className="text-sm text-green-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">100+</div>
                <div className="text-sm text-green-600">Cities</div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Recycle className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-green-700">Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
                <span className="text-green-700">Community Driven</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-green-700">Local Network</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Leaf className="h-5 w-5 text-pink-500" />
                </div>
                <span className="text-green-700">Zero Waste</span>
              </div>
            </div>
          </div>

          {/* Auth Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-green-800">Join GreenSwap</CardTitle>
                <CardDescription className="text-green-600">Start your sustainable journey today</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsLoggedIn(true)}>
                      Sign In
                    </Button>
                    <div className="text-center">
                      <Button variant="link" className="text-green-600 hover:text-green-700">
                        Forgot password?
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" placeholder="your@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input id="signup-password" type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsLoggedIn(true)}>
                      Create Account
                    </Button>
                    <p className="text-xs text-center text-green-600">
                      By signing up, you agree to our Terms and Privacy Policy
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
