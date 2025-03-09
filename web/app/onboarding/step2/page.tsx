"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Search, Check } from 'lucide-react'

interface PreferenceOption {
  id: string
  label: string
}

const dietaryPreferences: PreferenceOption[] = [
  { id: "vegetarian", label: "Vegetarian Diet" },
  { id: "vegan", label: "Vegan Diet" },
  { id: "halal", label: "Halal Diet" },
  { id: "gluten-free", label: "Gluten-Free Diet" },
  { id: "keto", label: "Keto Diet" },
  { id: "paleo", label: "Paleo Diet" },
]

const allergyOptions: PreferenceOption[] = [
  { id: "nut", label: "Nut Allergy" },
  { id: "lactose", label: "Lactose Intolerant" },
  { id: "soy", label: "Soy Allergy" },
  { id: "gluten", label: "Gluten Allergy" },
  { id: "egg", label: "Egg Allergy" },
  { id: "shellfish", label: "Shellfish Allergy" },
  { id: "fish", label: "Fish Allergy" },
]

export default function OnboardingStep2() {
  const router = useRouter()
  const [selectedDiets, setSelectedDiets] = useState<string[]>(["halal", "gluten-free"])
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(["soy", "gluten"])
  const [dietarySearch, setDietarySearch] = useState("")
  const [allergySearch, setAllergySearch] = useState("")

  const toggleDiet = (dietId: string) => {
    setSelectedDiets(prev =>
      prev.includes(dietId) ? prev.filter(id => id !== dietId) : [...prev, dietId]
    )
  }

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies(prev =>
      prev.includes(allergyId) ? prev.filter(id => id !== allergyId) : [...prev, allergyId]
    )
  }

  const filteredDiets = dietaryPreferences.filter(diet =>
    diet.label.toLowerCase().includes(dietarySearch.toLowerCase())
  )

  const filteredAllergies = allergyOptions.filter(allergy =>
    allergy.label.toLowerCase().includes(allergySearch.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-white font-quicksand">
      <NavBar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Progress Indicator */}
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-3xl font-bold">ONBOARDING</h1>
            <div className="w-full max-w-md relative">
              <div className="h-[2px] w-full bg-gray-200">
                <div className="h-full w-2/3 bg-[#42B5E7]" />
              </div>
              <div className="absolute -top-3 left-0 w-full flex justify-between">
                <div className="h-6 w-6 rounded-full bg-[#42B5E7] flex items-center justify-center text-white text-sm">
                  1
                </div>
                <div className="h-6 w-6 rounded-full bg-[#42B5E7] flex items-center justify-center text-white text-sm">
                  2
                </div>
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                  3
                </div>
              </div>
            </div>
          </div>

          {/* Dietary Preferences Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Dietary Preferences</h2>
              <p className="text-gray-600 mt-1">We're all ears! Let us know your dietary preferences.</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search"
                value={dietarySearch}
                onChange={(e) => setDietarySearch(e.target.value)}
                className="pl-10 rounded-lg border-gray-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredDiets.map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => toggleDiet(diet.id)}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    selectedDiets.includes(diet.id)
                      ? "border-[#42B5E7] bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-left font-medium">{diet.label}</span>
                  {selectedDiets.includes(diet.id) && (
                    <div className="w-6 h-6 rounded-full bg-[#42B5E7] flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Allergies Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Allergies & Restriction</h2>
              <p className="text-gray-600 mt-1">Your safety is our secret ingredient! What should we avoid?</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search"
                value={allergySearch}
                onChange={(e) => setAllergySearch(e.target.value)}
                className="pl-10 rounded-lg border-gray-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredAllergies.map((allergy) => (
                <button
                  key={allergy.id}
                  onClick={() => toggleAllergy(allergy.id)}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    selectedAllergies.includes(allergy.id)
                      ? "border-[#42B5E7] bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-left font-medium">{allergy.label}</span>
                  {selectedAllergies.includes(allergy.id) && (
                    <div className="w-6 h-6 rounded-full bg-[#42B5E7] flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={() => router.push("/onboarding/step3")}
              className="w-full max-w-md bg-[#42B5E7] text-white hover:bg-[#3AA1D1] rounded-full h-12 font-medium"
            >
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
