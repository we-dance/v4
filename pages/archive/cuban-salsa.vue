<script setup>
const features = [
  {
    title: "Circular Movement",
    description:
      "Dance patterns follow circular paths, influenced by African dance traditions",
    icon: "ph:circles-three",
  },
  {
    title: "Body Movement",
    description: "Emphasis on hip movement and body isolation",
    icon: "ph:wave",
  },
  {
    title: "Partner Connection",
    description: "Close partner work with intricate hand signals for leading",
    icon: "ph:hands-clapping",
  },
  {
    title: "Basic Step",
    description: "Forward-back basic step with weight changes on 1-2-3, 5-6-7",
    icon: "ph:footprints",
  },
];

const levels = [
  {
    name: "Beginner",
    moves: ["Basic Step", "Dile Que No", "Guapea", "Exhibela"],
  },
  {
    name: "Intermediate",
    moves: ["Setenta", "Vacilala", "Sombrero", "Enchufla"],
  },
  {
    name: "Advanced",
    moves: [
      "Multiple Turn Patterns",
      "Complex Hand Combinations",
      "Advanced Body Movement",
    ],
  },
];
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="pt-32 pb-12 bg-gradient-to-b from-purple-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">Cuban Salsa</h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the vibrant and energetic style of Cuban Salsa,
            characterized by its circular movements, African influences, and
            rich cultural heritage.
          </p>
          <div class="flex justify-center gap-4">
            <Button variant="default" size="lg">Find Classes</Button>
            <Button variant="outline" size="lg">Watch Videos</Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Features -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center"
          >
            <div class="flex justify-center mb-4">
              <Icon :name="feature.icon" class="w-12 h-12 text-purple-600" />
            </div>
            <h3 class="text-lg font-bold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill Levels -->
    <div class="py-12 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold mb-12 text-center">Learning Path</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="level in levels"
            :key="level.name"
            class="bg-white p-6 rounded-xl shadow-sm"
          >
            <h3 class="text-xl font-bold mb-4">{{ level.name }}</h3>
            <ul class="space-y-2">
              <li
                v-for="move in level.moves"
                :key="move"
                class="flex items-center gap-2 text-gray-600"
              >
                <Icon name="ph:check-circle" class="w-5 h-5 text-purple-600" />
                {{ move }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our community and start your Cuban Salsa journey today.
        </p>
        <Button variant="default" size="lg">Find Local Classes</Button>
      </div>
    </div>
  </div>
</template>
