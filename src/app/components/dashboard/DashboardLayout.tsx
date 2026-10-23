import { useState, useEffect, createContext, useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  BookOpen,
  Map,
  Users,
  Trophy,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Layers,
} from "lucide-react";
import {
  loadDashboard,
  logout,
  type DashboardData,
  type UserProfile,
} from "./dashboardStore";

/* ════════════════════════════════════════════════════
   Context — share dashboard data across child routes
   ════════════════════════════════════════════════════ */

interface DashboardContextValue {
  data: DashboardData | null;
  loading: boolean;
  reload: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextValue>({
  data: null,
  loading: true,
  reload: async () => {},
});

export function useDashboard() {
  return useContext(DashboardContext);
}

/* ════════════════════════════════════════════════════
   Sidebar Nav Items
   ════════════════════════════════════════════════════ */

const sidebarNav = [
  { label: "Continue Learning", href: "/dashboard", icon: Play, exact: true },
  { label: "My Courses", href: "/dashboard/courses", icon: BookOpen, exact: false },
  { label: "Mastery Map", href: "/dashboard/mastery-map", icon: Map, exact: false },
  { label: "Community", href: "/community", icon: Users, exact: false },
  { label: "Achievements", href: "/achievements", icon: Trophy, exact: false },
  { label: "Profile", href: "/dashboard/profile", icon: User, exact: false },
];

/* ════════════════════════════════════════════════════
   Avatar Component
   ════════════════════════════════════════════════════ */

function ProfileAvatar({ profile, size = 36 }: { profile: UserProfile | null; size?: number }) {
  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "EX";

  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: "#000000",
        color: "#ffffff",
        fontSize: size * 0.36,
        fontWeight: 700,
        letterSpacing: "0.02em",
      }}
    >
      {initials}
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Sidebar
   ════════════════════════════════════════════════════ */

function Sidebar({
  collapsed,
  onToggle,
  profile,
}: {
  collapsed: boolean;
  onToggle: () => void;
  profile: UserProfile | null;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (item: (typeof sidebarNav)[0]) =>
    item.exact ? location.pathname === item.href : location.pathname.startsWith(item.href);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-black/[0.06] flex flex-col overflow-hidden"
      style={{ boxShadow: "2px 0 24px rgba(0,0,0,0.03)" }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 gap-3 flex-shrink-0">
        <button
          onClick={onToggle}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/[0.04] transition-colors cursor-pointer"
        >
          <Layers size={18} style={{ color: "#000000" }} />
        </button>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap"
              style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#000000" }}
            >
              AHP
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-black text-white"
                  : "text-black hover:bg-black/[0.04]"
              }`}
              style={{
                padding: collapsed ? "10px 0" : "10px 14px",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    style={{ fontSize: "0.8125rem", fontWeight: active ? 700 : 550, whiteSpace: "nowrap" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom — Profile summary */}
      <div className="p-3 border-t border-black/[0.06] flex-shrink-0">
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/[0.04] transition-colors cursor-pointer"
          style={{ justifyContent: collapsed ? "center" : "flex-start" }}
        >
          <ProfileAvatar profile={profile} size={32} />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-left min-w-0"
              >
                <p
                  className="truncate"
                  style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000000" }}
                >
                  {profile?.name || "Explorer"}
                </p>
                <p
                  className="truncate"
                  style={{ fontSize: "0.6875rem", fontWeight: 500, color: "#3b82f6" }}
                >
                  {profile?.masteryStage
                    ? profile.masteryStage.charAt(0).toUpperCase() + profile.masteryStage.slice(1) + " Stage"
                    : "Foundation Stage"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}

/* ════════════════════════════════════════════════════
   Top Bar
   ════════════════════════════════════════════════════ */

function TopBar({
  sidebarWidth,
  profile,
  onMobileMenuToggle,
}: {
  sidebarWidth: number;
  profile: UserProfile | null;
  onMobileMenuToggle: () => void;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 bg-white/90 backdrop-blur-xl border-b border-black/[0.04] flex items-center justify-between px-6"
      style={{ left: sidebarWidth }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/[0.04] transition-colors cursor-pointer"
      >
        <Menu size={18} style={{ color: "#000000" }} />
      </button>

      {/* Breadcrumb placeholder */}
      <div className="hidden lg:flex items-center gap-2">
        <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#000000" }}>Dashboard</span>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/[0.04] transition-colors cursor-pointer relative"
          title="Notifications"
        >
          <Bell size={17} style={{ color: "#000000" }} />
          <div
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#D4A017" }}
          />
        </button>
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/[0.04] transition-colors cursor-pointer"
          title="Settings"
        >
          <Settings size={17} style={{ color: "#000000" }} />
        </button>
        <button
          onClick={handleLogout}
          className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-black/[0.04] transition-colors cursor-pointer"
          title="Logout"
        >
          <LogOut size={17} style={{ color: "#000000" }} />
        </button>
        <div className="w-px h-6 bg-black/[0.06] mx-1" />
        <ProfileAvatar profile={profile} size={32} />
      </div>
    </header>
  );
}

/* ════════════════════════════════════════════════════
   Mobile Sidebar Overlay
   ════════════════════════════════════════════════════ */

function MobileSidebar({
  open,
  onClose,
  profile,
}: {
  open: boolean;
  onClose: () => void;
  profile: UserProfile | null;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[260px] bg-white border-r border-black/[0.06] flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-5 flex-shrink-0">
              <span style={{ fontSize: "1rem", fontWeight: 800, color: "#000000" }}>AHP</span>
              <button onClick={onClose} className="cursor-pointer">
                <X size={18} style={{ color: "#000000" }} />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {sidebarNav.map((item) => {
                const Icon = item.icon;
                const active = item.exact
                  ? location.pathname === item.href
                  : location.pathname.startsWith(item.href);
                return (
                  <button
                    key={item.href}
                    onClick={() => {
                      navigate(item.href);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                      active ? "bg-black text-white" : "text-black hover:bg-black/[0.04]"
                    }`}
                  >
                    <Icon size={18} />
                    <span style={{ fontSize: "0.8125rem", fontWeight: active ? 700 : 550 }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
            <div className="p-3 border-t border-black/[0.06]">
              <div className="flex items-center gap-3 px-3 py-2">
                <ProfileAvatar profile={profile} size={32} />
                <div>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#000000" }}>
                    {profile?.name || "Explorer"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════
   Dashboard Layout — Shell
   ════════════════════════════════════════════════════ */

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const reload = async () => {
    setLoading(true);
    try {
      const d = await loadDashboard();
      setData(d);
    } catch (err) {
      console.log("Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const sidebarWidth = sidebarCollapsed ? 72 : 260;
  const contentMargin = isDesktop ? sidebarWidth : 0;

  return (
    <DashboardContext.Provider value={{ data, loading, reload }}>
      <div className="min-h-screen bg-[#fafafa]" style={{ fontFamily: "'Inter', 'Onest', sans-serif" }}>
        {/* Desktop Sidebar */}
        {isDesktop && (
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            profile={data?.profile ?? null}
          />
        )}

        {/* Mobile Sidebar */}
        <MobileSidebar
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          profile={data?.profile ?? null}
        />

        {/* Top Bar */}
        <TopBar
          sidebarWidth={contentMargin}
          profile={data?.profile ?? null}
          onMobileMenuToggle={() => setMobileOpen(true)}
        />

        {/* Main Content — offset by sidebar on desktop */}
        <main
          className="pt-16 min-h-screen transition-[margin-left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ marginLeft: contentMargin }}
        >
          <Outlet />
        </main>
      </div>
    </DashboardContext.Provider>
  );
}