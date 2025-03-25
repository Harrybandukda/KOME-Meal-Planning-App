"use client"

import { useContext, useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Plus, RotateCcw, ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation"
import { AppContext } from "../app-provider"
import { sendRequest, mapMealPlan } from "@/lib/utils"

// Mock data structure ready for database integration
const mockWeeks = [
  { id: 1, name: "Week 01" },
  { id: 2, name: "Week 02" },
  { id: 3, name: "Week 03" },
  { id: 4, name: "Week 04" },
  { id: 5, name: "Week 05" },
]

const weekdays = [
  { name: "Monday", short: "Mon" },
  { name: "Tuesday", short: "Tue" },
  { name: "Wednesday", short: "Wed", active: true },
  { name: "Thursday", short: "Thu" },
  { name: "Friday", short: "Fri" },
  { name: "Saturday", short: "Sat" },
  { name: "Sunday", short: "Sun" },
]

export default function MealPlanner() {
  const [activeWeek, setActiveWeek] = useState(1)
  const [activeDay, setActiveDay] = useState(2)
  const [mealPlans, setMealPlans] = useState<any>({})
  const [currentPlan, setCurrentPlan] = useState<any>({})
  const [selectedMeal, setSelectedMeal] = useState("breakfast")

  const { isLoading, userId } = useContext(AppContext);
  const router = useRouter();

  const loadMealPlans = async () => {
    console.log("Planner loading current meal plans");

    const meals = await sendRequest<[]>(`/api/meal_plan/user/${userId}`);

    if (!meals || meals.length == 0) {
      setMealPlans({});
      console.error("Could not find any meal plans for user");
      return;
    }

    const allPlans: Record<number, any> = {}; 
    for (const meal of meals as Array<{ weekday: number }>) {
      const mappedMeal = await mapMealPlan(meal);
      allPlans[meal.weekday] = mappedMeal;
    }
    setMealPlans(allPlans);
  };

  useEffect(() => {
    // Authentication check
    if (!userId && !isLoading) {
      console.error("User ID not found, redirect to login");
      router.push("/login");
      return;
    }

    if (userId) {
      loadMealPlans();
    }
  }, [userId, isLoading, router]);

  useEffect(() => {
    if (mealPlans && mealPlans[activeDay]) {
      setCurrentPlan(mealPlans[activeDay]);
    } else {
      setCurrentPlan({});
    }
  }, [activeDay]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <DashboardSidebar />

      <div className="ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-[28px] font-bold tracking-tight">YOUR PERSONALIZED MEAL PLAN</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="h-9 gap-2 rounded-full border-[#42B5E7] text-[#42B5E7] text-sm font-medium hover:bg-[#42B5E7] hover:text-white">
                <Plus className="w-4 h-4" />
                ADD PLAN
              </Button>
              <Button variant="outline" className="h-9 gap-2 rounded-full border-[#42B5E7] text-[#42B5E7] text-sm font-medium hover:bg-[#42B5E7] hover:text-white">
                <RotateCcw className="w-4 h-4" />
                RESET PLAN
              </Button>
            </div>
          </div>

          {/* Week Selector */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-8">
              {mockWeeks.map((week) => (
                <button
                  key={week.id}
                  onClick={() => setActiveWeek(week.id)}
                  className={`px-4 py-2 transition-colors text-base ${
                    activeWeek === week.id ? "text-[#42B5E7] font-medium" : "text-gray-400"
                  }`}
                >
                  {week.name}
                </button>
              ))}
              <button className="text-gray-400 hover:text-gray-600">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {weekdays.map((day, id) => (
                <button
                  key={day.name}
                  onClick={() => setActiveDay(id)}
                  className={`p-2 text-center transition-colors ${
                    activeDay === id ? "text-[#42B5E7] font-medium" : "text-gray-400"
                  }`}
                >
                  {day.name}
                </button>
              ))}
            </div>
          </div>

          {/* Meal Cards and Recipe Details */}
          <div className="grid grid-cols-4 gap-8">
            {/* Meal Cards */}
            <div className="col-span-3 flex gap-6">
              {Object.entries(currentPlan).map(([type, recipe]: [string, any]) => (
                <div
                  key={type}
                  className={`flex-1 p-6 rounded-2xl transition-colors cursor-pointer ${
                    selectedMeal === type ? "bg-[#EBF8FE]" : "bg-white"
                  }`}
                  onClick={() => setSelectedMeal(type)}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative w-[140px] h-[140px] mb-4">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="font-medium text-lg capitalize mb-1">{type}</h3>
                    <p className="text-sm text-gray-500">Need {recipe.neededIngredients} ingredients</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Nutrition Facts */}
            <div className="col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-[22px] font-bold mb-6">Nutrition Facts</h3>
                <div className="space-y-4">
                  {(selectedMeal in currentPlan) && Object.entries(currentPlan[selectedMeal as keyof typeof currentPlan].nutrition).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="capitalize text-gray-600 text-base">{key}</span>
                      <div className="flex-1 mx-4">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#42B5E7]/20"
                            style={{ width: key === "calories" ? "55%" : key === "carbs" ? "90%" : "30%" }}
                          />
                        </div>
                      </div>
                      <span className="font-medium text-right w-16">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Details */}
          {selectedMeal in currentPlan && (
            <div className="mt-8">
              <h2 className="text-[32px] font-bold mb-6">{currentPlan[selectedMeal as keyof typeof currentPlan].name}</h2>

              <div className="mb-6">
                <Tabs defaultValue="ingredients" className="w-full">
                  <TabsList className="w-full mb-6 grid grid-cols-3 p-1 bg-transparent gap-4">
                    <TabsTrigger 
                      value="cookware" 
                      className="data-[state=active]:bg-[#42B5E7] data-[state=active]:text-white rounded-full py-2.5 text-base font-medium"
                    >
                      Cookware
                    </TabsTrigger>
                    <TabsTrigger 
                      value="ingredients" 
                      className="data-[state=active]:bg-[#42B5E7] data-[state=active]:text-white rounded-full py-2.5 text-base font-medium"
                    >
                      Ingredients
                    </TabsTrigger>
                    <TabsTrigger 
                      value="instructions" 
                      className="data-[state=active]:bg-[#42B5E7] data-[state=active]:text-white rounded-full py-2.5 text-base font-medium"
                    >
                      Instructions
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ingredients" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="space-y-6">
                      {currentPlan[selectedMeal as keyof typeof currentPlan].ingredients.map((ingredient: any, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#42B5E7]" />
                          </div>
                          <span className="text-lg">
                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                          </span>
                        </div>
                      ))}
                      <div className="pt-6 mt-6 border-t border-gray-100 text-sm text-gray-400 uppercase">
                        KOME LOVE
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cookware" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="space-y-6">
                      {currentPlan[selectedMeal as keyof typeof currentPlan].cookware.map((name: string, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#42B5E7]" />
                          </div>
                          <span className="text-lg">{name}</span>
                        </div>
                      ))}
                      <div className="pt-6 mt-6 border-t border-gray-100 text-sm text-gray-400 uppercase">
                        KOME LOVE
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="instructions" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <div className="space-y-6">
                      {currentPlan[selectedMeal as keyof typeof currentPlan].instructions.map((instruction: any) => (
                        <div key={instruction.step} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-[#42B5E7] text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-medium">
                            {instruction.step + 1}
                          </div>
                          <span className="text-lg">
                            {instruction.text}
                          </span>
                        </div>
                      ))}
                      <div className="pt-6 mt-6 border-t border-gray-100 text-sm text-gray-400 uppercase">
                        KOME LOVE
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
