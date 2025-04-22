<script setup lang="ts">
import { toast } from 'vue-sonner'

const { course } = defineProps({
  course: {
    type: Object,
    required: true,
  },
})

const dialog = useDialog()
const emit = defineEmits(['load'])

const { $client } = useNuxtApp()

const updateResource = async (resourceId: string, values: any) => {
  try {
    await $client.courses.updateResource.mutate({
      courseId: course.id,
      resourceId,
      ...values,
    })
    toast.success('Resource updated successfully')
    emit('load')
  } catch (error) {
    toast.error((error as Error).message)
  }
}

const deleteResource = async (resourceId: string) => {
  try {
    await $client.courses.deleteResource.mutate({
      resourceId,
    })
    toast.success('Resource deleted successfully')
    emit('load')
  } catch (error) {
    toast.error((error as Error).message)
  }
}

function openEditResourceDialog(resource?: any) {
  dialog.open({
    component: 'CourseResourceDialog',
    props: {
      resource,
      onSuccess: (resourceId: string, values: any) =>
        updateResource(resourceId, values),
    },
  })
}
</script>

<template>
  <Button variant="secondary" @click="openEditResourceDialog()" class="mb-4">
    <Icon name="lucide:plus" class="h-4 w-4" />
    Add Resource
  </Button>
  <div v-if="course?.resources?.length" class="space-y-4">
    <div
      v-for="resource in course.resources"
      :key="resource.id"
      class="border p-4 rounded-md bg-muted/30 shadow-sm"
    >
      <div class="flex items-center justify-between gap-2">
        <div class="flex-1">
          <h4 class="font-medium">{{ resource.name }}</h4>
          <p v-if="resource.description" class="text-sm text-muted-foreground">
            {{ resource.description }}
          </p>
          <a
            v-if="resource.url"
            :href="resource.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-primary hover:underline mt-1 inline-block"
          >
            View Resource
            <Icon name="lucide:external-link" class="h-3 w-3 inline-block" />
          </a>
        </div>
        <div class="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            @click="openEditResourceDialog(resource)"
            class="h-7 w-7"
            aria-label="Edit Resource"
          >
            <Icon name="lucide:pencil" class="h-4 w-4" />
            <span class="sr-only">Edit Resource</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            @click="deleteResource(resource.id)"
            class="h-7 w-7 text-destructive hover:text-destructive"
            aria-label="Delete Resource"
          >
            <Icon name="lucide:trash" class="h-4 w-4" />
            <span class="sr-only">Delete Resource</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-4 text-muted-foreground">
    No resources added yet
  </div>
</template>
