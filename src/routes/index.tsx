import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import { HeroSection } from '@/components/sections/hero'
import { WhatIsIgniteSection } from '@/components/sections/what-is-ignite'
import { PreviousEditionsSection } from '@/components/sections/previous-editions'
import { FooterSection } from '@/components/sections/footer'
import { SpeakersRegistration } from '@/components/sections/speakers-registration'

export const Route = createFileRoute('/')({
  component: App,
})


function App() {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen overflow-x-clip">
      <HeroSection />
      <WhatIsIgniteSection />
      <PreviousEditionsSection />
      <SpeakersRegistration />
      <FooterSection />
    </div>

  )
}
