import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { user } = useUser()

  return (
    <section className="grid gap-2 p-2">
      <p>Hi {user?.firstName || user?.emailAddresses[0].emailAddress || 'there'}!</p>
      <p>You are currently on the dashboard route.</p>
    </section>
  )
}
