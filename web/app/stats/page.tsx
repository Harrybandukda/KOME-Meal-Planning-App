"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Search, Bell, ChevronDown, Sun, Target, X } from 'lucide-react'

// Mock diet types
const dietTypes = ["Favourite Diets", "Meat", "Keto", "Low Carb", "Vegetarian"]

// Mock stats data
const initialStatsData = [
  {
    title: "Food Waste Saving",
    value: "2lb",
    goal: "Goal 10lb",
    progress: 20, // should be percenntage
    maxGoal: 10,
    unit: "lb",
  },
  {
    title: "Ingredients Saving",
    value: "1lb",
    goal: "Goal 10lb",
    progress: 10, 
    maxGoal: 10,
    unit: "lb",
  },
  {
    title: "Monthly Saving",
    value: "$400",
    goal: "Goal $1000",
    progress: 40, 
    maxGoal: 1000,
    unit: "$",
  },
  {
    title: "Health Score",
    value: "84%",
    goal: "Based on your diet",
    progress: 84, 
    maxGoal: 100,
    unit: "%",
  },
]

// Mock questionnaires data
const initialQuestionnaires = [
  {
    id: 1,
    name: "Favourite Ingredients",
    description: "Share your favorite ingredients",
    availability: "28.11.2023",
    status: "Completed",
  },
  {
    id: 2,
    name: "Internataional Mix",
    description: "Global flavors perfectly blended",
    availability: "28.11.2025",
    status: "Pending",
  },
  {
    id: 3,
    name: "Asian Cuisines",
    description: "Experience diverse global cuisines",
    availability: "28.11.2024",
    status: "Pending",
  },
]

// Mock user data (would come from database)
const userData = {
  id: 1,
  firstName: "Harry",
  lastName: "bandukda",
  email: "harry@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
  preferences: {
    language: "English",
    diet: "Favourite Diets"
  }
}

// Sort options
const sortOptions = [
  { value: "name", label: "Name" },
  { value: "status", label: "Status" },
  { value: "date", label: "Date" },
]

