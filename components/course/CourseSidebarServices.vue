<script setup lang="ts">
const { profile } = defineProps<{
  profile: any
}>()

const route = useRoute()

const getPrivateClassPrice = () => {
  return 0
}

const getPrivateClassDuration = () => {
  return 0
}
</script>

<template>
  <div
    class="bg-background rounded-xl shadow-sm overflow-hidden"
    v-if="profile.availableService"
  >
    <div class="p-4 border-b">
      <h3 class="font-semibold">Book Private Class</h3>
    </div>
    <div class="p-4">
      <div class="text-2xl font-bold mb-1">
        {{ getPrivateClassPrice() }}
      </div>
      <p class="text-sm text-muted-foreground mb-4">
        {{ getPrivateClassDuration() }} minutes private lesson
      </p>
      <Button class="w-full" variant="primary" as-child>
        <NuxtLink
          :to="`/checkout/${route.params.id}?type=private&instructor=${profile.identifier}`"
        >
          Book Private Class
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
