"use server"

import { executeQuery } from "@/lib/db"
import { getUserSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function scheduleSession(formData: FormData) {
  const userId = await getUserSession()
  if (!userId) {
    redirect("/login")
  }

  const sessionDate = formData.get("sessionDate") as string
  const sessionTime = formData.get("sessionTime") as string
  const duration = Number.parseInt(formData.get("duration") as string)
  const topic = formData.get("topic") as string
  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const phoneNumber = formData.get("phoneNumber") as string
  const additionalNotes = (formData.get("additionalNotes") as string) || ""

  try {
    // Update user profile if needed
    await executeQuery("UPDATE users SET full_name = $1, phone_number = $2 WHERE id = $3", [
      fullName,
      phoneNumber,
      userId,
    ])

    // Create the counseling session
    await executeQuery(
      "INSERT INTO counseling_sessions (user_id, session_date, session_time, duration, topic, additional_notes) VALUES ($1, $2, $3, $4, $5, $6)",
      [userId, sessionDate, sessionTime, duration, topic, additionalNotes],
    )

    // In a real application, you would send an email here

    redirect("/confirmation")
  } catch (error) {
    console.error("Error scheduling session:", error)
    return { error: "Failed to schedule session" }
  }
}

export async function getUserProfile() {
  const userId = await getUserSession()
  if (!userId) {
    redirect("/login")
  }

  try {
    const user = await executeQuery("SELECT id, email, full_name, phone_number FROM users WHERE id = $1", [userId])

    return user[0]
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}
