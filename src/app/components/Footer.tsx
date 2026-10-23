import { useNavigate } from "react-router";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Achievements", href: "/achievements" },
  { label: "How We Learn", href: "/learn" },
  { label: "Spiritual", href: "/spiritual" },
  { label: "Mastery Space", href: "/tools" },
  { label: "Community", href: "/community" },
  { label: "Join", href: "/join" },
];

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Top section */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
          <div>
            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#000000",
              }}
              className="mb-3"
            >
              ANYTHING HUMANLY POSSIBLE
            </p>
            <p
              className="max-w-sm"
              style={{
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#000000",
              }}
            >
              A celebration of the limitless potential within every person.
              Anything humanly possible starts with you.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.href)}
                className="group flex items-center gap-1 transition-colors duration-300 cursor-pointer hover:opacity-70"
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "#000000",
                }}
              >
                {link.label}
                <ArrowUpRight
                  size={11}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#000000",
            }}
          >
            Copyright © 2026 | Anything Humanly Possible
          </span>
          <button
            onClick={() => navigate("/join")}
            className="px-6 py-2 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </footer>
  );
}
