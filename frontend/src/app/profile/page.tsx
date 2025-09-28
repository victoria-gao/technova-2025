"use client";

import { useState, useEffect, useMemo } from "react";
import apiService from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft, Camera, MapPin, Edit3, Plus, Trash2, X, Star } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const userId = "YOUR_USER_ID"; // replace with logged-in user's ID

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>({});
  const [myItems, setMyItems] = useState<any[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    category: "",
    condition: "Excellent",
    photoFile: null as File | null,
    photoPreview: "" as string
  });

  const categoryOptions = useMemo(() => ["Electronics","Fashion","Kitchen","Books","Plants","Home","Toys","Other"], []);
  const conditionOptions = ["Excellent", "Good", "Fair"] as const;

  // Fetch profile and items
  useEffect(() => {
    async function fetchData() {
      try {
        const profileData = await apiService.getUser(userId);
        const itemsData = await apiService.getUserItems(userId);

        setProfile({
          name: profileData.name,
          bio: profileData.bio,
          location: profileData.location,
          avatar: profileData.avatar || "https://via.placeholder.com/150",
          rating: profileData.rating || 0,
          swaps: profileData.swaps || 0,
          joined: profileData.joined || "N/A",
        });

        setMyItems(itemsData);
      } catch (error) {
        console.error("Error fetching profile/items:", error);
      }
    }
    fetchData();
  }, []);

  const resetNewItem = () => {
    if (newItem.photoPreview) URL.revokeObjectURL(newItem.photoPreview);
    setNewItem({ name: "", description: "", category: "", condition: "Excellent", photoFile: null, photoPreview: "" });
  };

  // Add item and upload to backend
  const handleAddItemSubmit = async () => {
    if (!newItem.name.trim() || !newItem.description.trim()) return;

    try {
      let imageUrl = "";
      if (newItem.photoFile) {
        const uploadRes = await apiService.uploadImage(newItem.photoFile);
        imageUrl = uploadRes.url; // adjust based on your backend
      }

      const savedItem = await apiService.createItem({
        user_id: userId,
        name: newItem.name.trim(),
        description: newItem.description.trim(),
        category: newItem.category || "Other",
        condition: newItem.condition,
        image: imageUrl || "https://via.placeholder.com/300x300.png?text=Item",
        status: "Available",
      });

      setMyItems([...myItems, savedItem]);
      setIsAddModalOpen(false);
      resetNewItem();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update profile
  const handleSave = async () => {
    try {
      await apiService.updateProfile(userId, {
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
        avatar: profile.avatar,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/welcome">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-2"/>Back</Button>
          </Link>
          <h1 className="text-lg font-semibold text-slate-900">My Profile</h1>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}><Edit3 className="h-4 w-4"/></Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
        {/* Profile Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="relative">
              <Avatar src={profile.avatar} alt={profile.name} fallback={profile.name?.charAt(0)} className="h-24 w-24"/>
              {isEditing && <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8"><Camera className="h-4 w-4"/></Button>}
            </div>
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div><Label htmlFor="name">Name</Label><Input id="name" value={profile.name} onChange={(e)=>setProfile({...profile,name:e.target.value})} className="mt-1"/></div>
                  <div><Label htmlFor="bio">Bio</Label><Textarea id="bio" value={profile.bio} onChange={(e)=>setProfile({...profile,bio:e.target.value})} className="mt-1" rows={3}/></div>
                  <div><Label htmlFor="location">Location</Label><Input id="location" value={profile.location} onChange={(e)=>setProfile({...profile,location:e.target.value})} className="mt-1"/></div>
                  <div className="flex gap-3"><Button onClick={handleSave}>Save Changes</Button><Button variant="outline" onClick={()=>setIsEditing(false)}>Cancel</Button></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
                  <div className="flex items-center gap-2 text-slate-600"><MapPin className="h-4 w-4"/><span>{profile.location}</span></div>
                  <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500 fill-current"/><span className="text-sm font-medium">{profile.rating}</span></div>
                    <div className="text-sm text-slate-600">{profile.swaps} swaps</div>
                    <div className="text-sm text-slate-600">Joined {profile.joined}</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* My Items Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex items-center justify-between">
            <div><CardTitle>My Items</CardTitle><CardDescription>Items you've listed for swapping</CardDescription></div>
            <Button size="sm" onClick={()=>setIsAddModalOpen(true)}><Plus className="h-4 w-4 mr-2"/>Add Item</Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                    <div className="absolute top-2 left-2">
                      <Badge variant={item.status==="Available"?"default":item.status==="Pending"?"secondary":"outline"}>{item.status}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{item.description}</p>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Item Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={()=>{ setIsAddModalOpen(false); resetNewItem(); }}/>
          <div className="relative z-[61] w-full max-w-lg mx-4">
            <div className="bg-white rounded-xl shadow-2xl border">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-slate-900">Add New Item</h3>
                <Button variant="ghost" size="icon" onClick={()=>{ setIsAddModalOpen(false); resetNewItem(); }} className="h-9 w-9"><X className="h-4 w-4"/></Button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2"><Label htmlFor="item-name">Item Name</Label><Input id="item-name" placeholder="e.g., Vintage Camera" value={newItem.name} onChange={(e)=>setNewItem({...newItem,name:e.target.value})}/></div>
                <div className="space-y-2"><Label htmlFor="item-description">Description</Label><Textarea id="item-description" rows={4} placeholder="Describe the item's condition, brand, size, and any details buyers should know." value={newItem.description} onChange={(e)=>setNewItem({...newItem,description:e.target.value})}/></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="item-condition">Condition</Label>
                    <select id="item-condition" className="w-full h-10 border rounded-md px-3 text-sm bg-white" value={newItem.condition} onChange={(e)=>setNewItem({...newItem,condition:e.target.value})}>
                      {conditionOptions.map(opt=><option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2"><Label htmlFor="item-category">Category</Label>
                    <select id="item-category" className="w-full h-10 border rounded-md px-3 text-sm bg-white" value={newItem.category} onChange={(e)=>setNewItem({...newItem,category:e.target.value})}>
                      <option value="" disabled>Select a category</option>
                      {categoryOptions.map(opt=><option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-photo">Item Photo</Label>
                  <div className="flex items-center gap-4">
                    <Input id="item-photo" type="file" accept="image/*" onChange={(e)=>{
                      const file = e.target.files?.[0]||null;
                      if(!file){if(newItem.photoPreview)URL.revokeObjectURL(newItem.photoPreview);setNewItem({...newItem,photoFile:null,photoPreview:""});return;}
                      const preview = URL.createObjectURL(file);
                      if(newItem.photoPreview)URL.revokeObjectURL(newItem.photoPreview);
                      setNewItem({...newItem,photoFile:file,photoPreview:preview});
                    }}/>
                    {newItem.photoPreview && <img src={newItem.photoPreview} alt="Preview" className="h-16 w-16 object-cover rounded-md border"/>}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
                <Button variant="outline" onClick={()=>{ setIsAddModalOpen(false); resetNewItem(); }}>Cancel</Button>
                <Button onClick={handleAddItemSubmit} disabled={!newItem.name.trim()||!newItem.description.trim()} className="bg-emerald-600 hover:bg-emerald-700">Add Item</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
