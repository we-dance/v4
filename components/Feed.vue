<script setup lang="ts">
import { ref } from 'vue'
const { $client } = useNuxtApp()
import type { City } from '@prisma/client'

const props = defineProps({
  onlySubscriptions: {
    type: Boolean,
    default: false,
  },
})

const type = ref('all')
const city = ref<City | null>(null)

const { data, refetch } = useInfiniteQuery({
  queryKey: ['posts', props, type, city],
  queryFn: ({ pageParam = 1 }) =>
    $client.posts.list.query({
      page: pageParam,
      onlySubscriptions: props.onlySubscriptions,
      type: type.value,
      city: city.value?.id,
    }),
  getNextPageParam: (lastPage, pages) => lastPage.nextPage,
  initialPageParam: 1,
})

const posts = computed(
  () => data.value?.pages.flatMap((page) => page.posts) ?? []
)
</script>

<template>
  <div class="flex gap-8 mt-6">
    <div class="hidden md:block w-60 flex-shrink-0">
      <CommunitiesSelect />
    </div>

    <div class="flex-1 flex flex-col gap-4 max-w-xl">
      <PostEditor @load="refetch" />
      <div class="flex items-center gap-2">
        <CityInput v-model="city" variant="secondary" placeholder="Anywhere" />
      </div>
      <PostList :posts="posts" @load="refetch" />
    </div>

    <div class="hidden xl:block w-72 flex-shrink-0">
      <DanceEnergyTips />
    </div>
  </div>
</template>
