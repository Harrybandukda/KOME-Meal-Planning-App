"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Compass,
  Calendar,
  ShoppingCart,
  Scan,
  BookOpen,
  BarChart2,
  BookMarked,
  Info,
  Settings,
  RotateCcw,
  HelpCircle,
  LogOut,
} from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Explore", icon: Compass, href: "/explore" },
    { name: "Meal Planner", icon: Calendar, href: "/meal-planner" },
    { name: "Shopping Lists", icon: ShoppingCart, href: "/shopping-lists" },
    { name: "Scan Fridge", icon: Scan, href: "/scan-fridge" },
  ]

  const extraItems = [
    { name: "Recipes", icon: BookOpen, href: "/recipes" },
    { name: "Stats", icon: BarChart2, href: "/stats" },
    { name: "Resources", icon: BookMarked, href: "/resources" },
    { name: "About", icon: Info, href: "/about" },
  ]

  const accountItems = [
    { name: "Account Settings", icon: Settings, href: "/settings" },
    { name: "Reset Week", icon: RotateCcw, href: "#reset-week" },
    { name: "Support", icon: HelpCircle, href: "/support" },
    { name: "Logout", icon: LogOut, href: "/logout" },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-12">
        <Image src="/assets/logo.png" alt="Kome Logo" width={40} height={40} className="w-10 h-10" />
        <span className="font-bold text-xl">KOME</span>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
              pathname === item.href ? "bg-[#42B5E7] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8">
        <div className="text-xs font-semibold text-gray-400 uppercase mb-2 px-4">Extras</div>
        <nav className="space-y-1">
          {extraItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        <div className="text-xs font-semibold text-gray-400 uppercase mb-2 px-4">Account</div>
        <nav className="space-y-1">
          {accountItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

