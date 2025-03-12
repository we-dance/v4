<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'

const props = defineProps<{
  instructor: {
    name: string
    image: string
    jobTitle?: string
    teachingLevel?: string
    location?: string
    experience?: {
      years: number
      achievements: string[]
    }
    socialMedia?: {
      instagram?: string
      youtube?: string
    }
    knowsAbout?: string[]
    knowsLanguage?: string[]
    aggregateRating?: {
      ratingValue: number
      reviewCount: number
    }
  }
}>()

const dialog = useDialog()

// Определяем должность инструктора, приоритет: jobTitle -> teachingLevel -> "Instructor"
const instructorTitle = computed(() => {
  return (
    props.instructor.jobTitle || props.instructor.teachingLevel || 'Instructor'
  )
})
</script>

<template>
  <DialogContent class="sm:max-w-[500px]">
    <DialogHeader>
      <DialogTitle>Информация об инструкторе</DialogTitle>
      <DialogDescription>
        Профиль и специализация инструктора курса
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-6">
      <!-- Instructor Header -->
      <div class="flex items-center gap-4">
        <Avatar class="w-16 h-16">
          <AvatarImage :src="instructor.image" />
          <AvatarFallback>{{ instructor.name.substring(0, 2) }}</AvatarFallback>
        </Avatar>
        <div>
          <h3 class="text-xl font-semibold">{{ instructor.name }}</h3>
          <p class="text-muted-foreground">{{ instructorTitle }}</p>
          <div
            v-if="instructor.location"
            class="flex items-center gap-1 text-sm text-muted-foreground mt-1"
          >
            <Icon name="ph:map-pin" class="w-4 h-4" />
            {{ instructor.location }}
          </div>
        </div>
      </div>

      <!-- Rating -->
      <div v-if="instructor.aggregateRating" class="flex items-center gap-2">
        <Rating :value="instructor.aggregateRating.ratingValue" readonly />
        <span class="text-sm text-muted-foreground">
          ({{ instructor.aggregateRating.reviewCount }} отзывов)
        </span>
      </div>

      <!-- Experience -->
      <div v-if="instructor.experience" class="space-y-2">
        <h4 class="font-medium">Опыт</h4>
        <p>{{ instructor.experience.years }} лет преподавания</p>
        <div
          v-if="
            instructor.experience.achievements &&
            instructor.experience.achievements.length > 0
          "
        >
          <p class="text-sm font-medium my-2">Достижения:</p>
          <ul class="space-y-1 ml-5 list-disc text-sm">
            <li
              v-for="achievement in instructor.experience.achievements"
              :key="achievement"
            >
              {{ achievement }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Specialties -->
      <div
        v-if="instructor.knowsAbout && instructor.knowsAbout.length > 0"
        class="space-y-2"
      >
        <h4 class="font-medium">Специализация</h4>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="specialty in instructor.knowsAbout"
            :key="specialty"
            variant="secondary"
          >
            {{ specialty }}
          </Badge>
        </div>
      </div>

      <!-- Languages -->
      <div
        v-if="instructor.knowsLanguage && instructor.knowsLanguage.length > 0"
        class="space-y-2"
      >
        <h4 class="font-medium">Языки</h4>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="language in instructor.knowsLanguage"
            :key="language"
            variant="outline"
          >
            {{ language }}
          </Badge>
        </div>
      </div>

      <!-- Social Media -->
      <div v-if="instructor.socialMedia" class="space-y-2">
        <h4 class="font-medium">Социальные сети</h4>
        <div class="flex gap-3">
          <a
            v-if="instructor.socialMedia.instagram"
            :href="`https://instagram.com/${instructor.socialMedia.instagram}`"
            target="_blank"
            class="text-muted-foreground hover:text-primary"
          >
            <Icon name="ph:instagram-logo" class="w-5 h-5" />
          </a>
          <a
            v-if="instructor.socialMedia.youtube"
            :href="`https://youtube.com/${instructor.socialMedia.youtube}`"
            target="_blank"
            class="text-muted-foreground hover:text-primary"
          >
            <Icon name="ph:youtube-logo" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>

    <DialogFooter>
      <Button @click="dialog.close">Закрыть</Button>
    </DialogFooter>
  </DialogContent>
</template>
