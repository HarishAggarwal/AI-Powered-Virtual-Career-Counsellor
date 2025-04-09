"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const questions = [
  { id: 1, text: "I enjoy solving coding problems and building software.", category: "programming" },
  { id: 2, text: "I can visualize and design user interfaces effectively.", category: "design" },
  { id: 3, text: "I like analyzing datasets and extracting patterns.", category: "data_science" },
  { id: 4, text: "I enjoy assembling or working with circuits/hardware.", category: "electronics" },
  { id: 5, text: "I can lead teams and delegate tasks efficiently.", category: "leadership" },
  { id: 6, text: "I am good at explaining things in simple terms.", category: "communication" },
  { id: 7, text: "I have an interest in finance and managing budgets.", category: "finance" },
  { id: 8, text: "I am empathetic and understand others’ emotions easily.", category: "psychology" },
  { id: 9, text: "I can make quick decisions in uncertain situations.", category: "decision_making" },
  { id: 10, text: "I love exploring new technologies and trends.", category: "tech_trends" },
  { id: 11, text: "I can think creatively and solve problems differently.", category: "creativity" },
  { id: 12, text: "I can write well-structured and logical documents.", category: "writing" },
  { id: 13, text: "I enjoy conducting experiments and documenting results.", category: "research" },
  { id: 14, text: "I can manage multiple tasks and meet deadlines.", category: "productivity" },
  { id: 15, text: "I like building machine learning models.", category: "ai_ml" },
  { id: 16, text: "I am comfortable with mathematics and logic.", category: "math_logic" },
  { id: 17, text: "I enjoy working independently without supervision.", category: "independence" },
  { id: 18, text: "I prefer collaborating with a team over working alone.", category: "collaboration" },
  { id: 19, text: "I love writing scripts or automating tasks.", category: "scripting" },
  { id: 20, text: "I enjoy presenting ideas or giving talks.", category: "presentation" },
]

export default function AssessmentPage() {
  const [isStarted, setIsStarted] = useState(false)
  const [responses, setResponses] = useState<Record<number, number>>({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (qid: number, value: number) => {
    setResponses((prev) => ({ ...prev, [qid]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const incomplete = questions.some((q) => !responses[q.id])
    if (incomplete) {
      alert("Please answer all questions before submitting.")
      return
    }

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

  if (!isStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700">AI</div>
            <div>
              <h1 className="text-xl font-bold">AI Career Counselor</h1>
              <p className="text-sm text-gray-600">Assessment Test</p>
            </div>
          </div>
          <Link href="/" className="text-indigo-600 hover:underline">Exit</Link>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-10">
          <h2 className="text-3xl font-semibold mb-4">Start Your Assessment</h2>
          <p className="text-gray-700 mb-6">Answer questions to discover careers aligned with your skills and interests.</p>
          <button
            onClick={() => setIsStarted(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition shadow"
          >
            Begin
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6">Assessment Questions</h2>

        {/* Progress Bar */}
        <div className="mb-6">
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

        <div className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-medium mb-3">Q{q.id}. {q.text}</h3>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((val) => (
                  <label key={val} className="cursor-pointer group">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={val}
                      onChange={() => handleChange(q.id, val)}
                      className="hidden peer"
                      required
                      aria-label={`Question ${q.id} rating ${val}`}
                    />
                    <span className="block text-center py-2 rounded-md border peer-checked:bg-indigo-500 peer-checked:text-white peer-checked:border-indigo-600 transition hover:bg-gray-100">
                      {val}
                    </span>
                  </label>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>Disagree</span>
                <span>Agree</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition shadow disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit & Get Career Match"}
          </button>
        </div>
      </form>
    </div>
  )
}
