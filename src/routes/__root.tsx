import * as React from 'react'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { UserResource } from '@clerk/types'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export type MyRouterContext = {
  user: UserResource | undefined | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
})
