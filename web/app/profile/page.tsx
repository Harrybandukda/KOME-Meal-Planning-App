"use client"
import { useState, useEffect, useContext } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Globe, UserRound } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppContext } from "../app-provider"
import { sendRequest } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function Profile() {
    const { isLoading, userId, userName } = useContext(AppContext);
    // const [avatar, setAvatar] = useState("/default-avatar.jpg");
    const [user, setUser] = useState<any | null>(null);
    const [allergies, setAllergies] = useState<any | null>(null);
    const [dietRest, setDietRest] = useState<any | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!userId) {
            // Authentication check
            if (!isLoading) {
            console.error("User ID not found, redirect to login");
            router.push("/login");
            }
            return;
        }

        const fetchData = async () =>{ 
            const userData = await sendRequest<any>(`api/user/${userId}`)
            setUser(userData)

            const allergyData = await sendRequest<any>(`api/allergies/user/${userId}`)
            setAllergies(allergyData)
            
            const dietRestData = await sendRequest<any>(`api/dietary_restrictions/user/${userId}`)
            setDietRest(dietRestData)
        }

        fetchData()
    }, [userId, isLoading, router]);
 

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

                {/* Edit Button */}
                <button className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 focus:outline-none">
                    Edit
                </button>

                {/* Profile Information Card */}
                <div className="flex flex-col items-center p-6">
                    {/* Avatar */}
                    <div className="mb-4">
                        <Avatar className="h-32 w-32">
                        <AvatarImage src={ user?.avatarUrl || UserRound } />
                        <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                    </div>
                    {/* Information */}
                    <div className="text-center">
                        <h1 className="text-xl font-semibold">{user?.full_name}</h1>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <p className="text-sm text-gray-600 mt-2">{user?.bio}</p>
                    </div>
                </div>
                {/* Allergies & Diet Rest Card */} 
                <div className="flex flex-col items-center p-6">
                    {/* Allergies */}
                    <div className="mb-4">
                        <h2 className="text-l font-semibold">Allergies</h2>
                        {allergies?.length ? (
                            <ul>
                                {allergies.map((allergy: string, index: number) => (
                                    <li key={index}>{allergy}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No allergies listed.</p>
                        )}
                    </div>
                    {/* Dietary Restriction */}
                    <div className="mb-4">
                    <h2 className="text-l font-semibold">Dietary Restrictions</h2>
                        {dietRest?.length ? (
                            <ul>
                                {dietRest.map((restriction: string, index: number) => (
                                    <li key={index}>{restriction}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No dietary restrictions listed.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}