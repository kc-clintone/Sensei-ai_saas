import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function LandingPage() {
  return (
    <div>LandingPage
      <Link href="/sign-in">
          <Button>Login</Button>
      </Link>
      <Link href="/sign-up">
          <Button>Sign up</Button>
      </Link>
    </div>
  )
}

export default LandingPage
