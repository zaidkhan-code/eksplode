"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "verification" | "reset" | "success">("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("verification")
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (code.length === 6) {
        setStep("reset")
      } else {
        setError("Please enter a valid 6-digit code")
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("success")
    } catch (err) {
      setError("Failed to reset password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Explosive%20Letter%20E-EBynhAzFp4XbQxjPLabw8QKPcJtMRd.png"
            alt="Eksplode Logo"
            width={80}
            height={80}
            className="w-20 h-20"
          />
        </div>

        <Card className="bg-black border-red-500/20">
          <CardHeader className="border-b border-red-500/20">
            <CardTitle className="text-white text-center">
              {step === "email" && "Reset Password"}
              {step === "verification" && "Verify Email"}
              {step === "reset" && "Create New Password"}
              {step === "success" && "Password Reset"}
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            {/* Email Step */}
            {step === "email" && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <p className="text-gray-400 text-sm mb-6">
                  Enter your email address and we'll send you a code to reset your password.
                </p>

                <div>
                  <label className="text-sm font-medium text-white">Email Address</label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-black border-red-500/20 text-white"
                      required
                    />
                  </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2"
                >
                  {loading ? "Sending..." : "Send Reset Code"}
                </Button>

                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm mt-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </form>
            )}

            {/* Verification Step */}
            {step === "verification" && (
              <form onSubmit={handleVerificationSubmit} className="space-y-4">
                <p className="text-gray-400 text-sm mb-6">
                  We've sent a 6-digit code to <span className="text-white font-medium">{email}</span>
                </p>

                <div>
                  <label className="text-sm font-medium text-white">Verification Code</label>
                  <Input
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    className="mt-2 bg-black border-red-500/20 text-white text-center text-2xl tracking-widest"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <Button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm mt-4 w-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Use Different Email
                </button>
              </form>
            )}

            {/* Reset Password Step */}
            {step === "reset" && (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <p className="text-gray-400 text-sm mb-6">
                  Create a new password for your account. Make sure it's strong and unique.
                </p>

                <div>
                  <label className="text-sm font-medium text-white">New Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 bg-black border-red-500/20 text-white"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">At least 8 characters</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 bg-black border-red-500/20 text-white"
                    required
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep("verification")}
                  className="flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm mt-4 w-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Verification
                </button>
              </form>
            )}

            {/* Success Step */}
            {step === "success" && (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-green-600/20 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Password Reset Successful!</h3>
                  <p className="text-gray-400 text-sm">
                    Your password has been successfully reset. You can now log in with your new password.
                  </p>
                </div>

                <Link href="/login">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2">
                    Back to Login
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="text-red-400 hover:text-red-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
