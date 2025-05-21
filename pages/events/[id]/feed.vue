<script setup lang="ts">
const { $client } = useNuxtApp()
const route = useRoute()

const {
  data: event,
  refetch,
  isLoading,
  isError,
  error,
} = useQuery<any>({
  queryKey: ['events.byId', route.params.id],
  queryFn: () => $client.events.feed.query(route.params.id as string),
  retry: false,
})
</script>

<template>
  <ErrorMessage v-if="isError" :message="error?.message" />
  <Loader v-else-if="isLoading" />
  <EventView v-else :event="event">
    <div class="mt-4 flex-1 flex flex-col gap-4 max-w-xl mx-auto">
      <PostEditor :event-id="event.id" @load="refetch" />
      <PostList v-if="event" :posts="event.posts" @load="refetch" />
    </div>
  </EventView>
</template>
