import { clearUserSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function GET() {
  await clearUserSession()
  redirect("/login")
}
