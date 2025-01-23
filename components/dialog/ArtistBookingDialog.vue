<script setup lang="ts">
import type { ArtistProfile } from "~/schemas/profile";

const props = defineProps<{
  artist: ArtistProfile;
  onSelect: (service: {
    type: string;
    amount: number;
    currency: string;
    duration: number;
  }) => void;
}>();

const services = computed(() => {
  const result = [];

  // Private Classes
  if (props.artist.availability?.privateClasses) {
    result.push({
      type: "private",
      name: "Private Class",
      description: "1-on-1 personalized instruction",
      amount: 50,
      currency: "EUR",
      duration: 60,
      icon: "ph:user",
    });
  }

  // Workshops
  if (props.artist.availability?.workshops) {
    result.push({
      type: "workshop",
      name: "Workshop",
      description: "Group class for specific topics",
      amount: 30,
      currency: "EUR",
      duration: 90,
      icon: "ph:users-three",
    });
  }

  return result;
});

const dialog = useDialog();

const handleSelect = (service: {
  type: string;
  amount: number;
  currency: string;
  duration: number;
}) => {
  props.onSelect(service);
  dialog.close();
};
</script>

<template>
  <DialogHeader>
    <DialogTitle>Book a Session with {{ artist.name }}</DialogTitle>
    <DialogDescription>
      Choose the type of session you'd like to book
    </DialogDescription>
  </DialogHeader>

  <div class="space-y-4 py-4">
    <div
      v-for="service in services"
      :key="service.type"
      class="bg-background rounded-lg border p-4 hover:border-accent cursor-pointer transition-colors"
      @click="handleSelect(service)"
    >
      <div class="flex items-start gap-4">
        <div
          class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
        >
          <Icon :name="service.icon" class="w-5 h-5 text-primary" />
        </div>
        <div class="flex-1">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="font-medium">{{ service.name }}</div>
              <div class="text-sm text-muted-foreground">
                {{ service.description }}
              </div>
            </div>
            <div class="text-right">
              <div class="font-bold">
                {{ service.amount }} {{ service.currency }}
              </div>
              <div class="text-sm text-muted-foreground">
                {{ service.duration }} minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
