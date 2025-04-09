<script setup lang="ts">
const { $client } = useNuxtApp()

const subscriptions = await $client.subscriptions.list.query()
</script>

<template>
  <div class="bg-card rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
      <Icon name="heroicons:credit-card" class="w-5 h-5" />
      Subscriptions
    </h2>

    <div v-for="subscription in subscriptions" :key="subscription.id">
      <h2>{{ subscription.offer.course.name }}</h2>
    </div>
  </div>
</template>
