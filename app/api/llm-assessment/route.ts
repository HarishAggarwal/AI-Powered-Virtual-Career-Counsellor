// app/api/llm-assessment/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { answers } = await req.json()

  const userSummary = answers
    .map((a: any) => `${a.question} → ${a.score}`)
    .join("\n")

    const prompt = `A student has taken an assessment. Their scores:
    ${userSummary}
    
    Generate a JSON object with:
    - "topSkills": array of 3 top skills
    - "personalityType": MBTI-like type with a label
    - "careerPaths": array of 2 careers with title, match (number), description, salaryRange, growthPotential, and requirements (array of 3)
    - "score": number between 0 - 100 representing suitability
    
    Respond with only the JSON. Strictly follow JSON format with no explanation or extra text.`
    

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "user", content: prompt }
      ],
    }),
  })

  const data = await response.json() // ✅ FIX 1: Properly parse the response body
  const content = data.choices?.[0]?.message?.content || "{}"
  const json = JSON.parse(content) // ✅ FIX 2: Then safely parse the LLM output JSON string

  return NextResponse.json({
    id: 1,
    user_id: 42,
    completed_at: new Date().toISOString(),
    score: json.score,
    results: json,
  })
}
