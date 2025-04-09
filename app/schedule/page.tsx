"use client"

import { useState, useEffect } from "react"
import { scheduleSession, getUserProfile } from "../actions/scheduling-actions"

export default function SchedulePage() {
  const [step, setStep] = useState(1)
  const [duration, setDuration] = useState<30 | 60>(30)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [topic, setTopic] = useState("Career Change")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const profile = await getUserProfile()
        setUser(profile)
      } catch (error) {
        console.error("Error loading user profile:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  function handleNextStep() {
    if (step === 1 && (!date || !time)) {
      alert("Please select a date and time")
      return
    }

    setStep(2)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs">48 × 48</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Schedule Career Counselling Session</h1>
            <p className="text-gray-600">1-on-1 video call with our expert career counselor</p>
          </div>
        </div>

        <div className="flex items-center mb-8">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 1 ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600"
            }`}
          >
            1
          </div>
          <div className="h-1 w-16 bg-gray-200 mx-2"></div>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 2 ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600"
            }`}
          >
            2
          </div>
          <div className="ml-4 text-gray-600">{step === 1 ? "Select Time" : "Your Details"}</div>
        </div>

        <form action={scheduleSession}>
          <input type="hidden" name="sessionDate" value={date} />
          <input type="hidden" name="sessionTime" value={time} />
          <input type="hidden" name="duration" value={duration} />
          <input type="hidden" name="topic" value={topic} />

          {step === 1 ? (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Select Time</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Choose option...</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Session Duration</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setDuration(30)}
                    className={`py-2 px-6 rounded-md ${
                      duration === 30 ? "bg-indigo-100 border border-indigo-300" : "bg-gray-100 border border-gray-300"
                    }`}
                  >
                    30 mins
                  </button>
                  <button
                    type="button"
                    onClick={() => setDuration(60)}
                    className={`py-2 px-6 rounded-md ${
                      duration === 60 ? "bg-indigo-100 border border-indigo-300" : "bg-gray-100 border border-gray-300"
                    }`}
                  >
                    60 mins
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 mb-2">Topics to Discuss</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Career Change">Career Change</option>
                  <option value="Skill Development">Skill Development</option>
                  <option value="Job Search Strategy">Job Search Strategy</option>
                  <option value="Resume Review">Resume Review</option>
                  <option value="Interview Preparation">Interview Preparation</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Continue
              </button>
            </div>
          ) : (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    defaultValue={user?.full_name || ""}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email || ""}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  defaultValue={user?.phone_number || ""}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  name="additionalNotes"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
