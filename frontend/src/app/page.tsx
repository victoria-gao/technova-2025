"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import apiService from "@/lib/api";
import { 
  Leaf, 
  Recycle, 
  Heart, 
  Users, 
  Globe,
  Shield
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loading, setLoading] = useState<{ login: boolean; signup: boolean }>({ login: false, signup: false });
  const [error, setError] = useState<{ login?: string; signup?: string }>({});

  const handleLogin = async () => {
    setError({});
    setLoading((s) => ({ ...s, login: true }));
    try {
      const data = await apiService.login({ email: loginEmail, password: loginPassword });
      // Optionally persist minimal user info
      if (data?.user_id) {
        try {
          localStorage.setItem("gs_user", JSON.stringify(data));
        } catch {}
      }
      router.push(`/welcome/${data.user_id}`);
    } catch (e: any) {
      const message = e?.response?.data?.error || "Failed to sign in. Please try again.";
      setError((s) => ({ ...s, login: message }));
    } finally {
      setLoading((s) => ({ ...s, login: false }));
    }
  };

  const handleSignup = async () => {
    setError({});
    setLoading((s) => ({ ...s, signup: true }));
    try {
      await apiService.signup({ username: signupName, email: signupEmail, password: signupPassword });
      // After successful signup, attempt login to streamline UX
      try {
        const data = await apiService.login({ email: signupEmail, password: signupPassword });
        if (data?.user_id) {
          try {
            localStorage.setItem("gs_user", JSON.stringify(data));
          } catch {}
        }
      } catch {}
      router.push("/welcome");
    } catch (e: any) {
      const message = e?.response?.data?.error || "Failed to create account. Please try again.";
      setError((s) => ({ ...s, signup: message }));
    } finally {
      setLoading((s) => ({ ...s, signup: false }));
    }
  };

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
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                How it works
              </Button>
              <Button variant="ghost" size="sm">
                About
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                  One's Trash Can Be Another's{" "}
                  <span className="text-emerald-600">Treasure</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Discover, exchange, and give new life to pre-loved items in your community. 
                  Join thousands making a positive impact on our planet, one swap at a time.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Recycle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Eco-friendly</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Heart className="h-5 w-5 text-pink-500" />
                  </div>
                  <span className="text-slate-700 font-medium">Community driven</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Local network</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <span className="text-slate-700 font-medium">Safe & secure</span>
                </div>
              </div>
            </div>

            {/* Auth Card */}
            <div className="flex justify-center">
              <Card className="w-full max-w-md shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-slate-900">Join GreenSwap</CardTitle>
                  <CardDescription className="text-slate-600">
                    Start your sustainable journey today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      {error.login && (
                        <p className="text-sm text-red-600" role="alert">{error.login}</p>
                      )}
                      <Button 
                        className="w-full h-11 bg-emerald-600 hover:bg-emerald-700" 
                        onClick={handleLogin}
                        disabled={loading.login}
                      >
                        {loading.login ? "Signing In..." : "Sign In"}
                      </Button>
                      <div className="text-center">
                        <Button variant="link" className="text-slate-600 hover:text-slate-900">
                          Forgot password?
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          placeholder="Your Name" 
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input 
                          id="signup-email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input 
                          id="signup-password" 
                          type="password" 
                          placeholder="••••••••" 
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      {error.signup && (
                        <p className="text-sm text-red-600" role="alert">{error.signup}</p>
                      )}
                      <Button 
                        className="w-full h-11 bg-emerald-600 hover:bg-emerald-700" 
                        onClick={handleSignup}
                        disabled={loading.signup}
                      >
                        {loading.signup ? "Creating Account..." : "Create Account"}
                      </Button>
                      <p className="text-xs text-center text-slate-500">
                        By signing up, you agree to our Terms and Privacy Policy
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why choose GreenSwap?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're building a community that values sustainability, connection, and giving items a second life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="mx-auto p-3 bg-emerald-100 rounded-full w-fit mb-4">
                  <Recycle className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Reduce Waste</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Give items a second life and reduce your environmental footprint while discovering amazing finds.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Build Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Connect with like-minded people in your area who share your values for sustainable living.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardHeader>
                <div className="mx-auto p-3 bg-pink-100 rounded-full w-fit mb-4">
                  <Heart className="h-8 w-8 text-pink-500" />
                </div>
                <CardTitle className="text-xl">Save Money</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Discover quality items at no cost while decluttering your space and helping others.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}