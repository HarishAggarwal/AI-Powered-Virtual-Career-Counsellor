// app/results/page.tsx
import { Suspense } from "react"
import ResultsPage from "./ResultsPage" // assuming your code is in ResultsPage.tsx

export default function Results() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-indigo-600">Loading recommendation...</div>}>
      <ResultsPage />
    </Suspense>
  )
}
