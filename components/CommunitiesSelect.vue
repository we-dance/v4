<script setup lang="ts">
const { communities } = useCommunities()

const communitiesLimit = ref(5)

function loadMoreCommunities() {
  communitiesLimit.value += 5
}

const filteredCommunities = computed(() => {
  return (
    communities.value
      ?.filter((community) => !community.isMember)
      .slice(0, communitiesLimit.value) || []
  )
})

const myCommunities = computed(() => {
  return communities.value?.filter((community) => community.isMember) || []
})

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num
}
</script>

<template>
  <div class="flex flex-col gap-6 w-60">
    <div class="flex flex-col gap-2">
      <NuxtLink
        :to="`/feed`"
        class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
        :class="{ 'bg-muted': $route.path === '/feed' }"
      >
        <div
          class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Icon name="ph:list" class="w-3.5 h-3.5 text-primary" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium truncate text-muted-foreground"
              >Latest</span
            >
          </div>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="`/subscriptions`"
        class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
        :class="{ 'bg-muted': $route.path === '/subscriptions' }"
      >
        <div
          class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Icon name="ph:users" class="w-3.5 h-3.5 text-primary" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium truncate text-muted-foreground"
              >Subscriptions</span
            >
          </div>
        </div>
      </NuxtLink>
      <div class="font-bold text-sm">My Communities</div>
      <div v-if="myCommunities.length > 0" class="flex flex-col -mx-2">
        <NuxtLink
          v-for="style in myCommunities"
          :key="style.id"
          :to="`/dance/${style.hashtag}`"
          class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          :class="{ 'bg-muted': selectedStyle === style.id }"
        >
          <div
            class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Icon name="ph:music-notes" class="w-3.5 h-3.5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span
                class="text-sm font-medium truncate text-muted-foreground"
                >{{ style.name }}</span
              >
              <span class="text-xs text-muted-foreground">{{
                formatNumber(style.membersCount)
              }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="font-bold text-sm">Join Communities</div>
      <div class="flex flex-col -mx-2">
        <NuxtLink
          v-for="style in filteredCommunities"
          :key="style.id"
          class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          :class="{ 'bg-muted': selectedStyle === style.id }"
          :to="`/dance/${style.hashtag}`"
        >
          <div
            class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Icon name="ph:music-notes" class="w-3.5 h-3.5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span
                class="text-sm font-medium truncate text-muted-foreground"
                >{{ style.name }}</span
              >
              <span class="text-xs text-muted-foreground">{{
                formatNumber(style.membersCount)
              }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <Button variant="secondary" @click="loadMoreCommunities">
        Load More
      </Button>
    </div>
  </div>
</template>
