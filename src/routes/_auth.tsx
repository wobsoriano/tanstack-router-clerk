import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from '@tanstack/react-router'
import { useClerk } from '@clerk/clerk-react'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    // Check if user is authenticated
    if (!context.user) {
      console.log('User not authenticated, redirecting to login...')
      throw redirect({
        to: '/sign-in/$',
        search: {
          redirect: location.href,
        },
      })
    }
    console.log('User authenticated, proceeding...')
  },
  component: AuthLayout,
})

function AuthLayout() {
  const router = useRouter()
  const navigate = Route.useNavigate()
  const clerk = useClerk()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      clerk.signOut().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: '/sign-in/$' })
        })
      })
    }
  }

  return (
    <div className="p-2 h-full">
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul className="py-2 flex gap-2">
        <li>
          <Link
            to="/dashboard"
            className="hover:underline data-[status='active']:font-semibold"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/invoices"
            className="hover:underline data-[status='active']:font-semibold"
          >
            Invoices
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
