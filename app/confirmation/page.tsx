import Link from "next/link"
import { Linkedin } from "lucide-react";
import { Check, Mail, ChevronRight } from "lucide-react"

export default function ConfirmationPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-8">Counselling Scheduled!</h1>

        <div className="bg-indigo-50 rounded-lg p-6 mb-8">
          <div className="flex justify-center mb-4">
            <Mail className="w-6 h-6 text-indigo-600" />
          </div>

          <h2 className="text-lg font-semibold text-center mb-4">Check Your Email</h2>

          <p className="text-center text-gray-700 mb-4">
            We've sent you an email with all the session details including:
          </p>

          <ul className="space-y-2 text-gray-700">
            <li className="flex justify-center">• Video call link</li>
            <li className="flex justify-center">• Session timing and duration</li>
            <li className="flex justify-center">• Preparation guidelines</li>
            <li className="flex justify-center">• Contact information</li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back to Home <ChevronRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

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
    </div>
  )
}
