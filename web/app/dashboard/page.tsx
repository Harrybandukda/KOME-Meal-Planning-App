"use client"

import { useState, useEffect, useContext } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Globe, Heart } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppContext } from "../app-provider"
import { buildURL } from "@/lib/utils"

// Helper function to format date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0]
}

// Helper function to get day name
const getDayName = (date: Date): string => {
  return date.toLocaleDateString("en-US", { weekday: "short" })
}

export default function Dashboard() {
  // Generate 8 days starting from today
  const [dates, setDates] = useState<Array<{ date: Date; formatted: string; dayName: string }>>([])
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedMeals, setSelectedMeals] = useState<any>(null)
  const { userId, userName } = useContext(AppContext);

  useEffect(() => {
    const today = new Date()
    const dateArray = Array.from({ length: 8 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      return {
        date,
        formatted: formatDate(date),
        dayName: getDayName(date),
      }
    })

    setDates(dateArray)
    handleDateSelect(dateArray[0].formatted);
  }, [userId]);

  const handleDateSelect = (formattedDate: string) => {
    setSelectedDate(formattedDate);

    console.log("Dashboard loading meal plans");
    fetch(buildURL("/api/meal_plan/user/" + userId))
      .then((response) => response.json())
      .then((meals) => {
        console.log("User meal plans response");
        console.log(meals);
        setSelectedMeals(meals);
      });
  }

  const createMealPlan = (date: string) => {
    console.log("Creating meal plan for: ", date);
    fetch(buildURL("/api/meal_plan/create/" + userId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Meal plan created: ", data);
    })
    .catch((error) => console.error("Error creating meal plan: ", error));
  };

  return (
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

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">YOUR PERSONALIZED MEAL PLAN</h2>

            {/* Date Selector */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {dates.map((dateObj) => (
                <button
                  key={dateObj.formatted}
                  onClick={() => handleDateSelect(dateObj.formatted)}
                  className={`flex flex-col items-center p-4 rounded-xl transition-colors ${
                    selectedDate === dateObj.formatted
                      ? "bg-[#42B5E7] text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm">{dateObj.dayName}</span>
                  <span className="text-2xl font-bold">{dateObj.date.getDate()}</span>
                </button>
              ))}
            </div>

            {/* Meal Cards */}
            {selectedMeals ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(selectedMeals).map(([type, meal]: [string, any]) => (
                  <div
                    key={type}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group"
                  >
                    <div className="relative h-64">
                      <Image
                        src={meal.image || "/placeholder.svg"}
                        alt={meal.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-sm font-medium">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                      <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg mb-1">{meal.title}</h3>
                        <p className="text-white/80 text-sm">
                          {meal.calories} calories • {meal.protein}g protein
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="text-xl font-semibold mb-4">No Meal Plan for {selectedDate}</h3>
                <p className="text-gray-600 mb-6">Create a meal plan for this day to get started</p>
                <Button className="bg-[#42B5E7] hover:bg-[#3AA1D1]" onClick={() => createMealPlan(selectedDate)}>Create Meal Plan</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

