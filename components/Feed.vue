<script setup>
import { ref } from "vue";
import UserPoints from "~/components/common/UserPoints.vue";

const selectedType = ref("all");

const energyRewards = [
  { action: "Create Article", energy: "+10", icon: "ph:article" },
  { action: "Share Video", energy: "+5", icon: "ph:video-camera" },
  { action: "Start Discussion", energy: "+3", icon: "ph:chats" },
  { action: "Post Event", energy: "+5", icon: "ph:calendar" },
  { action: "Write Review", energy: "+3", icon: "ph:star" },
];
</script>

<template>
  <div class="flex gap-8 mt-6">
    <!-- Left Sidebar -->
    <div class="hidden md:block w-60 flex-shrink-0">
      <PostFilters v-model:type="selectedType" />
    </div>

    <!-- Main Content -->
    <div class="flex-1 max-w-xl">
      <Create class="mb-6" />
      <!-- Mobile Filters -->
      <div class="md:hidden mb-6">
        <PostFilters v-model:type="selectedType" />
      </div>
      <PostList :type="selectedType" />
    </div>

    <!-- Right Sidebar -->
    <div class="hidden xl:block w-72 flex-shrink-0">
      <div class="bg-background rounded-xl shadow-sm border border-border p-4">
        <h3 class="text-foreground font-medium mb-4">Energy Rewards</h3>
        <ul class="space-y-3">
          <li
            v-for="reward in energyRewards"
            :key="reward.action"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-2 text-sm text-foreground">
              <Icon :name="reward.icon" class="w-4 h-4 text-accent" />
              <span>{{ reward.action }}</span>
            </div>
            <UserPoints :points="reward.energy" />
          </li>
        </ul>
        <div class="mt-6 pt-6 border-t border-border">
          <h3 class="text-foreground font-medium mb-4">Energy Tips</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-2">
              <Icon
                name="ph:lightbulb"
                class="w-5 h-5 text-accent flex-shrink-0"
              />
              <span class="text-foreground"
                >Create quality content to earn more energy</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="ph:chat-circle"
                class="w-5 h-5 text-accent flex-shrink-0"
              />
              <span class="text-foreground"
                >Engage with others through comments and likes</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon name="ph:users" class="w-5 h-5 text-accent flex-shrink-0" />
              <span class="text-foreground"
                >Help newcomers and share your knowledge</span
              >
            </li>
            <li class="flex items-start gap-2">
              <Icon
                name="ph:calendar-check"
                class="w-5 h-5 text-accent flex-shrink-0"
              />
              <span class="text-foreground">Check in at events you attend</span>
            </li>
          </ul>
          <div class="mt-4">
            <NuxtLink
              to="/energy"
              class="text-accent hover:text-accent/90 text-sm flex items-center gap-1"
            >
              Learn more about Dance Energy
              <Icon name="ph:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
