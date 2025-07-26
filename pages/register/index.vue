<template>
  <div class="bg-muted">
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-foreground">Join WeDance</h1>
        <div class="text-center text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink
            :to="`/login?redirect=${$route.query.redirect || ''}`"
            class="text-info hover:underline font-bold"
          >
            Log in
          </NuxtLink>
        </div>
      </div>

      <div class="bg-background rounded-xl border p-6">
        <RegisterForm />
      </div>
    </div>
  </div>
</template>
