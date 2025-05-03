'use client'

import dynamic from 'next/dynamic'

// Import HeroSection dynamically with SSR disabled
const HeroSection = dynamic(() => import('./hero/page'))

const Page = () => {


  return (
    <div>
      <HeroSection />
    </div>
  )
}

export default Page