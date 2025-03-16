"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function NavBar() {
  const router = useRouter()

  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/assets/logo.png" alt="Kome Logo" width={40} height={40} className="w-10 h-10" />
        <span className="font-everbright font-bold text-xl">KOME</span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-everbright">
        <Link href="/" className="text-[#42B5E7] font-medium">
          HOME
        </Link>
        <Link href="/explore" className="text-gray-700 font-medium">
          EXPLORE
        </Link>
        <Link href="/dashboard" className="text-gray-700 font-medium">
          DASHBOARD
        </Link>
        <Link href="/top-recipes" className="text-gray-700 font-medium">
          TOP RECIPES
        </Link>

        {/* Temporary development link */}
        <Link href="/onboarding" className="text-gray-700 font-medium">
          ONBOARDING
        </Link>
        
      </div>

      <Button
        className="bg-[#42B5E7] text-white hover:bg-[#3AA1D1] rounded-full px-8"
        onClick={() => router.push("/login")}
      >
        LOGIN
      </Button>
    </nav>
  )
}



