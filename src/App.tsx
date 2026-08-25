import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { ToolGrid } from "@/components/ToolGrid"
import { Footer } from "@/components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-base px-6 pb-24">
      <div className="max-w-[1120px] mx-auto">
        <Header />
        <Hero />
        <ToolGrid />
        <Footer />
      </div>
    </div>
  )
}

export default App
