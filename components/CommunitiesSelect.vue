<script setup lang="ts">
import type { Community } from '~/schemas/communitySchema'
import type { City } from '@prisma/client'

const props = defineProps({
  community: {
    type: Object as PropType<Community | null>,
    default: null,
  },
  city: {
    type: Object as PropType<City | null>,
    default: null,
  },
})

const { $client } = useNuxtApp()

const { data: communities } = useQuery<any>({
  queryKey: ['communities.list'],
  queryFn: () => $client.communities.list.query(),
  staleTime: 1000 * 60 * 60 * 24, // 1 day cache
})

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

const filteredCities = computed(() => {
  const allCities = props.community?.cities || []
  const results = allCities
    .filter((c) => c.id !== props.city?.id)
    .slice(0, citiesLimit.value)

  if (props.city) {
    results.unshift(props.city)
  }

  return results
})

const citiesLimit = ref(5)

const loadMoreCities = () => {
  citiesLimit.value += 5
}

const myCommunities = computed(() => {
  return communities.value?.filter((community) => community.isMember) || []
})

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num
}

const { citySearchResults, cityQuery } = useCities()

function onSelectCity(city: any) {
  const existingCity = props.community?.cities.find((c) => c.id === city.id)

  if (existingCity) {
    navigateTo(`/dance/${props.community?.hashtag}/${existingCity.slug}`)
  } else {
    const promise = $client.cities.create.mutate({
      city,
    })
    promise.then((city) => {
      navigateTo(`/dance/${props.community?.hashtag}/${city.slug}`)
    })
  }
}
</script>

<template>
  <div class="flex flex-col gap-6 w-60">
    <div class="flex flex-col gap-4">
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
      </div>
      <div v-if="community" class="flex flex-col gap-2">
        <div class="font-bold text-sm flex items-center justify-between gap-2">
          {{ community.name }} Cities
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost" size="icon">
                <Icon
                  name="ph:magnifying-glass"
                  class="w-3.5 h-3.5 text-primary"
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="p-0">
              <div class="flex flex-col gap-2">
                <SearchableDropdown
                  :items="citySearchResults"
                  v-model:searchQuery="cityQuery"
                  placeholder="Search city..."
                  itemKey="id"
                  itemLabel="name"
                  @select="onSelectCity"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <NuxtLink
          :to="`/dance/${community.hashtag}`"
          class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          :class="{ 'bg-muted': !city }"
        >
          <div
            class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Icon name="ph:globe" class="w-3.5 h-3.5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium truncate text-muted-foreground"
                >Global</span
              >
              <span class="text-xs text-muted-foreground">{{
                formatNumber(community.membersCount)
              }}</span>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink
          v-for="item in filteredCities"
          :key="item.id"
          :to="`/dance/${community.hashtag}/${item.slug}`"
          class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
          :class="{ 'bg-muted': city?.id === item.id }"
        >
          <div
            class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Icon name="ph:buildings" class="w-3.5 h-3.5 text-primary" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium truncate text-muted-foreground"
                >{{ item.name }}, {{ item.country.name }}</span
              >
              <span class="text-xs text-muted-foreground">{{
                formatNumber(item._count?.profiles)
              }}</span>
            </div>
          </div>
        </NuxtLink>
        <Button variant="secondary" @click="loadMoreCities">Load More</Button>
      </div>
      <div class="flex flex-col gap-2">
        <div class="font-bold text-sm">My Communities</div>
        <div v-if="myCommunities.length > 0" class="flex flex-col -mx-2">
          <NuxtLink
            v-for="style in myCommunities"
            :key="style.id"
            :to="
              city?.slug
                ? `/dance/${style.hashtag}/${city.slug}`
                : `/dance/${style.hashtag}`
            "
            class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
            :class="{ 'bg-muted': community?.id === style.id }"
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
      </div>
      <div class="flex flex-col gap-2">
        <div class="font-bold text-sm">Join Communities</div>
        <div class="flex flex-col -mx-2">
          <NuxtLink
            v-for="style in filteredCommunities"
            :key="style.id"
            class="flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
            :class="{ 'bg-muted': community?.id === style.id }"
            :to="
              city
                ? `/dance/${style.hashtag}/${city.slug}`
                : `/dance/${style.hashtag}`
            "
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
  </div>
</template>
