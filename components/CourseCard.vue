<script setup lang="ts">
interface Props {
  name: string
  description: string
  price: number
  instructorName: string
  level?: string
  totalLessons?: number
  image?: string
}

defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden">
    <div class="aspect-video relative bg-muted">
      <img
        :src="image || '/images/placeholder-course.jpg'"
        alt="Course thumbnail"
        class="object-cover w-full h-full"
      />
      <div
        class="absolute top-2 right-2 bg-background/90 px-2 py-1 rounded-md text-sm font-medium"
      >
        {{ level || 'All Levels' }}
      </div>
    </div>
    <CardHeader>
      <CardTitle class="line-clamp-1">{{ name }}</CardTitle>
      <CardDescription class="flex items-center gap-2">
        <Icon name="lucide:user" class="h-4 w-4" />
        {{ instructorName }}
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <p class="text-sm text-muted-foreground line-clamp-2">
        {{ description }}
      </p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="lucide:book" class="h-4 w-4" />
          {{ totalLessons || 0 }} lessons
        </div>
        <p class="font-semibold">$\{{ price }}</p>
      </div>
    </CardContent>
    <CardFooter class="bg-muted/50">
      <Button class="w-full" variant="secondary" asChild>
        <NuxtLink :to="`/admin/courses/${name}`">
          View Details
        </NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template> 