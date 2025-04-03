"use client"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Check,
  Eye,
  EyeOff,
  Plus,
  Save,
  X,
  Upload,
  User,
  Lock,
  AlertTriangle,
  Bell,
  Utensils,
  Search,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// Mock data - would come from API in production
const initialAllergies = [
  { id: 1, name: "Nut Allergy", selected: true },
  { id: 2, name: "Lactose Intolerant", selected: false },
  { id: 3, name: "Soy Allergy", selected: true },
  { id: 4, name: "Gluten Allergy", selected: false },
  { id: 5, name: "Egg Allergy", selected: false },
  { id: 6, name: "Shellfish Allergy", selected: true },
  { id: 7, name: "Fish Allergy", selected: false },
]

const initialDietaryRestrictions = [
  { id: 1, name: "Vegetarian Diet", selected: false },
  { id: 2, name: "Vegan Diet", selected: true },
  { id: 3, name: "Halal Diet", selected: false },
  { id: 4, name: "Gluten-Free Diet", selected: false },
  { id: 5, name: "Keto Diet", selected: true },
  { id: 6, name: "Paleo Diet", selected: false },
]

export default function SettingsPage() {
  // User profile state
  const [user, setUser] = useState({
    id: "1",
    email: "sarah.john@example.com",
    full_name: "Sarah John",
    weight: 65,
    gender: "female",
    goal: "lose",
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Allergies and dietary restrictions state
  const [allergies, setAllergies] = useState(initialAllergies)
  const [dietaryRestrictions, setDietaryRestrictions] = useState(initialDietaryRestrictions)
  const [newAllergy, setNewAllergy] = useState("")
  const [newDietaryRestriction, setNewDietaryRestriction] = useState("")
  const [isAddAllergyOpen, setIsAddAllergyOpen] = useState(false)
  const [isAddDietaryRestrictionOpen, setIsAddDietaryRestrictionOpen] = useState(false)
  const [allergySearch, setAllergySearch] = useState("")
  const [dietarySearch, setDietarySearch] = useState("")

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    mealPlanReminders: true,
    weeklyReports: false,
    specialOffers: true,
  })

  // Success message state
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  // Load user data from localStorage (simulating API)
  useEffect(() => {
    const savedUser = localStorage.getItem("userData")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Save initial user data
      localStorage.setItem("userData", JSON.stringify(user))
    }

    const savedAllergies = localStorage.getItem("userAllergies")
    if (savedAllergies) {
      setAllergies(JSON.parse(savedAllergies))
    } else {
      localStorage.setItem("userAllergies", JSON.stringify(allergies))
    }

    const savedDietaryRestrictions = localStorage.getItem("userDietaryRestrictions")
    if (savedDietaryRestrictions) {
      setDietaryRestrictions(JSON.parse(savedDietaryRestrictions))
    } else {
      localStorage.setItem("userDietaryRestrictions", JSON.stringify(dietaryRestrictions))
    }

    const savedNotifications = localStorage.getItem("userNotifications")
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    } else {
      localStorage.setItem("userNotifications", JSON.stringify(notifications))
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem("userAllergies", JSON.stringify(allergies))
  }, [allergies])

  useEffect(() => {
    localStorage.setItem("userDietaryRestrictions", JSON.stringify(dietaryRestrictions))
  }, [dietaryRestrictions])

  useEffect(() => {
    localStorage.setItem("userNotifications", JSON.stringify(notifications))
  }, [notifications])

  // Calculate password strength
  useEffect(() => {
    if (!passwordData.newPassword) {
      setPasswordStrength(0)
      return
    }

    let strength = 0

    // Length check
    if (passwordData.newPassword.length >= 8) strength += 25

    // Contains number
    if (/\d/.test(passwordData.newPassword)) strength += 25

    // Contains lowercase
    if (/[a-z]/.test(passwordData.newPassword)) strength += 25

    // Contains uppercase or special char
    if (/[A-Z]/.test(passwordData.newPassword) || /[^a-zA-Z0-9]/.test(passwordData.newPassword)) strength += 25

    setPasswordStrength(strength)
  }, [passwordData.newPassword])

  // Show success message
  const showSuccessNotification = (message) => {
    setSuccessMessage(message)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  // Handle profile update
  const handleProfileUpdate = () => {
    // In a real app, this would call the API
    console.log("Updating profile:", user)
    showSuccessNotification("Profile updated successfully!")
  }

  // Handle password change
  const handlePasswordChange = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }

    // In a real app, this would call the API
    console.log("Changing password")

    // Reset form and show success
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setPasswordError("")
    showSuccessNotification("Password changed successfully!")
  }

  // Toggle allergy selection
  const toggleAllergy = (id: number) => {
    setAllergies(
      allergies.map((allergy) => (allergy.id === id ? { ...allergy, selected: !allergy.selected } : allergy)),
    )
  }

  // Toggle dietary restriction selection
  const toggleDietaryRestriction = (id: number) => {
    setDietaryRestrictions(
      dietaryRestrictions.map((restriction) =>
        restriction.id === id ? { ...restriction, selected: !restriction.selected } : restriction,
      ),
    )
  }

  // Add new allergy
  const addAllergy = () => {
    if (newAllergy.trim()) {
      const newAllergyItem = {
        id: allergies.length + 1,
        name: newAllergy,
        selected: true,
      }
      setAllergies([...allergies, newAllergyItem])
      setNewAllergy("")
      setIsAddAllergyOpen(false)
    }
  }

  // Add new dietary restriction
  const addDietaryRestriction = () => {
    if (newDietaryRestriction.trim()) {
      const newRestrictionItem = {
        id: dietaryRestrictions.length + 1,
        name: newDietaryRestriction,
        selected: true,
      }
      setDietaryRestrictions([...dietaryRestrictions, newRestrictionItem])
      setNewDietaryRestriction("")
      setIsAddDietaryRestrictionOpen(false)
    }
  }

  // Save allergies
  const saveAllergies = () => {
    // In a real app, this would call the API
    const selectedAllergies = allergies.filter((allergy) => allergy.selected).map((allergy) => allergy.id)
    console.log("Saving allergies:", selectedAllergies)
    showSuccessNotification("Allergies saved successfully!")
  }

  // Save dietary restrictions
  const saveDietaryRestrictions = () => {
    // In a real app, this would call the API
    const selectedRestrictions = dietaryRestrictions
      .filter((restriction) => restriction.selected)
      .map((restriction) => restriction.id)

    console.log("Saving dietary restrictions:", selectedRestrictions)
    showSuccessNotification("Dietary restrictions saved successfully!")
  }

  // Filter allergies by search
  const filteredAllergies = allergies.filter((allergy) =>
    allergy.name.toLowerCase().includes(allergySearch.toLowerCase()),
  )

  // Filter dietary restrictions by search
  const filteredDietaryRestrictions = dietaryRestrictions.filter((restriction) =>
    restriction.name.toLowerCase().includes(dietarySearch.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <DashboardSidebar />

      <div className="ml-64">
        <div className="p-8">
          {/* Success notification */}
          {showSuccess && (
            <div className="fixed top-6 right-6 z-50 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-5 duration-300">
              <Check className="w-5 h-5 text-green-500" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="font-everbright text-4xl font-bold text-gray-800">Account Settings</h1>
              <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
            </div>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 mb-8 max-w-md">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-[#42B5E7] data-[state=active]:text-white rounded-xl py-3 flex items-center gap-2 justify-center"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="data-[state=active]:bg-[#42B5E7] data-[state=active]:text-white rounded-xl py-3 flex items-center gap-2 justify-center"
                >
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </TabsTrigger>
                <TabsTrigger
                  value="diet"
                  className="data-[state=active]:bg-[#42B5E7] data-[state=active]:text-white rounded-xl py-3 flex items-center gap-2 justify-center"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Diet</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-[#42B5E7] data-[state=active]:text-white rounded-xl py-3 flex items-center gap-2 justify-center"
                >
                  <Bell className="w-4 h-4" />
                  <span>Alerts</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="relative group">
                      <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-3xl bg-[#42B5E7] text-white">
                          {user.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4 rounded-xl flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </Button>
                  </div>

                  <div className="flex-1 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          value={user.full_name}
                          onChange={(e) => setUser({ ...user, full_name: e.target.value })}
                          className="h-12 rounded-xl border-gray-200 focus:border-[#42B5E7] focus:ring-[#42B5E7]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({ ...user, email: e.target.value })}
                          className="h-12 rounded-xl border-gray-200 focus:border-[#42B5E7] focus:ring-[#42B5E7]/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="weight" className="text-gray-700">
                          Weight (kg)
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          value={user.weight}
                          onChange={(e) => setUser({ ...user, weight: Number(e.target.value) })}
                          className="h-12 rounded-xl border-gray-200 focus:border-[#42B5E7] focus:ring-[#42B5E7]/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-gray-700">
                          Gender
                        </Label>
                        <select
                          id="gender"
                          value={user.gender}
                          onChange={(e) => setUser({ ...user, gender: e.target.value })}
                          className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#42B5E7]/20 focus:border-[#42B5E7]"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="goal" className="text-gray-700">
                          Goal
                        </Label>
                        <select
                          id="goal"
                          value={user.goal}
                          onChange={(e) => setUser({ ...user, goal: e.target.value })}
                          className="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#42B5E7]/20 focus:border-[#42B5E7]"
                        >
                          <option value="lose">Lose Weight</option>
                          <option value="maintain">Maintain Weight</option>
                          <option value="gain">Gain Weight</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleProfileUpdate}
                    className="h-12 px-6 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1] transition-colors shadow-sm hover:shadow"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Password Tab */}
            <TabsContent value="password" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#42B5E7]" />
                  Change Password
                </h2>

                <div className="max-w-md space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-gray-700">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="h-12 rounded-xl border-gray-200 focus:border-[#42B5E7] focus:ring-[#42B5E7]/20 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-gray-700">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="h-12 rounded-xl border-gray-200 focus:border-[#42B5E7] focus:ring-[#42B5E7]/20 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Password strength indicator */}
                    {passwordData.newPassword && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Password strength</span>
                          <span className="text-xs font-medium">
                            {passwordStrength <= 25 && "Weak"}
                            {passwordStrength > 25 && passwordStrength <= 50 && "Fair"}
                            {passwordStrength > 50 && passwordStrength <= 75 && "Good"}
                            {passwordStrength > 75 && "Strong"}
                          </span>
                        </div>
                        <Progress
                          value={passwordStrength}
                          className="h-1.5"
                          indicatorClassName={`${
                            passwordStrength <= 25
                              ? "bg-red-500"
                              : passwordStrength <= 50
                                ? "bg-yellow-500"
                                : passwordStrength <= 75
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="h-12 rounded-xl border-gray-200 focus:border-[#42B5E7] focus:ring-[#42B5E7]/20 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {passwordError && (
                    <div className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                      <AlertTriangle className="w-4 h-4" />
                      {passwordError}
                    </div>
                  )}

                  <Button
                    onClick={handlePasswordChange}
                    className="h-12 px-6 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1] transition-colors shadow-sm hover:shadow"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Diet Tab */}
            <TabsContent value="diet" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Allergies Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span className="text-[#42B5E7]">🚫</span>
                      Allergies
                    </h2>
                    <Button
                      variant="outline"
                      className="h-10 rounded-xl border-[#42B5E7] text-[#42B5E7] hover:bg-[#42B5E7] hover:text-white transition-colors"
                      onClick={() => setIsAddAllergyOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Allergy
                    </Button>
                  </div>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search allergies"
                      value={allergySearch}
                      onChange={(e) => setAllergySearch(e.target.value)}
                      className="pl-10 h-11 rounded-xl border-gray-200"
                    />
                  </div>

                  <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredAllergies.length > 0 ? (
                      filteredAllergies.map((allergy) => (
                        <div
                          key={allergy.id}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                            allergy.selected
                              ? "border-[#42B5E7] bg-blue-50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => toggleAllergy(allergy.id)}
                        >
                          <span className="font-medium">{allergy.name}</span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                              allergy.selected ? "bg-[#42B5E7] text-white" : "bg-gray-100"
                            }`}
                          >
                            {allergy.selected && <Check className="w-4 h-4" />}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">No allergies found matching your search</div>
                    )}
                  </div>

                  <Button
                    onClick={saveAllergies}
                    className="w-full h-12 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1] transition-colors shadow-sm hover:shadow"
                  >
                    Save Allergies
                  </Button>
                </div>

                {/* Dietary Restrictions Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                      <span className="text-[#42B5E7]">🥗</span>
                      Dietary Restrictions
                    </h2>
                    <Button
                      variant="outline"
                      className="h-10 rounded-xl border-[#42B5E7] text-[#42B5E7] hover:bg-[#42B5E7] hover:text-white transition-colors"
                      onClick={() => setIsAddDietaryRestrictionOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Diet
                    </Button>
                  </div>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search dietary restrictions"
                      value={dietarySearch}
                      onChange={(e) => setDietarySearch(e.target.value)}
                      className="pl-10 h-11 rounded-xl border-gray-200"
                    />
                  </div>

                  <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredDietaryRestrictions.length > 0 ? (
                      filteredDietaryRestrictions.map((restriction) => (
                        <div
                          key={restriction.id}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${
                            restriction.selected
                              ? "border-[#42B5E7] bg-blue-50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => toggleDietaryRestriction(restriction.id)}
                        >
                          <span className="font-medium">{restriction.name}</span>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                              restriction.selected ? "bg-[#42B5E7] text-white" : "bg-gray-100"
                            }`}
                          >
                            {restriction.selected && <Check className="w-4 h-4" />}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No dietary restrictions found matching your search
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={saveDietaryRestrictions}
                    className="w-full h-12 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1] transition-colors shadow-sm hover:shadow"
                  >
                    Save Dietary Restrictions
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6 animate-in fade-in-50 duration-300">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#42B5E7]" />
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div>
                      <h3 className="text-base font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive emails about your account activity</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                      className="data-[state=checked]:bg-[#42B5E7]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div>
                      <h3 className="text-base font-medium">Meal Plan Reminders</h3>
                      <p className="text-sm text-gray-500">Get reminders about your upcoming meal plans</p>
                    </div>
                    <Switch
                      checked={notifications.mealPlanReminders}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, mealPlanReminders: checked })}
                      className="data-[state=checked]:bg-[#42B5E7]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div>
                      <h3 className="text-base font-medium">Weekly Reports</h3>
                      <p className="text-sm text-gray-500">Receive weekly reports about your progress</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                      className="data-[state=checked]:bg-[#42B5E7]"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div>
                      <h3 className="text-base font-medium">Special Offers</h3>
                      <p className="text-sm text-gray-500">Get notified about special offers and promotions</p>
                    </div>
                    <Switch
                      checked={notifications.specialOffers}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, specialOffers: checked })}
                      className="data-[state=checked]:bg-[#42B5E7]"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    className="h-12 px-6 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1] transition-colors shadow-sm hover:shadow"
                    onClick={() => showSuccessNotification("Notification preferences saved!")}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Allergy Dialog */}
      {isAddAllergyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsAddAllergyOpen(false)}></div>
          <div className="relative bg-white w-[450px] rounded-2xl shadow-lg animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Add New Allergy</h2>
                <button
                  onClick={() => setIsAddAllergyOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-8">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Allergy Name</Label>
                <Input
                  placeholder="e.g. Peanut Allergy, Seafood Allergy"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-[#42B5E7] focus:ring-[#42B5E7]/20"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setIsAddAllergyOpen(false)}
                  variant="outline"
                  className="px-6 py-2.5 rounded-xl border-gray-200 text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addAllergy}
                  className="px-6 py-2.5 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1]"
                >
                  Add Allergy
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Dietary Restriction Dialog */}
      {isAddDietaryRestrictionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsAddDietaryRestrictionOpen(false)}></div>
          <div className="relative bg-white w-[450px] rounded-2xl shadow-lg animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Add Dietary Restriction</h2>
                <button
                  onClick={() => setIsAddDietaryRestrictionOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-8">
                <Label className="block text-sm font-medium text-gray-700 mb-2">Restriction Name</Label>
                <Input
                  placeholder="e.g. Low Carb Diet, Mediterranean Diet"
                  value={newDietaryRestriction}
                  onChange={(e) => setNewDietaryRestriction(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 focus:border-[#42B5E7] focus:ring-[#42B5E7]/20"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setIsAddDietaryRestrictionOpen(false)}
                  variant="outline"
                  className="px-6 py-2.5 rounded-xl border-gray-200 text-gray-800 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={addDietaryRestriction}
                  className="px-6 py-2.5 rounded-xl bg-[#42B5E7] text-white hover:bg-[#3AA1D1]"
                >
                  Add Restriction
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

