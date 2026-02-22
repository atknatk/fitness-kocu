"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-lg">FK</div>
        </div>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all w-16 ${active ? "bg-primary/20 text-blue-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark text-white z-50 flex justify-around py-2 px-1 safe-bottom">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${active ? "text-blue-400" : "text-gray-400"}`}>
              <Icon size={18} />
              <span className="text-[9px] font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
