<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})
</script>

<template>
  <div class="container py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">Course Information</h1>
      <p class="text-muted-foreground mt-2">
        Fill in the details about your course. All required fields are marked with an asterisk.
      </p>
    </div>

    <CourseInfoForm />
  </div>
</template> 