import { Hero } from "@/components/ui/hero"
import { LandingContent } from "@/components/ui/landing-content"
import { LandingNav } from "@/components/ui/landingnav"

function LandingPage() {
  return (
    <div className="h-full">
      <LandingNav/>
      <Hero/>
      <LandingContent/>
    </div>
  )
}

export default LandingPage
