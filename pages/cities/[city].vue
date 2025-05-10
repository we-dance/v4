<script setup lang="ts">
const route = useRoute()
const city = computed(() => route.params.city as string)
const { $client } = useNuxtApp()

const cityData = await $client.cities.bySlug.query(city.value)
</script>

<template>
  <CityLayout :city="cityData">
    <Feed :city="cityData" />
  </CityLayout>
</template>
