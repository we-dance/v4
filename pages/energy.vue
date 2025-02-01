<script setup>
import UserPoints from '~/components/common/UserPoints.vue'

const energyLevels = [
  {
    name: 'Newcomer',
    energy: 0,
    benefits: ['Basic posting and interaction'],
  },
  {
    name: 'Regular',
    energy: 50,
    benefits: ['Create events, reviews'],
  },
  {
    name: 'Established',
    energy: 200,
    benefits: ['Create projects, moderate comments'],
  },
  {
    name: 'Trusted',
    energy: 500,
    benefits: ['Edit tags, verify reviews'],
  },
  {
    name: 'Expert',
    energy: 1000,
    benefits: ['Content curation, mentor new users'],
  },
  {
    name: 'Guardian',
    energy: 2000,
    benefits: ['Community moderation, feature content'],
  },
]

const earnEnergy = [
  {
    category: 'Content Creation',
    items: [
      { action: 'Create Article', energy: '+10' },
      { action: 'Share Video', energy: '+5' },
      { action: 'Start Discussion', energy: '+3' },
      { action: 'Create Project', energy: '+5' },
      { action: 'Post Event', energy: '+5' },
      { action: 'Write Review', energy: '+3' },
      { action: 'Create Poll', energy: '+2' },
      { action: 'Post Gig', energy: '+3' },
      { action: 'Share Travel Plan', energy: '+2' },
      { action: 'Post Announcement', energy: '+2' },
    ],
  },
  {
    category: 'Comments & Interactions',
    items: [
      { action: 'Comment upvoted', energy: '+1' },
      { action: 'Comment upvoted by author', energy: '+3' },
      { action: 'Write a comment', energy: '+1' },
    ],
  },
  {
    category: 'Community Help',
    items: [
      { action: 'Share Local Info', energy: '+5' },
      { action: 'Project contribution', energy: '+2' },
      { action: 'Event check-in confirmed', energy: '+1' },
      { action: 'Partner request accepted', energy: '+2' },
      { action: 'Travel request accepted', energy: '+2' },
    ],
  },
  {
    category: 'Profile Completion',
    items: [
      { action: 'Add profile photo', energy: '+2' },
      { action: 'Add dance styles', energy: '+1' },
      { action: 'Add bio', energy: '+2' },
      { action: 'Phone verified', energy: '+3' },
      { action: 'Email verified', energy: '+2' },
      { action: 'Add dance videos', energy: '+2' },
    ],
  },
  {
    category: 'Community Trust',
    items: [
      { action: 'Account age (monthly)', energy: '+1' },
      { action: 'No violations (monthly)', energy: '+2' },
      { action: 'Valid content report', energy: '+2' },
      { action: 'Successful event', energy: '+5' },
      { action: 'Venue verification', energy: '+5' },
    ],
  },
]

const badges = [
  {
    name: 'Local Guide',
    description: 'Helped 50+ people with local info',
    icon: 'ph:map-pin',
  },
  {
    name: 'Event Master',
    description: 'Successfully organized 20+ events',
    icon: 'ph:calendar-check',
  },
  {
    name: 'Mentor',
    description: 'Helped 100+ newcomers',
    icon: 'ph:student',
  },
  {
    name: 'Creator',
    description: 'Published 50+ quality articles/videos',
    icon: 'ph:pen',
  },
  {
    name: 'Guardian',
    description: '1 year of active moderation',
    icon: 'ph:shield',
  },
  {
    name: 'Pioneer',
    description: 'Early community member',
    icon: 'ph:flag',
  },
]
</script>

<template>
  <div class="min-h-screen bg-muted py-32 sm:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="flex items-center justify-center gap-2 text-warning mb-4">
          <Icon name="heroicons:fire" class="w-8 h-8" />
          <h1 class="text-3xl font-bold">Dance Energy</h1>
        </div>
        <p class="text-xl text-muted-foreground">
          Dance Energy is a reward mechanism to encourage positive community
          contributions and recognize active members. It represents the vibrancy
          and passion each member brings to the dance community.
        </p>
      </div>

      <!-- Energy Levels -->
      <div class="mb-24">
        <h2 class="text-2xl font-semibold text-center mb-12">Energy Levels</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="level in energyLevels"
            :key="level.name"
            class="bg-background rounded-xl shadow-sm border p-6 hover:border-warning/20 transition-colors"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium">{{ level.name }}</h3>
              <UserPoints :points="level.energy" />
            </div>
            <div class="text-muted-foreground">
              {{ level.benefits.join(', ') }}
            </div>
          </div>
        </div>
      </div>

      <!-- How to Earn -->
      <div class="mb-24">
        <h2 class="text-2xl font-semibold text-center mb-12">
          How to Earn Energy
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="category in earnEnergy"
            :key="category.category"
            class="bg-background rounded-xl shadow-sm border p-6"
          >
            <h3 class="text-lg font-medium mb-6">{{ category.category }}</h3>
            <ul class="space-y-4">
              <li
                v-for="item in category.items"
                :key="item.action"
                class="flex items-center justify-between"
              >
                <span class="text-muted-foreground">{{ item.action }}</span>
                <UserPoints :points="item.energy" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Badges -->
      <div class="mb-24">
        <h2 class="text-2xl font-semibold text-center mb-12">
          Achievement Badges
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="badge in badges"
            :key="badge.name"
            class="bg-background rounded-xl shadow-sm border p-6 hover:border-warning/20 transition-colors"
          >
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center"
              >
                <Icon :name="badge.icon" class="w-5 h-5 text-warning" />
              </div>
              <h3 class="text-lg font-medium">{{ badge.name }}</h3>
            </div>
            <p class="text-muted-foreground">{{ badge.description }}</p>
          </div>
        </div>
      </div>

      <!-- Energy Decay -->
      <div class="mb-24 max-w-3xl mx-auto">
        <h2 class="text-2xl font-semibold text-center mb-8">Energy Decay</h2>
        <div class="bg-background rounded-xl shadow-sm border p-6">
          <ul class="space-y-4">
            <li class="flex items-start gap-2">
              <Icon
                name="ph:warning"
                class="w-5 h-5 text-warning flex-shrink-0 mt-0.5"
              />
              <span class="text-muted-foreground"
                >Energy starts decaying after 3 months of inactivity</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="ph:chart-line-down"
                class="w-5 h-5 text-warning flex-shrink-0 mt-0.5"
              />
              <span class="text-muted-foreground"
                >10% of energy lost per month of inactivity</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="ph:medal"
                class="w-5 h-5 text-warning flex-shrink-0 mt-0.5"
              />
              <span class="text-muted-foreground"
                >Core achievements (badges, verified status) remain</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="ph:play"
                class="w-5 h-5 text-warning flex-shrink-0 mt-0.5"
              />
              <span class="text-muted-foreground"
                >Activity immediately stops decay</span
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Guidelines -->
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl font-semibold mb-8">Guidelines</h2>
        <ul class="text-muted-foreground space-y-2 text-left mb-8">
          <li>• Dance Energy cannot be transferred</li>
          <li>• Spam or low-quality content earns no energy</li>
          <li>
            • Violation of community guidelines may result in energy penalties
          </li>
          <li>• Moderators can adjust energy for special circumstances</li>
          <li>• Energy system may be adjusted for community health</li>
        </ul>
        <Button variant="outline" as-child>
          <NuxtLink to="/feed" class="flex items-center justify-center gap-2">
            Start Contributing
            <Icon name="ph:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
