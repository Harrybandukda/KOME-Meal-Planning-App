"use client"

import { useState, useEffect, useContext, useRef } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Globe, Heart, ArrowRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppContext } from "../app-provider"
import { sendRequest } from "@/lib/utils"
import { useRouter } from "next/navigation"
import Image from "next/image"


export default function Recipes() {
    const [recipes, setRecipes] = useState<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLoading, userId, userName } = useContext(AppContext);
    const router = useRouter();

    const categories = ["Appetizers & Snacks", "Breakfast & Brunch", "Lunch", "Dinner", "Desert", "Drinks", "Side Dish", "Healthy"]

    useEffect(() => {
        // if (!userId) {
        //     // Authentication check
        //     if (!isLoading) {
        //         console.error("User ID not found, redirect to login");
        //         router.push("/login");
        //     }
        //     return;
        // }

        // Fetch recipes 
        const fetchRecipes = async () => {
            if (isLoading) return;

            try {
                const response = await sendRequest<any>(`/api/recipe`, "GET");
                setRecipes(response)
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } 
        };

        fetchRecipes();
    }, [userId, isLoading, router]);

    
    return(
    <div className="min-h-screen bg-white font-quicksand">
        <DashboardSidebar />

        {/* Main Content */}
        <div className="ml-64">
            {/* Top Header */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between px-8 py-4">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input type="text" placeholder="Search" className="pl-10 rounded-lg border-gray-200" />
                    </div>

                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="border-gray-200">
                                <Globe className="h-5 w-5 text-gray-600 mr-2" />
                                English
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>English</DropdownMenuItem>
                            <DropdownMenuItem>Spanish</DropdownMenuItem>
                            <DropdownMenuItem>French</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>SJ</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{userName}</span>
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* Content  */}
            <div className="p-8">
                <div className="mb-8">
                    {/* Description */}
                    <h2 className="text-3xl font-bold mb-6">RECIPES</h2>
                    <span className="text-grey mb-4">Recipes different types of meals like breakfast, lunch, and more to find delicious recipes and ideas for any time of the day</span>
                    
                    {/* Categories */}
                    <div className="w-full mb-4">
                        <div ref={containerRef} className="flex flex-wrap gap-2">
                            {Object.entries(categories).map(([type, category]: [string, any]) => (
                                <span 
                                    key={type} 
                                    className="px-4 py-2 bg-gray-200 rounded-lg">
                                    {category}
                                </span>
                            ))}
                            <span className="px-4 py-2 bg-gray-200 rounded-lg">
                                View all <ArrowRight/> 
                            </span>
                        </div>
                    </div>

                    {/* Recipes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recipes && typeof recipes === "object" ? (
                            Object.entries(recipes).map(([type, recipe]: [string, any]) => (
                                <div key={type} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                                    <div className="relative h-64">
                                        <Image src={recipe.link || "/placeholder.svg"} alt={recipe.name} fill className="object-cover transition-transform group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Heart className="w-5 h-5" />
                                        </button>
                                        <div className="absolute bg-white bottom-4 left-4 right-4">
                                            <h3 className="text-white font-semibold text-lg mb-1">{recipe.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-white/80 mt-1">
                                                <span>⏳ 30 min</span>
                                                <span>🔥 130 Cal</span>
                                                <span>⭐ 4.4 (120)</span>
                                            </div>
                                            <p className="text-white/80 text-sm mt-1">By {recipe.author}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No recipes found.</p>
                        )}
                    </div>

                    {/* Load More Button */}
                    <div className="flex justify-center mt-6">
                        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400">
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}