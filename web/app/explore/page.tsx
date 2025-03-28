/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useContext, useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Search, Bell, ChevronDown, ArrowRight, Heart, Clock } from "lucide-react"
import { AppContext } from "../app-provider"
import { mapRecipe, sendRequest } from "@/lib/utils"

// Sort options
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "recent", label: "Most Recent" },
  { value: "rating", label: "Highest Rated" },
]

export default function ExplorePage() {
  const [loadedCategory, setLoadedCategory] = useState("")
  const [activeCategory, setActiveCategory] = useState("View All")
  const [recipes, setRecipes] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const [likedRecipes, setLikedRecipes] = useState<number[]>(
    recipes.filter((recipe: any) => recipe.isLiked).map((recipe: any) => recipe.id),
  )
  const [sortBy, setSortBy] = useState("popular")
  const { isLoading, userId, userName } = useContext(AppContext);

  const initialLoad = async () => {
    if (!isLoading) {
      if (loadedCategory !== activeCategory) {
        setLoadedCategory(activeCategory);
        const categoryFilter = activeCategory === "View All" ? "" : `?category=${activeCategory}`;
        const allRecipes = await sendRequest<[]>(`/api/recipe${categoryFilter}`);

        if (activeCategory === "View All") {
          const uniqueCategories = new Set<string>();
          allRecipes.forEach((recipe: any) => recipe.Categories.forEach((category: any) => uniqueCategories.add(category.name)));
          const cats = Array.from(uniqueCategories).slice(0, 11);
          cats.push("View All");
          setCategories(cats);
        }

        setRecipes(allRecipes.map((recipe: any) => mapRecipe(recipe)));
      }
    }
    if (userId && likedRecipes.length === 0) {
      const userRecipes = await sendRequest<[]>(`/api/recipe/user/${userId}`);
      setLikedRecipes(userRecipes.map((recipe: any) => recipe.id));
    }
  };

  useEffect(() => {
    initialLoad();
  }, [userId, isLoading, activeCategory]);

  const toggleLike = (recipeId: number) => {
    setLikedRecipes((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]))
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <DashboardSidebar />

      <div className="ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative w-[480px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 h-11 bg-gray-50 border-none rounded-full text-base"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                  2
                </span>
              </div>
              <button className="flex items-center gap-2 text-gray-600">
                English
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <Image
                  src={"/placeholder.svg"}
                  alt={`${userName}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {userName}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((category: string) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`rounded-full px-6 ${
                    activeCategory === category
                      ? "bg-[#42B5E7] hover:bg-[#42B5E7]/90"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                  {category === "View All" && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Sort By
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => setSortBy(option.value)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-3 gap-6">
            {recipes.map((recipe: any) => (
              <div key={recipe.id} className="group">
                {/* Recipe Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <button
                    onClick={() => toggleLike(recipe.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedRecipes.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </button>
                  {recipe.isTrending && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white shadow-md flex items-center gap-1">
                      <span className="text-orange-500">🔥</span>
                      <span className="text-sm font-medium text-gray-900">2 Trending Recipe</span>
                    </div>
                  )}
                </div>

                {/* Recipe Info */}
                <h3 className="text-xl font-semibold mb-3">{recipe.title}</h3>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.instructions.length * 15}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400">🔥</span>
                    <span>{recipe.calories}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-orange-500">★</span>
                    <span className="text-gray-900">4.8</span>
                    <span className="text-gray-500">231</span>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="flex items-center gap-2">
                {recipe.categories.map((category: string, index: number) => (
                  <span key={index} className="text-gray-600">{category}</span>
                ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

