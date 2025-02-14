"use client"

import Image from "next/image"
import { NavBar } from "@/components/nav-bar"
import { RecipeCard } from "@/components/recipe-card"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"
import homeGirlImage from "@/assets/home_girl_image.png"
import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <Button variant="secondary" className="bg-blue-100/50 text-[#42B5E7] hover:bg-blue-100 rounded-full">
              <Cookie className="mr-2 h-4 w-4" />
              Create a perfect meal plan
            </Button>

            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight font-everbright">
                Discover <span className="text-[#42B5E7] font-hand block">your next favorite food meal</span> in one
                click!
              </h1>

              <p className="text-gray-600 text-lg max-w-xl font-everbright">
                Find your next favorite meal with personalized recommendations tailored to your taste. Discover dishes
                you'll love!
              </p>

              <Button size="lg" className="bg-[#42B5E7] text-white hover:bg-[#3AA1D1] rounded-full px-8"
              onClick={() => router.push("/signup")}>
                SIGN UP
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-[600px] h-[600px]">
              <div className="absolute inset-0 rounded-full bg-[#42B5E7]/20">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src={homeGirlImage || "/placeholder.svg"}
                    alt="Food presentation"
                    width={600}
                    height={600}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              <RecipeCard title="Pad Thai Fusion Dish" rating={4} />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-8 h-8">✨</div>
              <div className="absolute -left-4 bottom-32">
                <Image src="/assets/food-1.png" alt="Decorative food" width={80} height={80} className="w-20 h-20" />
              </div>
              <div className="absolute top-20 right-0">
                <Image src="/assets/food-2.png" alt="Decorative food" width={60} height={60} className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

