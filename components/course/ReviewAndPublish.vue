<script setup lang="ts">
import { toast } from 'vue-sonner'
import { ChevronDown, ChevronUp, Eye } from 'lucide-vue-next'

const props = defineProps<{
  course: any // TODO: Add proper type from course schema
}>()

const emit = defineEmits<{
  publish: []
  saveDraft: []
}>()

const expandedModules = ref<Set<string>>(new Set())

const toggleModule = (moduleId: string) => {
  if (expandedModules.value.has(moduleId)) {
    expandedModules.value.delete(moduleId)
  } else {
    expandedModules.value.add(moduleId)
  }
}

const handlePublish = () => {
  emit('publish')
  toast.success('Course published successfully!')
}

const handleSaveDraft = () => {
  emit('saveDraft')
  toast.success('Course saved as draft')
}

const handlePreview = () => {
  // TODO: Implement preview functionality
  toast.info('Preview functionality coming soon')
}
</script>

<template>
  <div class="space-y-8 p-6">
    <!-- Course Information Section -->
    <Card class="p-6">
      <CardHeader>
        <CardTitle>Course Information</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h4 class="font-medium text-sm text-muted-foreground">Title</h4>
            <p class="text-lg">{{ course.title }}</p>
          </div>
          <div>
            <h4 class="font-medium text-sm text-muted-foreground">Instructor</h4>
            <p class="text-lg">{{ course.instructor }}</p>
          </div>
          <div>
            <h4 class="font-medium text-sm text-muted-foreground">Price</h4>
            <p class="text-lg">${{ course.price }}</p>
          </div>
          <div>
            <h4 class="font-medium text-sm text-muted-foreground">Duration</h4>
            <p class="text-lg">{{ course.duration }}</p>
          </div>
          <div>
            <h4 class="font-medium text-sm text-muted-foreground">Level</h4>
            <p class="text-lg">{{ course.level }}</p>
          </div>
        </div>
        <div>
          <h4 class="font-medium text-sm text-muted-foreground mb-2">Description</h4>
          <p class="text-base">{{ course.description }}</p>
        </div>
      </CardContent>
    </Card>

    <!-- Course Modules Section -->
    <Card class="p-6">
      <CardHeader>
        <CardTitle>Course Modules</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <div v-for="module in course.modules" :key="module.id" class="border rounded-lg">
          <button
            class="w-full flex items-center justify-between p-4 hover:bg-muted/50"
            @click="toggleModule(module.id)"
          >
            <span class="font-medium">{{ module.title }}</span>
            <component :is="expandedModules.has(module.id) ? ChevronUp : ChevronDown" class="h-5 w-5" />
          </button>
          <div v-if="expandedModules.has(module.id)" class="p-4 border-t space-y-4">
            <p class="text-muted-foreground">{{ module.description }}</p>
            
            <!-- Videos -->
            <div v-if="module.videos?.length" class="space-y-2">
              <h4 class="font-medium text-sm">Videos</h4>
              <div v-for="video in module.videos" :key="video.id" class="flex items-center gap-4 p-2 bg-muted/50 rounded">
                <img :src="video.thumbnail" alt="" class="h-16 w-24 object-cover rounded" />
                <div>
                  <p class="font-medium">{{ video.title }}</p>
                  <p class="text-sm text-muted-foreground">{{ video.duration }}</p>
                </div>
              </div>
            </div>

            <!-- Materials -->
            <div v-if="module.materials?.length" class="space-y-2">
              <h4 class="font-medium text-sm">Supplementary Materials</h4>
              <ul class="space-y-1">
                <li v-for="material in module.materials" :key="material.id" class="text-sm">
                  {{ material.filename }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Action Buttons -->
    <div class="flex items-center gap-4">
      <Button variant="default" @click="handlePreview" class="gap-2">
        <Eye class="h-4 w-4" />
        Preview Course
      </Button>
      <Button variant="secondary" @click="handleSaveDraft">Save as Draft</Button>
      <Button variant="primary" @click="handlePublish">Publish Course</Button>
    </div>
  </div>
</template> 