import { createBrowserRouter, Outlet, Navigate } from "react-router";
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

function RootLayout() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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