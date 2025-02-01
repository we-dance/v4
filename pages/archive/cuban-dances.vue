<script setup>
const traditions = [
  {
    name: 'Afro-Cuban Traditions',
    description:
      'Sacred and secular dances preserving African cultural heritage in Cuba',
    dances: [
      {
        name: 'Yuka',
        description: 'Traditional Congo-derived social dance and drumming',
        origin: 'Congo/Bantú',
        context: 'Social gatherings, celebrations',
      },
      {
        name: 'Yoruba Dances',
        description: 'Sacred dances connected to Orishas',
        origin: 'Yoruba',
        context: 'Religious ceremonies, cultural preservation',
      },
    ],
  },
  {
    name: 'Rumba Complex',
    description: 'Secular Cuban dance and music tradition with African roots',
    styles: [
      {
        name: 'Guaguancó',
        description: 'Couple dance with characteristic vacunao movement',
        context: 'Social gatherings, performances',
      },
      {
        name: 'Columbia',
        description: 'Solo male dance showcasing acrobatic skills',
        context: 'Competitive displays, celebrations',
      },
      {
        name: 'Yambú',
        description: 'Slower, more gentle form of rumba',
        context: 'Social dancing, older dancers',
      },
    ],
  },
  {
    name: 'Popular Cuban Dances',
    description: 'Modern social dances evolved from traditional forms',
    styles: [
      {
        name: 'Casino/Salsa Cubana',
        description: 'Modern Cuban social dance evolved from Son',
        context: 'Social dancing, global salsa community',
      },
      {
        name: 'Son',
        description: 'Foundation of modern Cuban popular dance',
        context: 'Traditional social dancing, historical significance',
      },
    ],
  },
]

const culturalContext = {
  history:
    'The dance traditions of Cuba reflect its rich multicultural heritage...',
  influences: ['African (Yoruba, Congo)', 'Spanish', 'Caribbean'],
  significance: 'These dances preserve cultural memory and create community...',
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="pt-32 pb-12 bg-gradient-to-b from-primary-50 to-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Cuban Dance Traditions
          </h1>
          <p class="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover the rich tapestry of Cuban dance, from ancient Afro-Cuban
            traditions to modern social dances, each telling a unique story of
            cultural fusion and preservation.
          </p>
        </div>
      </div>
    </div>

    <!-- Dance Traditions -->
    <div class="py-12 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-8">
          <div
            v-for="tradition in traditions"
            :key="tradition.name"
            class="bg-background rounded-xl shadow-sm p-6"
          >
            <h2 class="text-2xl font-bold mb-4">{{ tradition.name }}</h2>
            <p class="text-muted-foreground mb-6">
              {{ tradition.description }}
            </p>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="dance in tradition.dances || tradition.styles"
                :key="dance.name"
                class="bg-muted rounded-lg p-4"
              >
                <h3 class="font-bold mb-2">{{ dance.name }}</h3>
                <p class="text-sm text-muted-foreground">
                  {{ dance.description }}
                </p>
                <div
                  v-if="dance.origin"
                  class="mt-2 text-sm text-muted-foreground"
                >
                  Origin: {{ dance.origin }}
                </div>
                <div class="mt-2 text-sm text-muted-foreground">
                  Context: {{ dance.context }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cultural Context -->
    <div class="py-12 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold mb-8 text-center">Cultural Heritage</h2>
        <div class="prose max-w-none">
          <p>{{ culturalContext.history }}</p>
          <h3>Cultural Influences</h3>
          <ul>
            <li
              v-for="influence in culturalContext.influences"
              :key="influence"
            >
              {{ influence }}
            </li>
          </ul>
          <p>{{ culturalContext.significance }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
