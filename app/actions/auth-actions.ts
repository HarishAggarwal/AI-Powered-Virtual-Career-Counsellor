"use server"

import { createUser, getUserByEmail, verifyPassword, setUserSession, clearUserSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: "User already exists" }
  }

  const newUser = await createUser(email, password)
  await setUserSession(newUser.id)

  // This will throw and redirect. Do not wrap it in try/catch unless needed.
  redirect("/assessment")
}


export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const user = await getUserByEmail(email)
  if (!user) {
    return { error: "Invalid email or password" }
  }

  const isPasswordValid = await verifyPassword(password, user.password_hash)
  if (!isPasswordValid) {
    return { error: "Invalid email or password" }
  }

  await setUserSession(user.id)

  redirect("/assessment")
}


export async function signOut() {
  await clearUserSession()
  redirect("/login")
}
