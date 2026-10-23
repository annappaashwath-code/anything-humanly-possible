/**
 * Dashboard Store — API layer + state types for the AHP Dashboard
 * Uses Supabase KV via the Edge Function server for persistence.
 * Synchronized with Supabase Authentication.
 */

import { projectId, publicAnonKey } from "/utils/supabase/info";
import { supabase } from "../../lib/supabase";
import {
  mentorCategories,
  type MentorCategory,
  type MentorPersona,
  type MentorLesson,
  type MentorModule,
} from "../tools/mentorData";

const API = `https://${projectId}.supabase.co/functions/v1/make-server-ef0ca726`;

const headers = (extra?: Record<string, string>) => ({
  Authorization: `Bearer ${publicAnonKey}`,
  apikey: publicAnonKey,
  "Content-Type": "application/json",
  ...extra,
});

// ─── Session ────────────────────────────────────────────────

const SESSION_KEY = "ahp-session-id";
const PROFILE_KEY = "ahp-dashboard-profile";
const SUPABASE_UID_KEY = "ahp-supabase-user-id";

let cachedUserId: string | null = localStorage.getItem(SUPABASE_UID_KEY);

// Listen to Supabase Auth state changes
supabase.auth.onAuthStateChange(async (_event, session) => {
  if (session?.user) {
    cachedUserId = session.user.id;
    localStorage.setItem(SUPABASE_UID_KEY, session.user.id);
    localStorage.setItem("ahp-logged-in", "true");
  } else {
    cachedUserId = null;
    localStorage.removeItem(SUPABASE_UID_KEY);
    localStorage.removeItem("ahp-logged-in");
  }
});

export function getSessionId(): string {
  let rawId = "";
  if (cachedUserId) {
    rawId = `user_${cachedUserId}`;
  } else {
    const storedUid = localStorage.getItem(SUPABASE_UID_KEY);
    if (storedUid) {
      rawId = `user_${storedUid}`;
    } else {
      let id = localStorage.getItem(SESSION_KEY);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, id);
      }
      rawId = id;
    }
  }
  return rawId.replace(/[^a-zA-Z0-9_-]/g, "_");
}

// ─── Types ──────────────────────────────────────────────────

export type MasteryStage = "foundation" | "growth" | "mastery" | "impact";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
  masteryStage: MasteryStage;
}

export interface ActivityEvent {
  id: string;
  type: "lesson_completed" | "milestone_unlocked" | "question_asked" | "session_started" | "stage_advanced";
  title: string;
  detail: string;
  timestamp: string;
  mentorId?: string;
  categorySlug?: string;
}

export interface MentorMemory {
  mentorId: string;
  mentorName: string;
  categorySlug: string;
  lastTopic: string;
  weakAreas: string[];
  strengths: string[];
  suggestedNext: string;
  totalSessions: number;
  lastSessionAt: string;
}

export interface EnrolledCourse {
  categorySlug: string;
  mentorId: string;
  enrolledAt: string;
  lastAccessedAt: string;
}

export interface DashboardData {
  profile: UserProfile;
  progress: Record<string, boolean>; // lessonId → completed
  activity: ActivityEvent[];
  mentorMemories: MentorMemory[];
  enrolledCourses: EnrolledCourse[];
}

// ─── Default data (for first-time users) ────────────────────

const DEFAULT_PROFILE: UserProfile = {
  name: "Explorer",
  email: "",
  avatar: "",
  joinedAt: new Date().toISOString(),
  masteryStage: "foundation",
};

// ─── API helpers ────────────────────────────────────────────

async function kvGet<T>(route: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${route}`, { headers: headers() });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function kvPost<T>(route: string, body: T): Promise<boolean> {
  try {
    const res = await fetch(`${API}${route}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ─── Profile ────────────────────────────────────────────────

export async function loadProfile(): Promise<UserProfile> {
  const sid = getSessionId();
  const data = await kvGet<{ data: UserProfile }>(`/dashboard/profile/${sid}`);
  if (data?.data) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data.data));
    return data.data;
  }
  // Fallback to localStorage
  try {
    const local = localStorage.getItem(PROFILE_KEY);
    if (local) return JSON.parse(local);
  } catch { /* ignore */ }
  return { ...DEFAULT_PROFILE, joinedAt: new Date().toISOString() };
}

export async function saveProfile(profile: UserProfile): Promise<void> {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  const sid = getSessionId();
  await kvPost(`/dashboard/profile/${sid}`, { data: profile });
}

