"use client"

import { NavBar } from "@/components/nav-bar"
import { useEffect, useContext } from "react"
import ErrorBoundary from "@/components/error-boundary"
import { AppContext } from "../app-provider"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const { setUserId } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    console.log("Logout mounted");
    setUserId("");
    router.push("/");
  }, [router, setUserId]);

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white">
        <NavBar />
      </main>
    </ErrorBoundary>
  )
}

