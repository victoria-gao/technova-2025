"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import apiService from "@/lib/api";

export default function ProfilePage() {
  const params = useParams();
  const userId = typeof params.username === "string" ? params.username : Array.isArray(params.username) ? params.username[0] : undefined; // e.g., "652a3e...abc"

  const [profile, setProfile] = useState<any>(null);
  const [myItems, setMyItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        console.error("No userId found in params");
        return;
      }
      try {
        const profileData = await apiService.getUser(userId);
        const itemsData = await apiService.getUserItems(userId);
        setProfile(profileData);
        setMyItems(itemsData);
      } catch (err) {
        console.error("Error fetching user/items:", err);
      }
    }
    fetchData();
  }, [userId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}'s Profile</h1>
      <p>Location: {profile.location}</p>
      <p>Bio: {profile.bio}</p>

      <h2>My Items</h2>
      {myItems.map(item => (
        <div key={item._id}>{item.name}</div>
      ))}
    </div>
  );
}