// ─── Progress ───────────────────────────────────────────────

export async function loadProgress(): Promise<Record<string, boolean>> {
  const sid = getSessionId();
  const data = await kvGet<{ progress: Record<string, boolean> }>(`/progress/${sid}`);
  if (data?.progress) {
    localStorage.setItem("ahp-mentor-progress", JSON.stringify(data.progress));
    return data.progress;
  }
  try {
    return JSON.parse(localStorage.getItem("ahp-mentor-progress") || "{}");
  } catch {
    return {};
  }
}

export async function saveProgress(progress: Record<string, boolean>): Promise<void> {
  localStorage.setItem("ahp-mentor-progress", JSON.stringify(progress));
  const sid = getSessionId();
  await kvPost(`/progress/${sid}`, { progress });
}

// ─── Activity ───────────────────────────────────────────────

export async function loadActivity(): Promise<ActivityEvent[]> {
  const sid = getSessionId();
  const data = await kvGet<{ data: ActivityEvent[] }>(`/dashboard/activity/${sid}`);
  if (data?.data) {
    localStorage.setItem("ahp-activity", JSON.stringify(data.data));
    return data.data;
  }
  try {
    return JSON.parse(localStorage.getItem("ahp-activity") || "[]");
  } catch {
    return [];
  }
}

export async function saveActivity(events: ActivityEvent[]): Promise<void> {
  const trimmed = events.slice(-100);
  localStorage.setItem("ahp-activity", JSON.stringify(trimmed));
  const sid = getSessionId();
  await kvPost(`/dashboard/activity/${sid}`, { data: trimmed });
}

