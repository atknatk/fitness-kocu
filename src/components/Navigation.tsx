"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Dumbbell, UtensilsCrossed, TrendingUp, Heart, Home } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/antrenman", label: "Antrenman", icon: Dumbbell },
  { href: "/beslenme", label: "Beslenme", icon: UtensilsCrossed },
  { href: "/ilerleme", label: "Ilerleme", icon: TrendingUp },
  { href: "/kocun", label: "Kocun", icon: Heart },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 bg-bg-primary border-r border-white/4 text-white z-50 items-center py-6 gap-2">
        <div className="mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-linear-to-br from-accent-blue to-accent-green flex items-center justify-center font-bold text-lg shadow-[0_0_20px_rgba(79,142,247,0.3)]"
          >
            FK
          </motion.div>
        </div>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors w-16 ${
                  active ? "text-accent-blue" : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {active && (
                  <>
                    <motion.div
                      layoutId="desktop-active"
                      className="absolute inset-0 bg-accent-blue/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    <motion.div
                      layoutId="desktop-bar"
                      className="absolute left-0 top-2 bottom-2 w-0.5 bg-accent-blue rounded-r-full shadow-[0_0_8px_rgba(79,142,247,0.6)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  </>
                )}
                <Icon size={20} className="relative z-10" />
                <span className="text-[10px] font-medium relative z-10">{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[rgba(10,10,15,0.8)] backdrop-blur-2xl text-white z-50 flex justify-around py-2 px-1 safe-bottom border-t border-white/6">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className="relative flex-1">
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`flex flex-col items-center gap-0.5 py-2 rounded-xl transition-colors ${
                  active ? "text-accent-blue" : "text-text-muted"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute inset-1 bg-accent-blue/10 rounded-2xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} className="relative z-10" style={active ? { filter: "drop-shadow(0 0 6px rgba(79,142,247,0.5))" } : undefined} />
                <span className="text-[9px] font-medium relative z-10">{label}</span>
                {active && (
                  <motion.div
                    layoutId="mobile-dot"
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(79,142,247,0.8)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
