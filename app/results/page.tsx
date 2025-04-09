import dynamic from "next/dynamic"

const ResultsPage = dynamic(() => import('./ResultsPage'), { ssr: false })

export default function Page() {
  return <ResultsPage />
}
