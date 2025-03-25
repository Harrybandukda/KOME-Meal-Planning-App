"use client"

import { useContext, useEffect, useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { AlertCircle } from 'lucide-react'
import { AppContext } from "../app-provider"

export default function OnboardingPage() {
  const router = useRouter()
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [showError, setShowError] = useState(false)
  const { isLoading, userId } = useContext(AppContext);
  
  // Authentication check
  useEffect(() => {
    if (!userId) {
      if (!isLoading) {
        console.error("User ID not found, redirect to sign up");
        router.push("/signup");
      }
      return;
    }
  }, [userId, isLoading, router]);

  const handleFinish = () => {
    if (acceptTerms && acceptPrivacy) {
      // Redirect to dashboard
      router.push("/onboarding/step2")
    } else {
      setShowError(true)
      // Auto-hide error after 3 seconds
      setTimeout(() => setShowError(false), 3000)
    }
  }

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
                <div className="h-full w-1/3 bg-[#42B5E7]" />
              </div>
              <div className="absolute -top-3 left-0 w-full flex justify-between">
                <div className="h-6 w-6 rounded-full bg-[#42B5E7] flex items-center justify-center text-white text-sm">
                  1
                </div>
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                  2
                </div>
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                  3
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold">Terms & Conditions</h2>
              <p className="text-gray-600 mt-1">Please review and accept our terms and privacy policy.</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="h-64 overflow-y-auto pr-4 mb-6 text-gray-700">
                <h3 className="font-semibold text-lg mb-3">KOME Terms of Service</h3>
                
                <p className="mb-4">
                  Welcome to KOME! These Terms of Service ("Terms") govern your use of our website, mobile application, and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
                </p>
                
                <h4 className="font-semibold mt-4 mb-2">1. Acceptance of Terms</h4>
                <p className="mb-4">
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                </p>
                
                <h4 className="font-semibold mt-4 mb-2">2. Description of Service</h4>
                <p className="mb-4">
                  KOME provides a platform for users to discover, save, and plan meals based on their dietary preferences and restrictions. We offer personalized meal recommendations, nutritional information, and meal planning tools.
                </p>
                
                <h4 className="font-semibold mt-4 mb-2">3. User Accounts</h4>
                <p className="mb-4">
                  To access certain features of the Service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
                
                <h4 className="font-semibold mt-4 mb-2">4. User Content</h4>
                <p className="mb-4">
                  Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You retain any rights that you may have in such content.
                </p>
                
                <h4 className="font-semibold mt-4 mb-2">5. Dietary Information Disclaimer</h4>
                <p className="mb-4">
                  While we strive to provide accurate dietary and nutritional information, we cannot guarantee that all information is complete or accurate. The Service is not intended to provide medical advice, and you should consult with healthcare professionals regarding specific dietary needs.
                </p>
                
                <h4 className="font-semibold mt-4 mb-2">6. Privacy Policy</h4>
                <p className="mb-4">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our Service, you agree to our Privacy Policy.
                </p>
                
                <h4 className="font-semibold mt-4 mb-2">7. Changes to Terms</h4>
                <p className="mb-4">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                </p>
                
                <h4 className="font-semibold mt-4 mb-2">8. Contact Us</h4>
                <p className="mb-4">
                  If you have any questions about these Terms, please contact us at support@kome.my.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms} 
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    className="mt-1 data-[state=checked]:bg-[#42B5E7] data-[state=checked]:border-[#42B5E7]"
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I have read and agree to the Terms of Service
                  </Label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="privacy" 
                    checked={acceptPrivacy} 
                    onCheckedChange={(checked) => setAcceptPrivacy(checked === true)}
                    className="mt-1 data-[state=checked]:bg-[#42B5E7] data-[state=checked]:border-[#42B5E7]"
                  />
                  <Label htmlFor="privacy" className="text-sm">
                    I have read and agree to the Privacy Policy and consent to the processing of my personal data
                  </Label>
                </div>
              </div>
            </div>

            {/* Error message */}
            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>Please accept both the Terms of Service and Privacy Policy to continue</span>
              </div>
            )}
          </div>

          {/* Finish Button */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={handleFinish}
              className="w-full max-w-md bg-[#42B5E7] text-white hover:bg-[#3AA1D1] rounded-full h-12 font-medium"
            >
              FINISH
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
