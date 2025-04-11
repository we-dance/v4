<script setup>
const course = defineModel()

const emit = defineEmits(['submit'])

const onSubmit = (values) => {
  emit('submit', values)
}
</script>

<template>
  <form @submit.prevent="onSubmit">
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

    <div class="flex justify-end gap-4 mt-4">
      <Button type="submit">Save Changes</Button>
    </div>
  </form>
</template>
