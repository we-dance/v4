<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const router = useRouter()
const { $client } = useNuxtApp()

const course = ref<any>(null)
const loading = ref(true)

const getCourse = async () => {
  try {
    loading.value = true
    const result = await $client.courses.view.query({
      slug: route.params.slug as string,
    })
    course.value = result
  } catch (error) {
    toast.error('Failed to load course')
    router.push('/admin/courses')
  } finally {
    loading.value = false
  }
}

await getCourse()

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  subheader: z.string().optional(),
  coverUrl: z.string().optional(),
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
})

watch(
  () => course.value,
  (newCourse) => {
    if (newCourse) {
      form.setValues({
        name: newCourse.name ?? '',
        description: newCourse.description ?? '',
        subheader: newCourse.subheader ?? '',
        coverUrl: newCourse.coverUrl ?? '',
      })
    }
  },
  { immediate: true }
)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await $client.courses.update.mutate({
      slug: route.params.slug as string,
      ...values,
    })
    toast.success('Course updated successfully')
    await getCourse()
  } catch (error) {
    toast.error('Failed to update course')
  }
})
</script>

<template>
  <div class="container py-6 space-y-6">
    <div class="flex items-center gap-4">
      <h1 class="text-3xl font-bold">Course Details</h1>
    </div>

    <Card v-if="loading">
      <div class="flex justify-center items-center p-8">
        <Spinner />
      </div>
    </Card>

    <form v-else-if="course" @submit="onSubmit" class="space-y-8">
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

      <Card>
        <CardHeader>
          <CardTitle>Course Content</CardTitle>
          <CardDescription
            >Manage your course modules and lessons.</CardDescription
          >
        </CardHeader>
        <CardContent>
          <div v-if="course.modules?.length" class="space-y-4">
            <div
              v-for="module in course.modules"
              :key="module.id"
              class="space-y-2"
            >
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

      <Card>
        <CardHeader>
          <CardTitle>Course Resources</CardTitle>
          <CardDescription
            >Manage additional resources for your course.</CardDescription
          >
        </CardHeader>
        <CardContent>
          <div v-if="course.resources?.length" class="space-y-4">
            <div
              v-for="resource in course.resources"
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

      <Card>
        <CardHeader>
          <CardTitle>Course Offers</CardTitle>
          <CardDescription
            >Manage pricing and offers for your course.</CardDescription
          >
        </CardHeader>
        <CardContent>
          <div v-if="course.offers?.length" class="space-y-4">
            <div
              v-for="offer in course.offers"
              :key="offer.id"
              class="flex items-center justify-between"
            >
              <div>
                <h4 class="font-medium">{{ offer.name }}</h4>
                <p class="text-sm text-muted-foreground">
                  {{ offer.price }} {{ offer.currency }} - {{ offer.duration }}
                </p>
              </div>
              <Button variant="ghost" size="sm">Edit Offer</Button>
            </div>
          </div>
          <div v-else class="text-center py-4 text-muted-foreground">
            No offers added yet
          </div>
          <div class="mt-4">
            <Button variant="outline">Add Offer</Button>
          </div>
        </CardContent>
      </Card>

      <div class="flex justify-end gap-4">
        <Button variant="outline" @click="handleBack">Cancel</Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>

    <Card v-else>
      <div class="flex justify-center items-center p-8 text-muted-foreground">
        Course not found
      </div>
    </Card>
  </div>
</template>
