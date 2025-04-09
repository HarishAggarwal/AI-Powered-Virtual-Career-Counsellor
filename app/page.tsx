import Image from "next/image"
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
      <header className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm">
            <Image
              src="/LOGO.jpeg"
              alt="Logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">AI Career Counselor</h1>
            <p className="text-sm text-gray-500">Skills Assessment Portal</p>
          </div>
        </div>
        <Link
          href="/logout"
          className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-150"
        >
          Exit Assessment
        </Link>
      </header>

      <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Skills Assessment</h2>
        <p className="text-gray-600 mb-6 text-base leading-relaxed">
          This comprehensive assessment evaluates your skills across various dimensions to provide personalized career recommendations.
          It only takes about <span className="font-medium text-indigo-600">10–15 minutes</span> to complete.
        </p>

        <div className="space-y-6 mb-10">
          {[
            "Answer questions about your skills and preferences",
            "Receive detailed analysis of your strengths",
            "Get personalized career recommendations"
          ].map((text, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold mt-1">
                {index + 1}
              </div>
              <p className="text-gray-700 text-base">{text}</p>
            </div>
          ))}
        </div>

        <Link
          href="/assessment"
          className="bg-indigo-600 text-white text-base font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 inline-block"
        >
          Begin Assessment
        </Link>
      </div>
    </div>
  )
}
