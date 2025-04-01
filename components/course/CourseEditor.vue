<script setup>
const course = defineModel()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Basic Information</CardTitle>
      <CardDescription>Update your course details below.</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="subheader">
        <FormItem>
          <FormLabel>Subheader</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="coverUrl">
        <FormItem>
          <FormLabel>Cover Image URL</FormLabel>
          <FormControl>
            <Input v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </CardContent>
  </Card>
</template>
