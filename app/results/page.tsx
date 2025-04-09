'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

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
      </div>
    )
  }

  if (!recommendation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">No recommendation found</h2>
          <Link href="/assessment" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Take Assessment
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Your Recommended Career Path</h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-2">{recommendation.title}</h2>
        <p className="text-gray-700 mb-4">{recommendation.description}</p>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Top Skills Needed:</h3>
          {recommendation.requirements?.length ? (
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {recommendation.requirements.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No skills listed.</p>
          )}
        </div>

        {recommendation.salaryRange && (
          <p className="text-gray-600"><strong>Salary Range:</strong> {recommendation.salaryRange}</p>
        )}
        {recommendation.growthPotential && (
          <p className="text-gray-600"><strong>Growth Potential:</strong> {recommendation.growthPotential}</p>
        )}
      </div>

      <div className="flex justify-end space-x-6 mt-4">
        <Link href="/assessment" className="text-indigo-600 hover:underline text-sm">
          Retake the assessment
        </Link>
        <Link href="/schedule" className="text-indigo-600 hover:underline text-sm">
          Schedule an In-person Counsellor
        </Link>
      </div>
    </div>
  )
}
