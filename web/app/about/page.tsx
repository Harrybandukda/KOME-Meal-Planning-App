"use client"

import { useContext } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AppContext } from "../app-provider"


export default function Dashboard() {
    const { userName } = useContext(AppContext);

    const teamMembers = [
        {
        name: "Anna Shibanova",
        studentId: "101399925",
        role: "Product Owner / Backend Developer",
        description: "Since it was my idea of the application, I’m passionate about the project's vision and like controlling every aspect. The Product Owner role gives me the authority to shape the product."
        },
        {
        name: "Mo Harry Bandukda",
        studentId: "101451857",
        role: "Lead Developer / UI/UX Design",
        description: "The most creative member of the team, provides technical expertise, makes significant development decisions."
        },
        {
        name: "Nicole Milmine",
        studentId: "101462077",
        role: "Project Manager / Backend Developer",
        description: "Keeps the team organized and tracks progress."
        },
        {
        name: "Oleg ",
        studentId: "101447469",
        role: "Team Lead",
        description: "Oleg Ensures smooth project flow, and resolves any obstacles."
        },
        {
        name: "Shirin Ali",
        studentId: "101385244",
        role: "QA Engineer",
        description: "Focuses on quality assurance, testing the app, and providing feedback on the product."
        }
    ];


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

                {/* Team Info Section */}
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-6">Team Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4 border">
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-sm text-gray-500">Student ID: {member.studentId}</p>
                                <p className="mt-2 text-sm font-medium text-gray-700">Role: {member.role}</p>
                                <p className="mt-2 text-sm text-gray-600">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}