export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server
  if (import.meta.server) return

  const { isLoggedIn } = useAppAuth()

  // If user is not logged in and trying to access a protected route
  if (!isLoggedIn && to.path.startsWith('/settings')) {
    // Redirect to login page
    return navigateTo('/login')
  }
})
