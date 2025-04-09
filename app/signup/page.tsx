"use client"

import { useState } from "react"
import { signUp } from "../actions/auth-actions"
import Link from "next/link"
import Image from "next/image"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await signUp(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-white">
      <div className="flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden max-w-5xl w-full">
        {/* Left Image Panel */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-indigo-200">
          <Image
            src="/ai-career-illustARtion.jpeg" // <-- replace with your own image
            alt="AI Career Counselor"
            layout="fill"
            objectFit="cover"
            className="opacity-90"
            priority
          />
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-10 bg-white">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/LOGO.jpeg" alt="Logo" width={50} height={50} />
          </div>

          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">AI Career Counselor</h1>
          <p className="text-sm text-gray-500 text-center mb-6">Start your journey with expert AI guidance</p>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

          <form action={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">or</div>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 transition">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
