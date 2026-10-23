/**
 * Dashboard Store — API layer + state types for the AHP Dashboard
 * Uses Supabase KV via the Edge Function server for persistence.
 * Session is identified by a localStorage UUID (pre-auth pattern).
 */

import { projectId, publicAnonKey } from "/utils/supabase/info";
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
  "Content-Type": "application/json",
  ...extra,
});

// ─── Session ────────────────────────────────────────────────

const SESSION_KEY = "ahp-session-id";
const PROFILE_KEY = "ahp-dashboard-profile";

export function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
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
  if (data?.data) return data.data;
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
  if (data?.progress) return data.progress;
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
  if (data?.data) return data.data;
  try {
    return JSON.parse(localStorage.getItem("ahp-activity") || "[]");
  } catch {
    return [];
  }
}

export async function saveActivity(events: ActivityEvent[]): Promise<void> {
  // Keep last 100 events
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
  if (data?.data) return data.data;
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
  if (data?.data) return data.data;
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

// ─── Full Dashboard Load ────────────────────────────────────

export async function loadDashboard(): Promise<DashboardData> {
  const [profile, progress, activity, mentorMemories, enrolledCourses] = await Promise.all([
    loadProfile(),
    loadProgress(),
    loadActivity(),
    loadMentorMemories(),
    loadEnrolledCourses(),
  ]);
  return { profile, progress, activity, mentorMemories, enrolledCourses };
}

// ─── Computed helpers ───────────────────────────────────────

export function getAllLessons(): { lesson: MentorLesson; module: MentorModule; mentor: MentorPersona; category: MentorCategory }[] {
  const result: { lesson: MentorLesson; module: MentorModule; mentor: MentorPersona; category: MentorCategory }[] = [];
  for (const cat of mentorCategories) {
    for (const mentor of cat.mentors) {
      for (const mod of mentor.course.modules) {
        for (const lesson of mod.lessons) {
          result.push({ lesson, module: mod, mentor, category: cat });
        }
      }
    }
  }
  return result;
}

export function computeOverallProgress(progress: Record<string, boolean>): number {
  const all = getAllLessons();
  if (all.length === 0) return 0;
  const completed = all.filter((l) => progress[l.lesson.id]);
  return Math.round((completed.length / all.length) * 100);
}

export function computeCourseProgress(
  progress: Record<string, boolean>,
  mentorId: string,
): number {
  const lessons = getAllLessons().filter((l) => l.mentor.id === mentorId);
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((l) => progress[l.lesson.id]);
  return Math.round((completed.length / lessons.length) * 100);
}

export function getNextLesson(
  progress: Record<string, boolean>,
  mentorId?: string,
): { lesson: MentorLesson; module: MentorModule; mentor: MentorPersona; category: MentorCategory } | null {
  const all = mentorId
    ? getAllLessons().filter((l) => l.mentor.id === mentorId)
    : getAllLessons();
  return all.find((l) => !progress[l.lesson.id]) ?? null;
}

export function computeMasteryStage(progress: Record<string, boolean>): MasteryStage {
  const pct = computeOverallProgress(progress);
  if (pct >= 75) return "impact";
  if (pct >= 50) return "mastery";
  if (pct >= 25) return "growth";
  return "foundation";
}

export function getCompletedMilestones(progress: Record<string, boolean>): string[] {
  const milestones: string[] = [];
  for (const cat of mentorCategories) {
    for (const mentor of cat.mentors) {
      for (const mod of mentor.course.modules) {
        const allDone = mod.lessons.every((l) => progress[l.id]);
        if (allDone) milestones.push(`${mentor.name}: ${mod.title}`);
      }
      const allCourseDone = mentor.course.modules.every((m) =>
        m.lessons.every((l) => progress[l.id]),
      );
      if (allCourseDone) milestones.push(`${mentor.name}: Full Course Complete`);
    }
  }
  return milestones;
}

export function getRecentCompletions(progress: Record<string, boolean>, activity: ActivityEvent[]): ActivityEvent[] {
  return activity
    .filter((e) => e.type === "lesson_completed" || e.type === "milestone_unlocked")
    .slice(-10)
    .reverse();
}

// ─── "Logged in" check (localStorage simulation) ────────────

export function isLoggedIn(): boolean {
  return localStorage.getItem("ahp-logged-in") === "true";
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
    localStorage.setItem("ahp-dashboard-profile", JSON.stringify(profile));
  }
}

export function logout(): void {
  localStorage.removeItem("ahp-logged-in");
}
