import { createBrowserRouter, Outlet, Navigate, useRouteError } from "react-router";
import { HomePage } from "./components/HomePage";
import { AchievementsPage } from "./components/AchievementsPage";
import { LearningPage } from "./components/learning/LearningPage";
import { LearningPathPage } from "./components/learning/LearningPathPage";
import { SpiritualPage } from "./components/SpiritualPage";
import { ToolsHubPage } from "./components/tools/ToolsHubPage";
import { MentorSelectPage } from "./components/tools/MentorSelectPage";
import { MentorSessionPage } from "./components/tools/MentorSessionPage";
import { ToolsPage } from "./components/tools/ToolsPage";
import { CoursePage } from "./components/tools/CoursePage";
import { CommunityPage } from "./components/community/CommunityPage";
import { StoryDetailPage } from "./components/community/StoryDetailPage";
import { CallToActionPage } from "./components/CallToActionPage";
import { LoginPage } from "./components/dashboard/LoginPage";
import { GetStartedPage } from "./components/GetStartedPage";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { DashboardHome } from "./components/dashboard/DashboardHome";
import { MyCoursesPage } from "./components/dashboard/MyCoursesPage";
import { MasteryMapPage } from "./components/dashboard/MasteryMapPage";
import { ProfilePage } from "./components/dashboard/ProfilePage";

function RootErrorBoundary() {
  const error: any = useRouteError();
  console.error("Router error:", error);
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-4 font-bold text-sm">
          AHP
        </div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#000", marginBottom: "0.5rem" }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: "0.8125rem", color: "rgba(0,0,0,0.5)", marginBottom: "1.5rem" }}>
          {error?.message || "An unexpected error occurred while loading this page."}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-full border border-black/[0.1] text-xs font-semibold cursor-pointer hover:bg-black/[0.04]"
          >
            Reload Page
          </button>
          <button
            onClick={() => { window.location.href = "/dashboard"; }}
            className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-semibold cursor-pointer hover:opacity-90"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function RootLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RootErrorBoundary,
    children: [
      // ─── Public Routes ───
      { index: true, Component: HomePage },
      { path: "achievements", Component: AchievementsPage },
      { path: "learn", Component: LearningPage },
      { path: "learn/:slug", Component: LearningPathPage },
      { path: "spiritual", Component: SpiritualPage },
      { path: "community", Component: CommunityPage },
      { path: "community/:storyId", Component: StoryDetailPage },
      { path: "tools", Component: ToolsHubPage },
      { path: "tools/browse", Component: ToolsPage },
      { path: "tools/course/:courseId", Component: CoursePage },
      // Mentor routes — dynamic segments placed after static paths
      { path: "tools/:categorySlug/:mentorId", Component: MentorSessionPage },
      { path: "tools/:categorySlug", Component: MentorSelectPage },
      { path: "join", Component: CallToActionPage },
      { path: "login", Component: LoginPage },
      { path: "get-started", Component: GetStartedPage },

      // ─── Dashboard Routes (logged-in environment) ───
      {
        path: "dashboard",
        Component: DashboardLayout,
        children: [
          { index: true, Component: DashboardHome },
          { path: "courses", Component: MyCoursesPage },
          { path: "mastery-map", Component: MasteryMapPage },
          { path: "profile", Component: ProfilePage },
        ],
      },

      // ─── Catch-all Fallback ───
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);