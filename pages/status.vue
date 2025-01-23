<script setup lang="ts">
interface Issue {
  _path: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: string;
  assignee: string;
  labels: string[];
  created_at: string;
  due_date: string;
  epic?: string;
  body?: any;
}

const stats = [
  { label: "Dancers", value: "2,455+" },
  { label: "Cities", value: "102" },
  { label: "Countries", value: "60" },
];

const { data: issuesData } = await useAsyncData("issues", () =>
  queryContent<Issue>("/issues").find()
);

const totalIssues = computed(() => issuesData.value?.length || 0);
const doneIssues = computed(
  () => issuesData.value?.filter((i) => i.status === "done").length || 0
);
const inProgressIssues = computed(
  () => issuesData.value?.filter((i) => i.status === "in-progress").length || 0
);

const overallProgress = computed(() => {
  if (!totalIssues.value) return 0;
  return Math.round(
    ((doneIssues.value + inProgressIssues.value * 0.5) / totalIssues.value) *
      100
  );
});

const completedFeatures = computed(
  () =>
    issuesData.value
      ?.filter((issue) => issue.status === "done")
      .map((issue) => ({
        name: issue.title,
        description: issue.description,
      })) || []
);

const inProgressFeatures = computed(
  () =>
    issuesData.value
      ?.filter((issue) => issue.status === "in-progress")
      .map((issue) => ({
        name: issue.title,
        description: issue.description,
        progress: 50, // In-progress items are considered 50% complete
      })) || []
);

const upcomingFeatures = computed(
  () =>
    issuesData.value
      ?.filter((issue) => issue.status === "todo")
      .sort((a, b) => (a.priority === "high" ? -1 : 1))
      .slice(0, 6)
      .map((issue) => ({
        name: issue.title,
        description: issue.description,
        progress: 0,
      })) || []
);
</script>

<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-foreground mb-4">Project Status</h1>
        <p class="text-lg text-muted-foreground mb-4">
          WeDance is a participatory network transforming how dance communities
          connect, organize, and thrive together.
        </p>

        <!-- Overall Progress -->
        <div class="mt-6 max-w-sm mx-auto">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-foreground"
              >Overall Progress</span
            >
            <span class="text-sm font-medium text-foreground"
              >{{ overallProgress }}%</span
            >
          </div>
          <div class="w-full bg-secondary rounded-full h-2.5">
            <div
              class="bg-primary h-2.5 rounded-full transition-all duration-500"
              :style="{ width: `${overallProgress}%` }"
            />
          </div>
          <div class="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{{ doneIssues }} completed</span>
            <span>{{ inProgressIssues }} in progress</span>
            <span>{{ totalIssues }} total</span>
          </div>
        </div>

        <NuxtLink
          to="/about"
          class="inline-flex items-center gap-1 text-primary hover:text-primary/90 mt-6"
        >
          Learn About Our Vision
          <Icon name="ph:arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-6 mb-12">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-muted p-6 rounded-lg shadow-sm text-center"
        >
          <div class="text-2xl font-bold text-primary">{{ stat.value }}</div>
          <div class="text-sm text-muted-foreground">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Current Status -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Current Status</h2>
        <div class="bg-muted rounded-lg shadow-sm divide-y">
          <div
            v-for="feature in completedFeatures"
            :key="feature.name"
            class="p-4 flex items-start gap-3"
          >
            <Icon name="ph:check-circle" class="w-5 h-5 text-success mt-1" />
            <div class="flex-1">
              <div class="font-medium">{{ feature.name }}</div>
              <div class="text-sm text-muted-foreground">
                {{ feature.description }}
              </div>
              <div class="mt-2 w-full bg-secondary rounded-full h-1.5">
                <div class="bg-success h-1.5 rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- In Progress -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">In Development</h2>
        <div class="bg-muted rounded-lg shadow-sm divide-y">
          <div
            v-for="feature in inProgressFeatures"
            :key="feature.name"
            class="p-4 flex items-start gap-3"
          >
            <Icon name="ph:circle-dashed" class="w-5 h-5 text-primary mt-1" />
            <div class="flex-1">
              <div class="font-medium">{{ feature.name }}</div>
              <div class="text-sm text-muted-foreground">
                {{ feature.description }}
              </div>
              <div class="mt-2 w-full bg-secondary rounded-full h-1.5">
                <div
                  class="bg-primary h-1.5 rounded-full transition-all duration-500"
                  :style="{ width: `${feature.progress}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Features -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6">Upcoming Features</h2>
        <div class="bg-muted rounded-lg shadow-sm divide-y">
          <div
            v-for="feature in upcomingFeatures"
            :key="feature.name"
            class="p-4 flex items-start gap-3"
          >
            <Icon
              name="ph:arrow-right"
              class="w-5 h-5 text-muted-foreground mt-1"
            />
            <div class="flex-1">
              <div class="font-medium">{{ feature.name }}</div>
              <div class="text-sm text-muted-foreground">
                {{ feature.description }}
              </div>
              <div class="mt-2 w-full bg-secondary rounded-full h-1.5">
                <div
                  class="bg-primary h-1.5 rounded-full transition-all duration-500"
                  :style="{ width: `${feature.progress}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Get Involved -->
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4">Get Involved</h2>
        <p class="text-muted-foreground mb-6">
          Join our community and help shape the future of dance communities
        </p>
        <a
          href="https://t.me/WeDancePlatform"
          target="_blank"
          class="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Icon name="ph:telegram-logo" class="w-5 h-5" />
          Join Our Telegram Channel
        </a>
      </div>
    </div>
  </div>
</template>
