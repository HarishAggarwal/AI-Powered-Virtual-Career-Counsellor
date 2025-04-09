"use server"

import { executeQuery } from "@/lib/db"
import { getUserSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function getAssessmentQuestions() {
  try {
    const questions = await executeQuery("SELECT * FROM assessment_questions ORDER BY id")
    return questions
  } catch (error) {
    console.error("Error getting assessment questions:", error)
    throw error
  }
}

export async function saveAssessmentResponses(formData: FormData) {
  const userId = await getUserSession()
  if (!userId) {
    redirect("/login")
  }

  const responses: Record<string, string> = {}
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("question_")) {
      const questionId = key.replace("question_", "")
      responses[questionId] = value as string
    }
  }

  try {
    // Create a new assessment record
    const assessmentResult = await executeQuery(
      "INSERT INTO user_assessments (user_id, score) VALUES ($1, $2) RETURNING id",
      [userId, 85], // Default score for now
    )

    const assessmentId = assessmentResult[0].id

    // Save individual responses
    for (const [questionId, response] of Object.entries(responses)) {
      await executeQuery("INSERT INTO user_responses (user_id, question_id, response) VALUES ($1, $2, $3)", [
        userId,
        Number.parseInt(questionId),
        response,
      ])
    }

    // Generate mock results for now
    const results = {
      topSkills: ["Analytical Thinking", "Problem Solving", "Technical Aptitude", "Communication", "Leadership"],
      personalityType: "Analytical Innovator",
      careerPaths: [
        {
          title: "Data Scientist",
          match: 95,
          description:
            "Your strong analytical skills and problem-solving abilities make you an excellent fit for data science roles.",
          salaryRange: "$90,000 - $150,000",
          growthPotential: "High",
          requirements: ["Masters in Data Science/Analytics", "Programming Skills", "Statistical Analysis"],
        },
        {
          title: "Product Manager",
          match: 92,
          description:
            "Your combination of technical knowledge and leadership qualities align perfectly with product management.",
          salaryRange: "$85,000 - $140,000",
          growthPotential: "Very High",
          requirements: ["Bachelor's Degree", "Technical Background", "Leadership Experience"],
        },
        {
          title: "Business Analyst",
          match: 88,
          description: "Your analytical mindset and communication skills are well-suited for business analysis roles.",
          salaryRange: "$70,000 - $110,000",
          growthPotential: "Moderate",
          requirements: ["Bachelor's in Business/Analytics", "SQL Knowledge", "Business Acumen"],
        },
      ],
    }

    // Update the assessment with results
    await executeQuery("UPDATE user_assessments SET results = $1 WHERE id = $2", [
      JSON.stringify(results),
      assessmentId,
    ])

    redirect("/results")
  } catch (error) {
    console.error("Error saving assessment responses:", error)
    return { error: "Failed to save assessment" }
  }
}

export async function getAssessmentResults() {
  const userId = await getUserSession()
  if (!userId) {
    redirect("/login")
  }

  try {
    const results = await executeQuery(
      "SELECT * FROM user_assessments WHERE user_id = $1 ORDER BY completed_at DESC LIMIT 1",
      [userId],
    )

    if (results.length === 0) {
      redirect("/assessment")
    }

    return results[0]
  } catch (error) {
    console.error("Error getting assessment results:", error)
    throw error
  }
}

export async function saveFeedback(formData: FormData) {
  const userId = await getUserSession()
  if (!userId) {
    redirect("/login")
  }

  const rating = Number.parseInt(formData.get("rating") as string)
  const comments = formData.get("comments") as string

  try {
    await executeQuery("INSERT INTO feedback (user_id, rating, comments) VALUES ($1, $2, $3)", [
      userId,
      rating,
      comments,
    ])

    return { success: true }
  } catch (error) {
    console.error("Error saving feedback:", error)
    return { error: "Failed to save feedback" }
  }
}
