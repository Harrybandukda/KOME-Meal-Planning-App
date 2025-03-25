"use client"

import { useContext, useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import { sendRequest } from "@/lib/utils"
import { AppContext } from "../../app-provider"

const KG_TO_LBS = 2.20462
const KG_RANGE = { min: 40, max: 140 }
const LBS_RANGE = {
  min: Math.round(KG_RANGE.min * KG_TO_LBS),
  max: Math.round(KG_RANGE.max * KG_TO_LBS),
}

export default function OnboardingStep2() {
  const router = useRouter()
  const [unit, setUnit] = useState<"kg" | "lbs">("kg")
  const [weightKg, setWeightKg] = useState(70)
  const [gender, setGender] = useState("female")
  const [goal, setGoal] = useState("lose")
  const { userId } = useContext(AppContext);

  // Derived state for display
  const weightLbs = Math.round(weightKg * KG_TO_LBS)
  const displayWeight = unit === "kg" ? weightKg : weightLbs
  const range = unit === "kg" ? KG_RANGE : LBS_RANGE

  // Calculate percentage for slider background
  const percentage = ((displayWeight - range.min) / (range.max - range.min)) * 100

  // Handle unit toggle
  const toggleUnit = (newUnit: "kg" | "lbs") => {
    setUnit(newUnit)
  }

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    if (unit === "kg") {
      setWeightKg(value[0])
    } else {
      setWeightKg(Math.round(value[0] / KG_TO_LBS))
    }
  }

  const updateProfile = async () => {
    sendRequest(`/api/user/${userId}`, "POST", { weight: weightKg, gender, goal })
      .then(() => {
        router.push("/onboarding/step3");
      });
  };

  // Calculate slider markers
  const markers = Array.from({ length: 6 }, (_, i) => {
    const value = Math.round(range.min + (i * (range.max - range.min)) / 5)
    return value
  })

  return (
    <main className="min-h-screen bg-white font-quicksand">
      <NavBar />

      <div className="max-w-2xl mx-auto px-4 py-12">
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

          {/* Weight Input */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">What's your current weight right now?</h2>

            <div className="flex justify-center">
              <div className="inline-flex rounded-md">
                <button
                  onClick={() => toggleUnit("kg")}
                  className={`px-8 py-2 rounded-l-md border border-r-0 transition-colors ${
                    unit === "kg"
                      ? "bg-[#42B5E7] text-white border-[#42B5E7]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Kg
                </button>
                <button
                  onClick={() => toggleUnit("lbs")}
                  className={`px-8 py-2 rounded-r-md border border-l-0 transition-colors ${
                    unit === "lbs"
                      ? "bg-[#42B5E7] text-white border-[#42B5E7]"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Lbs
                </button>
              </div>
            </div>

            <div className="space-y-4 px-4">
              <div className="relative pt-2 pb-8">
                <div
                  className="absolute h-2 bg-[#42B5E7] rounded-full"
                  style={{
                    width: `${percentage}%`,
                    left: 0,
                    top: '0.5rem'
                  }}
                />
                <div className="absolute h-2 bg-gray-200 rounded-full right-0" style={{ width: `${100 - percentage}%`, left: `${percentage}%`, top: '0.5rem' }} />
                <Slider
                  value={[displayWeight]}
                  onValueChange={handleSliderChange}
                  min={range.min}
                  max={range.max}
                  step={1}
                  className="relative z-10"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-6">
                  {markers.map((value, i) => (
                    <span key={i} className="absolute" style={{ left: `${(i * 100) / 5}%`, transform: 'translateX(-50%)' }}>
                      {value}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center mt-8">
                <span className="text-4xl font-bold text-[#42B5E7]">
                  {displayWeight} {unit}
                </span>
              </div>
            </div>
          </div>

          {/* Gender Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">What's your gender?</h2>
            <RadioGroup value={gender} onValueChange={setGender} className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="border-2 border-gray-300 data-[state=checked]:border-[#42B5E7] data-[state=checked]:bg-[#42B5E7]"
                />
                <Label htmlFor="male" className="text-base">
                  Male
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="border-2 border-gray-300 data-[state=checked]:border-[#42B5E7] data-[state=checked]:bg-[#42B5E7]"
                />
                <Label htmlFor="female" className="text-base">
                  Female
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="other"
                  id="other"
                  className="border-2 border-gray-300 data-[state=checked]:border-[#42B5E7] data-[state=checked]:bg-[#42B5E7]"
                />
                <Label htmlFor="other" className="text-base">
                  Other
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Goal Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">What goal do you have in mind?</h2>
            <RadioGroup value={goal} onValueChange={setGoal} className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="lose"
                  id="lose"
                  className="border-2 border-gray-300 data-[state=checked]:border-[#42B5E7] data-[state=checked]:bg-[#42B5E7]"
                />
                <Label htmlFor="lose" className="text-base">
                  Lose Weight
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="maintain"
                  id="maintain"
                  className="border-2 border-gray-300 data-[state=checked]:border-[#42B5E7] data-[state=checked]:bg-[#42B5E7]"
                />
                <Label htmlFor="maintain" className="text-base">
                  Maintain Weight
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="gain"
                  id="gain"
                  className="border-2 border-gray-300 data-[state=checked]:border-[#42B5E7] data-[state=checked]:bg-[#42B5E7]"
                />
                <Label htmlFor="gain" className="text-base">
                  Gain Weight
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              onClick={updateProfile}
              className="w-full max-w-md bg-[#42B5E7] text-white hover:bg-[#3AA1D1] rounded-full h-12"
            >
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
