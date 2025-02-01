<script setup lang="ts">
import DanceStyleLayout from '~/components/DanceStyleLayout.vue'
import Create from '~/components/Create.vue'
import Feed from '~/components/Feed.vue'

const route = useRoute()
const city = computed(() => route.params.city as string)

// TODO: Replace with real data
const cityData = computed(() => ({
  name: 'Munich',
  country: 'Germany',
  description:
    'Munich has a vibrant dance scene with regular social dancing, workshops, and festivals.',
  stats: [
    { label: 'Monthly Events', value: '120+' },
    { label: 'Venues', value: '15' },
    { label: 'Artists', value: '45' },
    { label: 'Members', value: '2.5K+' },
  ],
  videoUrl: 'https://www.youtube.com/embed/R7E9cNydevg',
}))

const navigation = [
  { label: 'Feed', to: `/cities/${city.value}#content`, icon: 'ph:newspaper' },
  {
    label: 'Events',
    to: `/cities/${city.value}/events#content`,
    icon: 'ph:calendar',
  },
  {
    label: 'Venues',
    to: `/cities/${city.value}/venues#content`,
    icon: 'ph:map-pin',
  },
  {
    label: 'Artists',
    to: `/cities/${city.value}/artists#content`,
    icon: 'ph:star',
  },
]

const selectedPostType = ref('all')
const selectedLocation = ref(null)
</script>

<template>
  <DanceStyleLayout
    :title="cityData.name"
    :description="cityData.description"
    :stats="cityData.stats"
    :videoUrl="cityData.videoUrl"
  >
    <Feed />
  </DanceStyleLayout>
</template>
