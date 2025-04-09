'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { FaBook, FaUniversity, FaChalkboardTeacher, FaTools } from 'react-icons/fa'
import { HiOutlineLightBulb } from 'react-icons/hi'

export default function ExploreResourcesPage() {
  const [resources, setResources] = useState<any[]>([])

  useEffect(() => {
    // Sample resource categories and items for the sake of the example
    setResources([
      {
        id: 1,
        title: "Books & Articles",
        description: "Read insightful books and articles to enhance your knowledge in your field.",
        icon: <FaBook className="text-4xl text-indigo-500" />,
        link: "/resources/books"
      },
      {
        id: 2,
        title: "University Courses",
        description: "Take online courses from top universities to build deeper expertise.",
        icon: <FaUniversity className="text-4xl text-green-500" />,
        link: "/resources/courses"
      },
      {
        id: 3,
        title: "Workshops & Seminars",
        description: "Attend live workshops and seminars to gain practical experience.",
        icon: <FaChalkboardTeacher className="text-4xl text-blue-500" />,
        link: "/resources/workshops"
      },
      {
        id: 4,
        title: "Tools & Software",
        description: "Explore the tools and software to sharpen your skills and implement your ideas.",
        icon: <FaTools className="text-4xl text-orange-500" />,
        link: "/resources/tools"
      },
      {
        id: 5,
        title: "Creative Inspiration",
        description: "Get inspired by creative projects, success stories, and other content to spark your ideas.",
        icon: <HiOutlineLightBulb className="text-4xl text-yellow-500" />,
        link: "/resources/inspiration"
      }
    ])
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-indigo-700">Explore Resources</h1>
        <p className="text-lg text-gray-600 mt-4">Enhance your skills and stay updated with the best resources available to you.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition duration-300">
            <div className="mb-4">
              {resource.icon}
            </div>
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">{resource.title}</h2>
            <p className="text-gray-600 mb-4">{resource.description}</p>
            <Link href={resource.link} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200">
              Explore {resource.title}
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Need Help with Resources?</h2>
        <p className="text-gray-600 mb-4">If you are unsure about which resource to start with, don't hesitate to schedule a session with one of our career counselors!</p>
        <Link href="/schedule" className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200">
          Schedule a Counseling Session
        </Link>
      </div>
    </div>
  )
}
