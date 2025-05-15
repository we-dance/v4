<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const route = useRoute()
const { $client } = useNuxtApp()

const { data, refetch, isLoading, isError, error } = useQuery<any>({
  queryKey: ['events.byId', route.params.id],
  queryFn: () => $client.events.byId.query(route.params.id as string),
  retry: false,
})
</script>

<template>
  <ErrorMessage v-if="isError" :message="error?.message" />
  <Loader v-else-if="isLoading" />
  <EventEditor v-else :event="data" @load="refetch" />
</template>
