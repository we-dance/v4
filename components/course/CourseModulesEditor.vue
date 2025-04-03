<script setup>
const modules = defineModel()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Course Content</CardTitle>
      <CardDescription>Manage your course modules and lessons.</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="modules?.length" class="space-y-4">
        <div v-for="module in modules" :key="module.id" class="space-y-2">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">{{ module.name }}</h3>
            <Button variant="ghost" size="sm">Edit Module</Button>
          </div>
          <div v-if="module.lessons?.length" class="pl-4 space-y-2">
            <div
              v-for="lesson in module.lessons"
              :key="lesson.id"
              class="flex items-center justify-between"
            >
              <span>{{ lesson.name }}</span>
              <Button variant="ghost" size="sm">Edit Lesson</Button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-muted-foreground">
        No modules added yet
      </div>
      <div class="mt-4">
        <Button variant="outline">Add Module</Button>
      </div>
    </CardContent>
  </Card>
</template>
