<script setup lang="ts">
import { toast } from 'vue-sonner'
import { formatDuration } from '~/utils/format'

const course = defineModel<any>()
const dialog = useDialog()
const emit = defineEmits(['load'])

const { $client } = useNuxtApp()

const updateModule = async (moduleId: string, values: any) => {
  try {
    console.log('updateModule', moduleId, values)
    await $client.courses.updateModule.mutate({
      courseId: course.value.id,
      moduleId: moduleId,
      ...values,
    })
    toast.success('Module created successfully')
    emit('load')
  } catch (error) {
    toast.error((error as Error).message)
  }
}

const deleteModule = async (moduleId: string) => {
  try {
    await $client.courses.deleteModule.mutate({
      moduleId,
    })
    toast.success('Module deleted successfully')
    emit('load')
  } catch (error) {
    toast.error((error as Error).message)
  }
}

function openEditModuleDialog(module?: any) {
  dialog.open({
    component: 'CourseModuleDialog',
    props: {
      module,
      onSuccess: (moduleId: string, values: any) =>
        updateModule(moduleId, values),
    },
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <div>Modules</div>
        <Button variant="outline" @click="openEditModuleDialog()">
          <Icon name="lucide:plus" class="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </CardTitle>
      <CardDescription>Organize your course into modules</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="course?.modules?.length" class="space-y-6">
        <div
          v-for="(module, index) in course.modules"
          :key="module.id || index"
          class="border p-4 rounded-md space-y-3 bg-muted/30 shadow-sm"
        >
          <div class="flex items-center justify-between gap-2">
            <h3
              class="text-lg font-semibold flex-1 truncate"
              :title="module.name"
            >
              {{ module.name || 'Untitled Module' }}
            </h3>
            <div class="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                @click="openEditModuleDialog(module)"
                class="h-7 w-7"
                aria-label="Edit Module"
              >
                <Icon name="lucide:pencil" class="h-4 w-4" />
                <span class="sr-only">Edit Module</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                @click="deleteModule(module.id)"
                class="h-7 w-7 text-destructive hover:text-destructive"
                aria-label="Delete Module"
              >
                <Icon name="lucide:trash" class="h-4 w-4" />
                <span class="sr-only">Delete Module</span>
              </Button>
            </div>
          </div>

          <p
            v-if="module.description"
            class="text-sm text-muted-foreground mb-3 ml-4"
          >
            {{ module.description }}
          </p>

          <CourseLessonsEditor
            :module-id="module.id"
            :lessons="module.lessons"
            @load="emit('load')"
          />
        </div>
      </div>
      <div
        v-else
        class="text-center py-6 text-muted-foreground border-2 border-dashed border-border rounded-md"
      >
        <p class="mb-2">No modules added yet.</p>
        <p>Start by adding your first module below.</p>
      </div>
    </CardContent>
  </Card>
</template>
