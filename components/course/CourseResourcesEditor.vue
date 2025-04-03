<script setup>
const resources = defineModel()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Course Resources</CardTitle>
      <CardDescription
        >Manage additional resources for your course.</CardDescription
      >
    </CardHeader>
    <CardContent>
      <div v-if="resources?.length" class="space-y-4">
        <div
          v-for="resource in resources"
          :key="resource.id"
          class="flex items-center justify-between"
        >
          <div>
            <h4 class="font-medium">{{ resource.name }}</h4>
            <p class="text-sm text-muted-foreground">
              {{ resource.description }}
            </p>
          </div>
          <Button variant="ghost" size="sm">Edit Resource</Button>
        </div>
      </div>
      <div v-else class="text-center py-4 text-muted-foreground">
        No resources added yet
      </div>
      <div class="mt-4">
        <Button variant="outline">Add Resource</Button>
      </div>
    </CardContent>
  </Card>
</template>
