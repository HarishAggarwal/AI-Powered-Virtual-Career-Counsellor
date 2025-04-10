import { cookies } from "next/headers"
import { executeQuery } from "./db"
import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);

  try {
    const result = await executeQuery(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
      [email, hashedPassword]
    );
    return result[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}


export async function getUserByEmail(email: string) {
  try {
    const result = await executeQuery("SELECT * FROM users WHERE email = $1", [email])
    return result[0] || null
  } catch (error) {
    console.error("Error getting user by email:", error)
    throw error
  }
}

export async function setUserSession(userId: number) {
  const cookieStore = await cookies();
cookieStore.set("userId", userId.toString(), {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7, // 1 week
});

}

export async function getUserSession() {
  const cookieStore = await cookies(); // ✅ await the cookies call
  const userId = cookieStore.get("userId")?.value;
  return userId ? Number.parseInt(userId) : null;
}


export async function clearUserSession() {
  const cookieStore = cookies(); // now used correctly
  cookieStore.delete('userId');
}
