"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Dumbbell, UtensilsCrossed, TrendingUp, Heart, Home } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Ana Sayfa", icon: Home },
  { href: "/antrenman", label: "Antrenman", icon: Dumbbell },
  { href: "/beslenme", label: "Beslenme", icon: UtensilsCrossed },
  { href: "/ilerleme", label: "İlerleme", icon: TrendingUp },
  { href: "/kocun", label: "Koçun", icon: Heart },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 bg-dark text-white z-50 items-center py-6 gap-2">
        <div className="mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-lg"
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
                  active ? "text-blue-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="desktop-active"
                    className="absolute inset-0 bg-primary/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10" />
                <span className="text-[10px] font-medium relative z-10">{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-lg text-white z-50 flex justify-around py-2 px-1 safe-bottom border-t border-white/5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className="relative flex-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-0.5 py-2 rounded-xl transition-colors ${
                  active ? "text-blue-400" : "text-gray-400"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute -top-0.5 w-8 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={18} />
                <span className="text-[9px] font-medium">{label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
