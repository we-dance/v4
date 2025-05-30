<script setup lang="ts">
import type { Community } from '~/schemas/communitySchema'
import { ref } from 'vue'
const { $client } = useNuxtApp()
import type { City } from '@prisma/client'

const props = defineProps({
  onlySubscriptions: {
    type: Boolean,
    default: false,
  },
  community: {
    type: Object as PropType<Community | null>,
    default: null,
  },
  city: {
    type: Object as PropType<City | null>,
    default: null,
  },
})

const type = ref('all')

const { data, refetch } = useInfiniteQuery({
  queryKey: ['posts', props, type],
  queryFn: ({ pageParam = 1 }) =>
    $client.posts.list.query({
      page: pageParam,
      onlySubscriptions: props.onlySubscriptions,
      community: props.community?.id,
      type: type.value,
      city: props.city?.id,
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
      <CommunitiesSelect :community="community" :city="city" />
    </div>

    <div class="flex-1 flex flex-col gap-4 max-w-xl">
      <PostEditor @load="refetch" />
      <PostList :posts="posts" @load="refetch" />
    </div>

    <div class="hidden xl:block w-72 flex-shrink-0">
      <DanceEnergyTips />
    </div>
  </div>
</template>