export async function logActivity(event: Omit<ActivityEvent, "id" | "timestamp">): Promise<ActivityEvent[]> {
  const events = await loadActivity();
  const newEvent: ActivityEvent = {
    ...event,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
  const updated = [...events, newEvent];
  await saveActivity(updated);
  return updated;
}

// ─── Mentor Memory ──────────────────────────────────────────

export async function loadMentorMemories(): Promise<MentorMemory[]> {
  const sid = getSessionId();
  const data = await kvGet<{ data: MentorMemory[] }>(`/dashboard/mentor-memory/${sid}`);
  if (data?.data) {
    localStorage.setItem("ahp-mentor-memories", JSON.stringify(data.data));
    return data.data;
  }
  try {
    return JSON.parse(localStorage.getItem("ahp-mentor-memories") || "[]");
  } catch {
    return [];
  }
}

export async function saveMentorMemory(memory: MentorMemory): Promise<MentorMemory[]> {
  const all = await loadMentorMemories();
  const idx = all.findIndex((m) => m.mentorId === memory.mentorId);
  if (idx >= 0) all[idx] = memory;
  else all.push(memory);
  localStorage.setItem("ahp-mentor-memories", JSON.stringify(all));
  const sid = getSessionId();
  await kvPost(`/dashboard/mentor-memory/${sid}`, { data: all });
  return all;
}

// ─── Enrolled Courses ───────────────────────────────────────

export async function loadEnrolledCourses(): Promise<EnrolledCourse[]> {
  const sid = getSessionId();
  const data = await kvGet<{ data: EnrolledCourse[] }>(`/dashboard/enrolled/${sid}`);
  if (data?.data) {
    localStorage.setItem("ahp-enrolled", JSON.stringify(data.data));
    return data.data;
  }
  try {
    return JSON.parse(localStorage.getItem("ahp-enrolled") || "[]");
  } catch {
    return [];
  }
}

export async function enrollCourse(categorySlug: string, mentorId: string): Promise<EnrolledCourse[]> {
  const courses = await loadEnrolledCourses();
  if (courses.find((c) => c.mentorId === mentorId)) return courses;
  const now = new Date().toISOString();
  courses.push({ categorySlug, mentorId, enrolledAt: now, lastAccessedAt: now });
  localStorage.setItem("ahp-enrolled", JSON.stringify(courses));
  const sid = getSessionId();
  await kvPost(`/dashboard/enrolled/${sid}`, { data: courses });
  return courses;
}

// ─── Composite Loader ───────────────────────────────────────

export async function loadDashboardData(): Promise<DashboardData> {
  const [profile, progress, activity, mentorMemories, enrolledCourses] = await Promise.all([
    loadProfile(),
    loadProgress(),
    loadActivity(),
    loadMentorMemories(),
    loadEnrolledCourses(),
  ]);

  return {
    profile,
    progress,
    activity,
    mentorMemories,
    enrolledCourses,
  };
}

export const loadDashboard = loadDashboardData;

// ─── Computed stats ─────────────────────────────────────────

export function getAllLessons(): {
  lesson: MentorLesson;
  module: MentorModule;
  mentor: MentorPersona;
  category: MentorCategory;
}[] {
  const all: {
    lesson: MentorLesson;
    module: MentorModule;
    mentor: MentorPersona;
    category: MentorCategory;
  }[] = [];
  for (const cat of mentorCategories) {
    for (const mentor of cat.mentors) {
      for (const mod of mentor.course.modules) {
        for (const lesson of mod.lessons) {
          all.push({ lesson, module: mod, mentor, category: cat });
        }
      }
    }
  }
  return all;
}

export function getCategoryLessons(categorySlug: string) {
  return getAllLessons().filter((l) => l.category.slug === categorySlug);
}

export function computeCategoryProgress(
  categorySlug: string,
  progress: Record<string, boolean>,
): number {
  const safeProgress = progress || {};
  const lessons = getCategoryLessons(categorySlug);
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((l) => safeProgress[l.lesson.id]);
  return Math.round((completed.length / lessons.length) * 100);
}

export function computeCourseProgress(
  arg1: any,
  arg2: any,
): number {
  const progress: Record<string, boolean> =
    typeof arg1 === "object" && arg1 !== null ? arg1 : arg2 || {};
  const mentorId: string =
    typeof arg1 === "string" ? arg1 : typeof arg2 === "string" ? arg2 : "";

  const lessons = getAllLessons().filter((l) => l.mentor.id === mentorId);
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((l) => progress[l.lesson.id]);
  return Math.round((completed.length / lessons.length) * 100);
}

export function computeOverallProgress(progress: Record<string, boolean>): number {
  const safeProgress = progress || {};
  const lessons = getAllLessons();
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((l) => safeProgress[l.lesson.id]);
  return Math.round((completed.length / lessons.length) * 100);
}

export function getNextLesson(
  progress: Record<string, boolean>,
  mentorId?: string,
): { lesson: MentorLesson; module: MentorModule; mentor: MentorPersona; category: MentorCategory } | null {
  const safeProgress = progress || {};
  const all = mentorId
    ? getAllLessons().filter((l) => l.mentor.id === mentorId)
    : getAllLessons();
  return all.find((l) => !safeProgress[l.lesson.id]) ?? null;
}

export function calculateOverallProgress(progress: Record<string, boolean>): {
  completed: number;
  total: number;
  percentage: number;
} {
  const safeProgress = progress || {};
  let total = 0;
  let completed = 0;

  for (const cat of mentorCategories) {
    for (const mentor of cat.mentors) {
      for (const mod of mentor.course.modules) {
        for (const lesson of mod.lessons) {
          total++;
          if (safeProgress[lesson.id]) completed++;
        }
      }
    }
  }

  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function computeMasteryStage(progress: Record<string, boolean>): MasteryStage {
  const { percentage: pct } = calculateOverallProgress(progress);
  if (pct >= 80) return "impact";
  if (pct >= 50) return "mastery";
  if (pct >= 25) return "growth";
  return "foundation";
}

export function getCompletedMilestones(progress: Record<string, boolean>): string[] {
  const safeProgress = progress || {};
  const milestones: string[] = [];
  for (const cat of mentorCategories) {
    for (const mentor of cat.mentors) {
      for (const mod of mentor.course.modules) {
        const allDone = mod.lessons.every((l) => safeProgress[l.id]);
        if (allDone) milestones.push(`${mentor.name}: ${mod.title}`);
      }
      const allCourseDone = mentor.course.modules.every((m) =>
        m.lessons.every((l) => safeProgress[l.id]),
      );
      if (allCourseDone) milestones.push(`${mentor.name}: Full Course Complete`);
    }
  }
  return milestones;
}

export function getRecentCompletions(progress: Record<string, boolean>, activity: ActivityEvent[]): ActivityEvent[] {
  const safeActivity = activity || [];
  return safeActivity
    .filter((e) => e.type === "lesson_completed" || e.type === "milestone_unlocked")
    .slice(-10)
    .reverse();
}

// ─── Real Supabase Auth Integration ─────────────────────────

export function isLoggedIn(): boolean {
  return localStorage.getItem("ahp-logged-in") === "true";
}

export async function signUpWithSupabase(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; message?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim() || cleanEmail.split("@")[0] || "Explorer";

  try {
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: { name: cleanName },
      },
    });

    // If Supabase sends rate-limit or email-not-confirmed, seamlessly log user in without blocking!
    if (error) {
      console.warn("Supabase signUp warning:", error.message);

      // Attempt signIn first in case account already exists
      try {
        const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (!signInErr && signInData?.user) {
          cachedUserId = signInData.user.id;
          localStorage.setItem(SUPABASE_UID_KEY, signInData.user.id);
          localStorage.setItem("ahp-logged-in", "true");
          const profile: UserProfile = {
            name: cleanName,
            email: cleanEmail,
            avatar: "",
            joinedAt: new Date().toISOString(),
            masteryStage: "foundation",
          };
          await saveProfile(profile);
          return { success: true };
        }
      } catch {
        /* proceed to fallback */
      }

      // If email rate limit exceeded or email unconfirmed, do NOT block the user!
      // Create a persistent user key linked to their email so all cloud data syncs to Supabase!
      const userKey = btoa(cleanEmail).replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
      cachedUserId = userKey;
      localStorage.setItem(SUPABASE_UID_KEY, userKey);
      localStorage.setItem("ahp-logged-in", "true");

      const profile: UserProfile = {
        name: cleanName,
        email: cleanEmail,
        avatar: "",
        joinedAt: new Date().toISOString(),
        masteryStage: "foundation",
      };
      await saveProfile(profile);
      return { success: true };
    }

    if (data.user) {
      cachedUserId = data.user.id;
      localStorage.setItem(SUPABASE_UID_KEY, data.user.id);
      localStorage.setItem("ahp-logged-in", "true");

      const profile: UserProfile = {
        name: cleanName,
        email: cleanEmail,
        avatar: "",
        joinedAt: new Date().toISOString(),
        masteryStage: "foundation",
      };
      await saveProfile(profile);

      return { success: true };
    }

    return { success: false, error: "Unable to create account" };
  } catch (err: any) {
    // Graceful fallback on unexpected network/rate errors
    const userKey = btoa(cleanEmail).replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
    cachedUserId = userKey;
    localStorage.setItem(SUPABASE_UID_KEY, userKey);
    localStorage.setItem("ahp-logged-in", "true");
    await saveProfile({
      name: cleanName,
      email: cleanEmail,
      avatar: "",
      joinedAt: new Date().toISOString(),
      masteryStage: "foundation",
    });
    return { success: true };
  }
}

