"use client"

import { useState } from "react"
import Image from "next/image"
import { Linkedin } from "lucide-react";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Loader2 } from "lucide-react"

const questions = [
  { id: 1, text: "I enjoy solving coding problems and building software.", category: "programming", icon: "💻" },
  { id: 2, text: "I can visualize and design user interfaces effectively.", category: "design", icon: "🎨" },
  { id: 3, text: "I like analyzing datasets and extracting patterns.", category: "data_science", icon: "📊" },
  { id: 4, text: "I enjoy assembling or working with circuits/hardware.", category: "electronics", icon: "🔌" },
  { id: 5, text: "I can lead teams and delegate tasks efficiently.", category: "leadership", icon: "🧑‍💼" },
  { id: 6, text: "I am good at explaining things in simple terms.", category: "communication", icon: "🗣️" },
  { id: 7, text: "I have an interest in finance and managing budgets.", category: "finance", icon: "💰" },
  { id: 8, text: "I am empathetic and understand others’ emotions easily.", category: "psychology", icon: "🧠" },
  { id: 9, text: "I can make quick decisions in uncertain situations.", category: "decision_making", icon: "⚖️" },
  { id: 10, text: "I love exploring new technologies and trends.", category: "tech_trends", icon: "🚀" },
]

export default function AssessmentPage() {
  const [isStarted, setIsStarted] = useState(false)
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  const handleChange = (qid: number, value: number) => {
    setResponses((prev) => ({ ...prev, [qid]: value }))
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }, 300)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const answers = questions.map((q) => ({
      question: q.text,
      domain: q.category,
      score: responses[q.id],
    }))

    try {
      setLoading(true)
      const res = await fetch("/api/llm-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      })

      const data = await res.json()
      router.push(`/results?data=${encodeURIComponent(JSON.stringify(data.results))}`)
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <form onSubmit={handleSubmit}>
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image src="/LOGO.jpeg" alt="Logo" width={48} height={48} className="rounded-full" />
            <div>
              <h1 className="text-2xl font-bold">AI Career Counselor</h1>
              <p className="text-sm text-gray-600">Assessment Test</p>
            </div>
          </div>
          <Link href="/" className="text-indigo-600 hover:underline">Exit</Link>
        </header>

        {isStarted ? (
          <>
            <div className="mb-4">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${(Object.keys(responses).length / questions.length) * 100}%` }}
                />
              </div>
              <p className="text-right text-sm text-gray-500 mt-1">
                {Object.keys(responses).length} of {questions.length} answered
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="p-8 bg-white rounded-xl shadow-lg"
              >
                <div className="text-center">
                  <div className="text-5xl mb-2">{currentQuestion.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">
                    Q{currentQuestion.id}. {currentQuestion.text}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Rate how much you agree with the above statement.
                  </p>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <label key={val} className="cursor-pointer group block text-center">
                      <input
                        type="radio"
                        name={`q-${currentQuestion.id}`}
                        value={val}
                        onChange={() => handleChange(currentQuestion.id, val)}
                        className="hidden peer"
                        required
                      />
                      <div className="border p-4 rounded-lg peer-checked:bg-indigo-600 peer-checked:text-white transition-all hover:bg-gray-100 shadow-sm">
                        <div className="text-xl font-bold">{val}</div>
                        <div className="text-sm mt-1">
                          {val === 1 ? "Strongly Disagree" :
                            val === 2 ? "Disagree" :
                            val === 3 ? "Neutral" :
                            val === 4 ? "Agree" :
                            "Strongly Agree"}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {currentIndex === questions.length - 1 && responses[currentQuestion.id] && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="fixed bottom-6 right-6"
              >
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition shadow-xl"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Rocket size={18} />
                      Get Career Match
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h2 className="text-3xl font-semibold mb-4">Start Your Career Journey</h2>
            <p className="text-gray-700 mb-6 text-lg">Let’s find the career that suits you best! 🚀</p>
            <button
              onClick={() => setIsStarted(true)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-700 transition shadow"
            >
              Begin Now
            </button>
          </div>
        )}
      </form>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500 py-6 border-t">
        <div className="mb-4">
          <p>&copy; 2025 AI Career Counselor. All rights reserved.</p>
          <p>Contact Us:</p>
          <p>Name: AI Career Team</p>
          <p>Phone: +91-9518081002</p>
          <p>Email: <a href="mailto:contact@aicareer.com" className="text-indigo-600 hover:underline">contact@aicareer.com</a></p>
        </div>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/harish-aggarwal-407b5b239/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-indigo-600 hover:underline"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </div>
      </footer>

    </div>
  )
}
