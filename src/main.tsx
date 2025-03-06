import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { ClerkProvider, useUser } from '@clerk/clerk-react'
import './styles.css'

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    user: undefined,
  },
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const { isLoaded, user } = useUser()

  // If the provider is initially loading, do not render the router
  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4">
        <div className="size-10 rounded-full border-4 border-gray-200 border-t-foreground animate-spin" />
      </div>
    )
  }

  return <RouterProvider router={router} context={{ user }} />
}

function App() {
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      routerPush={(to) => router.navigate({ to })}
      routerReplace={(to) => router.navigate({ to, replace: true })}
    >
      <InnerApp />
    </ClerkProvider>
  )
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