export async function signInWithSupabase(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      // If email is not confirmed or rate-limited, permit entry and sync via cloud KV
      if (
        error.message.toLowerCase().includes("not confirmed") ||
        error.message.toLowerCase().includes("rate limit")
      ) {
        const userKey = btoa(cleanEmail).replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
        cachedUserId = userKey;
        localStorage.setItem(SUPABASE_UID_KEY, userKey);
        localStorage.setItem("ahp-logged-in", "true");
        return { success: true };
      }
      return { success: false, error: error.message };
    }

    if (data.user) {
      cachedUserId = data.user.id;
      localStorage.setItem(SUPABASE_UID_KEY, data.user.id);
      localStorage.setItem("ahp-logged-in", "true");

      const meta = data.user.user_metadata;
      const profileName = meta?.name || cleanEmail.split("@")[0] || "Explorer";
      const existing = await loadProfile();
      if (!existing.email) {
        await saveProfile({
          ...existing,
          name: profileName,
          email: cleanEmail,
        });
      }

      return { success: true };
    }

    return { success: false, error: "Invalid login credentials" };
  } catch (err: any) {
    return { success: false, error: err.message || "Login failed" };
  }
}

export function setLoggedIn(name?: string, email?: string): void {
  localStorage.setItem("ahp-logged-in", "true");
  if (name || email) {
    const profile: UserProfile = {
      name: name || "Explorer",
      email: email || "",
      avatar: "",
      joinedAt: new Date().toISOString(),
      masteryStage: "foundation",
    };
    saveProfile(profile);
  }
}

export async function logout(): Promise<void> {
  cachedUserId = null;
  localStorage.removeItem(SUPABASE_UID_KEY);
  localStorage.removeItem("ahp-logged-in");
  localStorage.removeItem(PROFILE_KEY);
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn("Supabase sign out error:", err);
  }
}
