<template>
  <div
    class="min-h-screen bg-muted flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-foreground">Login to WeDance</h2>
        <div class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink
            :to="`/register?redirect=${$route.query.redirect || ''}`"
            class="text-info hover:underline font-bold"
          >
            Create one now
          </NuxtLink>
        </div>
      </div>

      <div class="bg-background rounded-xl shadow-sm border p-8">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
