import * as React from 'react'
import {
  createFileRoute,
  redirect,
} from '@tanstack/react-router'
import { z } from 'zod'
import { SignUp } from '@clerk/clerk-react'

const fallback = '/dashboard' as const

export const Route = createFileRoute('/sign-up/$')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.user) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignUp />
    </div>
  )
}
