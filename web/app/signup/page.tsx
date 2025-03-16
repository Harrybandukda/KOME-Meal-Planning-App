"use client"

import Image from "next/image"
import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { buildURL } from "@/lib/utils"

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up form submitted");
    
    // React typecheck 
    const target = e.target as typeof e.target & {
      fullName: { value: string };
      email: { value: string };
      password: { value: string };
    };
    const full_name = target.fullName.value
    const email = target.email.value;
    const password = target.password.value;

    fetch(buildURL("/api/user/signup"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, full_name }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      router.push("/onboarding");
    })
    .catch((error) => console.error("Error during signup: ", error));

  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Form */}
          <div className="max-w-md mx-auto w-full space-y-8">
            <div>
              <h1 className="text-4xl font-bold font-everbright text-gray-800">Join us Now!!</h1>
              <p className="text-gray-500 mt-2">Register Your Account!</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="fullName">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full rounded-lg border-gray-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full rounded-lg border-gray-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="enter your password"
                    className="w-full rounded-lg border-gray-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#42B5E7] text-white hover:bg-[#3AA1D1] rounded-lg h-12">
                Sign up
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

            <div className="space-y-3">
              <button
                type="button"
                className="w-full h-12 px-4 py-2 border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-gray-700">Continue with Apple ID</span>
              </button>

              <button
                type="button"
                className="w-full h-12 px-4 py-2 border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-gray-700">Continue with Google</span>
              </button>
            </div>

            <p className="text-center text-gray-500">
              Already have an Account?{" "}
              <Link href="/login" className="text-[#42B5E7] hover:underline">
                Sign-in
              </Link>
            </p>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden lg:block">
            <div className="relative w-full aspect-square">
              <Image
                src="/assets/login-vector.png"
                alt="Sign up illustration"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

