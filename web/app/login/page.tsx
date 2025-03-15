"use client"

import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState, useEffect, useContext } from "react"
import ErrorBoundary from "@/components/error-boundary"
import { buildURL } from "@/lib/utils"
import { AppContext } from "../app-provider"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { userId, setUserId } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    console.log("LoginPage mounted")
    return () => console.log("LoginPage unmounted")
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    // React typecheck 
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    fetch(buildURL("/api/user/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Login failed")
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login successful: ", data);

      setUserId(data.id);
      router.push("/dashboard");
    })
    .catch((error) => console.error("Error during login: ", error));
  }

  const togglePassword = () => {
    console.log("Toggle password visibility")
    setShowPassword(!showPassword)
  }

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white">
        <NavBar />

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left side - Illustration */}
            <div className="hidden lg:block">
              <div className="relative w-full aspect-square">
                <Image
                  src="/assets/login-vector.png"
                  alt="Login illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                  priority
                  onError={(e) => console.error("Image failed to load", e)}
                />
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="max-w-md mx-auto w-full space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold font-everbright text-gray-800">Welcome Back</h1>
                <p className="text-gray-500 mt-2">Please login your account</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full rounded-lg border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700" htmlFor="password">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-sm text-[#42B5E7] hover:underline">
                      Forgot Password
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="enter your password"
                      className="w-full rounded-lg border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#42B5E7] text-white hover:bg-[#3AA1D1] rounded-lg h-12">
                  Sign in
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">OR</span>
                </div>
              </div>

              <p className="text-center text-gray-500">
                Didn't have an Account?{" "}
                <Link href="/signup" className="text-[#42B5E7] hover:underline">
                  Sign-up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  )
}

