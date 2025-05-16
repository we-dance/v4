<script setup lang="ts">
const { $client } = useNuxtApp()
const route = useRoute()

const { data: event, refetch } = useQuery<any>({
  queryKey: ['events.byId', route.params.id],
  queryFn: () => $client.events.feed.query(route.params.id as string),
  retry: false,
})
</script>

<template>
  <EventView :event="event">
    <div class="mt-4 flex-1 flex flex-col gap-4 max-w-xl mx-auto">
      <PostEditor :event-id="event.id" @load="refetch" />
      <PostList :posts="event.posts" @load="refetch" />
    </div>
  </EventView>
</template>
