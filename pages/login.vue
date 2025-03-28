<template>
  <div
    class="min-h-screen bg-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h2 class="mt-6 text-3xl font-bold text-foreground">Welcome back</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink to="/register" class="text-info hover:underline">
            Sign up
          </NuxtLink>
        </p>
      </div>

      <div class="bg-background rounded-xl shadow-sm border p-8">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
