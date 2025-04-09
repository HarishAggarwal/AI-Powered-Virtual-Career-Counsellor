'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { FaGraduationCap, FaHandHoldingUsd, FaArrowRight } from 'react-icons/fa'
import Image from "next/image"

interface CareerRecommendation {
  title: string
  description: string
  requirements?: string[]
  salaryRange?: string
  growthPotential?: string
}

export default function ResultsPage() {
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const encoded = searchParams.get("data")
    if (!encoded) {
      setLoading(false)
      return
    }

    try {
      const decoded = decodeURIComponent(encoded)
      const parsed = JSON.parse(decoded)
      const topMatch = parsed?.careerPaths?.[0] || null
      setRecommendation(topMatch)
    } catch (error) {
      console.error("Failed to parse recommendation:", error)
    } finally {
      setLoading(false)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="text-indigo-500 mt-2">Loading your recommendation...</p>
      </div>
    )
  }

  if (!recommendation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-red-600">No recommendation found</h2>
          <p className="text-gray-500 mb-4">It seems something went wrong. Please try again later.</p>
          <Link href="/assessment" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
            Take Assessment
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-r from-indigo-50 to-indigo-100">
      {/* Logo on Top-Right */}
      <div className="absolute top-4 right-6 transition-transform transform hover:scale-110">
        <Image src="/LOGO.jpeg" alt="Logo" width={50} height={50} className="transition-transform duration-300 ease-in-out" />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center animate__animated animate__fadeIn">Your Recommended Career Path</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <h2 className="text-2xl font-semibold mb-2 text-indigo-600">{recommendation.title}</h2>
        <p className="text-gray-700 mb-4">{recommendation.description}</p>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Top Skills Needed:</h3>
          {recommendation.requirements?.length ? (
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {recommendation.requirements.map((skill, idx) => (
                <li key={idx} className="transition duration-300 transform hover:scale-105">{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No skills listed.</p>
          )}
        </div>

        {recommendation.salaryRange && (
          <p className="text-gray-600"><strong>Salary Range:</strong> {recommendation.salaryRange} <FaHandHoldingUsd className="inline ml-2 text-indigo-500" /></p>
        )}
        {recommendation.growthPotential && (
          <p className="text-gray-600"><strong>Growth Potential:</strong> {recommendation.growthPotential} <FaGraduationCap className="inline ml-2 text-indigo-500" /></p>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <Link href="/assessment" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
          <FaArrowRight className="text-white" />
          <span>Retake the assessment</span>
        </Link>
        <Link href="/schedule" className="text-indigo-600 hover:underline text-sm transition-all duration-200 hover:text-indigo-700">
          <span className="font-medium">Schedule an In-person Counsellor</span>
        </Link>
      </div>

      {/* Interactive Explore Resources Button */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-indigo-700">Explore More Resources</h3>
        <p className="text-gray-600 mb-6">Learn more about your recommended career path and how you can enhance your skills.</p>
        <Link 
          href="/resources"
          className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
          onClick={() => console.log("User clicked Explore Resources")}
        >
          Explore Resources
        </Link>
      </div>

      {/* Modal or redirect on Explore Resources */}
      {/* You can implement a modal or navigate to another page to display resources */}
    </div>
  )
}
