<script setup lang="ts">
import type { CourseContent } from '~/schemas/post'
import { Card, CardHeader, CardContent, CardFooter } from '#components'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'

defineProps<{
  content: CourseContent
}>()
</script>

<template>
    <CardHeader class="space-y-4">
      <div class="aspect-video bg-muted rounded-lg overflow-hidden">
        <img
          :src="content.cover"
          :alt="content.title"
          class="w-full h-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div class="space-y-2">
        <h3 class="font-semibold text-xl group-hover:text-primary">
          {{ content.title }}
        </h3>
        <p class="text-sm text-muted-foreground line-clamp-2">
          {{ content.description }}
        </p>
      </div>
    </CardHeader>

    <CardContent class="space-y-4">
      <!-- Course Details -->
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <Icon name="ph:clock" class="w-4 h-4 text-muted-foreground" />
            <span class="text-muted-foreground">{{ content.course.duration }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="ph:graduation-cap" class="w-4 h-4 text-muted-foreground" />
            <span class="text-muted-foreground">{{ content.course.level }}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-muted-foreground">{{ content.course.provider }}</span>
        </div>
      </div>
    </CardContent>

    <CardFooter>
      <NuxtLink :to="`/courses/${content.course.id}`" class="w-full">
        <Button class="w-full" variant="primary">
          <Icon name="ph:arrow-right" class="w-4 h-4 mr-2" />
          Go to the course
        </Button>
      </NuxtLink>
    </CardFooter>
</template>