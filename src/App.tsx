import { Routes, Route } from "react-router-dom"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Home } from "@/pages/Home"
import { Impressum } from "@/pages/Impressum"
import { Datenschutz } from "@/pages/Datenschutz"
import { NotFound } from "@/pages/NotFound"

function App() {
  return (
    <div className="min-h-screen bg-base px-6 pb-24">
      <div className="max-w-[1120px] mx-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
