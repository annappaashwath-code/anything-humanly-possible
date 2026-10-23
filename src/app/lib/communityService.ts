import { type CommunityPost, communityPosts as defaultPosts } from "../components/community/communityData";
import { API_BASE } from "./supabase";
import { publicAnonKey } from "/utils/supabase/info";

const STORIES_KEY = "ahp_community_stories_cache";
const COMMUNITY_ENDPOINT = `${API_BASE}/progress/community_stories`;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
  apikey: publicAnonKey,
};

export async function fetchCommunityStories(): Promise<CommunityPost[]> {
  try {
    const res = await fetch(COMMUNITY_ENDPOINT, { headers });
    if (res.ok) {
      const data = await res.json();
      const remoteStories = data?.progress?.stories;
      if (Array.isArray(remoteStories) && remoteStories.length > 0) {
        localStorage.setItem(STORIES_KEY, JSON.stringify(remoteStories));
        return remoteStories;
      }
    }
  } catch (err) {
    console.warn("Error fetching community stories from Supabase, using cache:", err);
  }

  // Fallback to localStorage or default seed posts
  try {
    const cached = localStorage.getItem(STORIES_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    /* ignore */
  }

  return defaultPosts;
}

export async function publishCommunityStory(newStory: CommunityPost): Promise<CommunityPost[]> {
  const current = await fetchCommunityStories();
  const updated = [newStory, ...current];

  // Save to localStorage immediately
  localStorage.setItem(STORIES_KEY, JSON.stringify(updated));

  // Persist to Supabase
  try {
    await fetch(COMMUNITY_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ progress: { stories: updated } }),
    });
  } catch (err) {
    console.error("Failed to persist community story to Supabase:", err);
  }

  return updated;
}

export async function toggleLikeCommunityStory(storyId: string): Promise<number | null> {
  const current = await fetchCommunityStories();
  let updatedLikes: number | null = null;

  const updated = current.map((story) => {
    if (story.id === storyId) {
      const newCount = story.likes + 1;
      updatedLikes = newCount;
      return { ...story, likes: newCount };
    }
    return story;
  });

  if (updatedLikes !== null) {
    localStorage.setItem(STORIES_KEY, JSON.stringify(updated));
    try {
      await fetch(COMMUNITY_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({ progress: { stories: updated } }),
      });
    } catch (err) {
      console.warn("Failed to update likes on Supabase:", err);
    }
  }

  return updatedLikes;
}
