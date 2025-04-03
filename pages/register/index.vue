<template>
  <div class="bg-muted">
    <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-foreground mb-3">Join WeDance</h1>
        <p class="text-muted-foreground">
          Create your free account and start connecting with the dance community
        </p>
      </div>

      <div class="bg-background rounded-xl border p-6">
        <RegisterForm />
      </div>

      <div class="text-center text-sm text-muted-foreground mt-6">
        Already have an account?
        <NuxtLink to="/login" class="text-info hover:underline">
          Sign in
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