export default function StatsPage() {
  const [activeDiet, setActiveDiet] = useState("Favourite Diets")
  const [statsData, setStatsData] = useState(initialStatsData)
  const [questionnaires, setQuestionnaires] = useState(initialQuestionnaires)
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false)
  const [newGoals, setNewGoals] = useState<Record<number, number>>({})
  const [sortBy, setSortBy] = useState("name")

  // Handle goal change
  const handleGoalChange = (index: number, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setNewGoals({
      ...newGoals,
      [index]: numValue,
    })
  }

  // Save new goals
  const saveNewGoals = () => {
    const updatedStats = statsData.map((stat, index) => {
      if (newGoals[index] !== undefined) {
        const newGoal = newGoals[index]
        const newProgress =
          stat.title === "Health Score"
            ? stat.progress 
            : Math.round((Number.parseInt(stat.value.replace(/[^0-9]/g, "")) / newGoal) * 100)

        return {
          ...stat,
          goal: `Goal ${stat.unit === "$" ? stat.unit : ""}${newGoal}${stat.unit !== "$" && stat.unit !== "%" ? stat.unit : ""}`,
          maxGoal: newGoal,
          progress: newProgress,
        }
      }
      return stat
    })

    setStatsData(updatedStats)
    setNewGoals({})
    setIsGoalDialogOpen(false)
  }

  // Reset goals to default
  const resetGoals = () => {
    setStatsData(initialStatsData)
    setIsGoalDialogOpen(false)
  }

  // Sort questionnaires
  const sortQuestionnaires = (sortType: string) => {
    setSortBy(sortType)

    const sorted = [...questionnaires].sort((a, b) => {
      if (sortType === "name") {
        return a.name.localeCompare(b.name)
      } else if (sortType === "status") {
        return a.status.localeCompare(b.status)
      } else if (sortType === "date") {
        return a.availability.localeCompare(b.availability)
      }
      return 0
    })
    
    setQuestionnaires(sorted)
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
                  src={userData.avatar || "/placeholder.svg"}
                  alt={`${userData.firstName} ${userData.lastName}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex items-center gap-2">
                  <span className="font-medium">{userData.firstName} {userData.lastName}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* User Greeting */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <Tabs defaultValue={activeDiet} className="w-[500px]">
                <TabsList className="bg-[#EBF8FE] p-1 rounded-full">
                  {dietTypes.map((diet) => (
                    <TabsTrigger
                      key={diet}
                      value={diet}
                      onClick={() => setActiveDiet(diet)}
                      className="rounded-full py-2 px-4 data-[state=active]:bg-white"
                    >
                      {diet}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-gray-600 mb-1">
                <Sun className="w-5 h-5 text-[#42B5E7]" />
                <span>Good Morning</span>
              </div>
              <h2 className="text-2xl font-bold tracking-wide">{userData.firstName.toUpperCase()} {userData.lastName.toUpperCase()}</h2>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center"
              >
                <h3 className="text-gray-600 font-medium mb-4">{stat.title}</h3>
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#EBF8FE" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#42B5E7"
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - stat.progress / 100)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{stat.goal}</span>
              </div>
            ))}
          </div>

          {/* Questionnaires Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">MEAL QUESTIONNAIRES</h2>
                <p className="text-gray-600">Help us improve meal plan by answering new questionnaires weekly</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  className="h-9 gap-2 rounded-full bg-white border border-[#42B5E7] text-[#42B5E7] hover:bg-[#42B5E7] hover:text-white"
                  onClick={() => setIsGoalDialogOpen(true)}
                >
                  <Target className="w-4 h-4" />
                  CHANGE GOAL
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                      Sort By: {sortOptions.find((opt) => opt.value === sortBy)?.label}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {sortOptions.map((option) => (
                      <DropdownMenuItem 
                        key={option.value} 
                        onClick={() => sortQuestionnaires(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Questionnaires Table */}
            <div className="bg-white rounded-xl border border-gray-100">
              <div className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-gray-100">
                <div className="text-sm font-medium text-gray-500">Name</div>
                <div className="text-sm font-medium text-gray-500">Description</div>
                <div className="text-sm font-medium text-gray-500">Availability</div>
                <div className="text-sm font-medium text-gray-500">Status</div>
              </div>
              <div className="divide-y divide-gray-100">
                {questionnaires.map((item) => (
                  <div key={item.id} className="grid grid-cols-4 gap-4 px-6 py-4 items-center">
                    <span className="text-gray-900 font-medium">{item.name}</span>
                    <span className="text-gray-600">{item.description}</span>
                    <span className="text-gray-600">{item.availability}</span>
                    <div>
                      <span
                        className={`px-4 py-1 text-sm rounded-full ${
                          item.status === "Completed" ? "bg-[#E6F7F3] text-[#10B981]" : "bg-[#FEF3C7] text-[#F59E0B]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Goal Change Dialog */}
      {isGoalDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsGoalDialogOpen(false)}></div>
          <div className="relative bg-white w-[500px] rounded-md shadow-lg">
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Change Your Goals</h2>
                <button onClick={() => setIsGoalDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="px-6 pb-6 space-y-6">
              {/* Food Waste Saving */}
              <div className="flex items-center justify-between">
                <span className="text-gray-800">Food Waste Saving</span>
                <div className="flex items-center">
                  <Input
                    type="number"
                    defaultValue={statsData[0].maxGoal}
                    onChange={(e) => handleGoalChange(0, e.target.value)}
                    className="w-[170px] h-10 border-gray-300"
                  />
                  <span className="ml-2 text-gray-800">lb</span>
                </div>
              </div>
              
              {/* Ingredients Saving */}
              <div className="flex items-center justify-between">
                <span className="text-gray-800">Ingredients Saving</span>
                <div className="flex items-center">
                  <Input
                    type="number"
                    defaultValue={statsData[1].maxGoal}
                    onChange={(e) => handleGoalChange(1, e.target.value)}
                    className="w-[170px] h-10 border-gray-300"
                  />
                  <span className="ml-2 text-gray-800">lb</span>
                </div>
              </div>
              
              {/* Monthly Saving */}
              <div className="flex items-center justify-between">
                <span className="text-gray-800">Monthly Saving</span>
                <Input
                  type="number"
                  defaultValue={statsData[2].maxGoal}
                  onChange={(e) => handleGoalChange(2, e.target.value)}
                  className="w-[170px] h-10 border-gray-300"
                />
              </div>
              
              {/* Health Score */}
              <div className="flex items-center justify-between">
                <span className="text-gray-800">Health Score</span>
                <Input
                  type="number"
                  defaultValue={statsData[3].maxGoal}
                  onChange={(e) => handleGoalChange(3, e.target.value)}
                  className="w-[170px] h-10 border-gray-300"
                />
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-between p-6 pt-4 border-t border-gray-200">
              <button
                onClick={resetGoals}
                className="px-6 py-2 border border-gray-300 rounded text-gray-800 hover:bg-gray-50"
              >
                Reset to Default
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsGoalDialogOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNewGoals}
                  className="px-6 py-2 bg-[#42B5E7] text-white rounded hover:bg-[#42B5E7]/90"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
