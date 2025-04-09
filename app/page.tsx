import Link from "next/link"
import { redirect } from "next/navigation"
import { getUserSession } from "@/lib/auth"

export default async function HomePage() {
  const userId = await getUserSession()

  if (!userId) {
    redirect("/login")
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm">40 × 40</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Career Counselor</h1>
            <p className="text-sm text-gray-600">Skills Assessment</p>
          </div>
        </div>
        <Link href="/logout" className="text-indigo-600 hover:text-indigo-800">
          Exit Assessment
        </Link>
      </header>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Skills Assessment</h2>

        <p className="text-gray-700 mb-6">
          This comprehensive assessment will evaluate your skills across various dimensions to provide personalized
          career recommendations. The assessment takes about 10-15 minutes to complete.
        </p>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mt-1">
              1
            </div>
            <p className="text-gray-800">Answer questions about your skills and preferences</p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mt-1">
              2
            </div>
            <p className="text-gray-800">Receive detailed analysis of your strengths</p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mt-1">
              3
            </div>
            <p className="text-gray-800">Get personalized career recommendations</p>
          </div>
        </div>

        <Link
          href="/assessment"
          className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 inline-block"
        >
          Begin Assessment
        </Link>
      </div>
    </div>
  )
}
