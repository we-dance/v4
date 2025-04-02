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
    toast.error((error as Error).message)
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
  modules: z.array(z.object({})).optional(),
  resources: z.array(z.object({})).optional(),
  offers: z.array(z.object({})).optional(),
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
        modules: newCourse.modules ?? [],
        resources: newCourse.resources ?? [],
        offers: newCourse.offers ?? [],
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
      <CourseEditor v-model="course" />
      <CourseModulesEditor v-model="course.modules" />
      <CourseResourcesEditor v-model="course.resources" />
      <CourseOffersEditor v-model="course.offers" />

      <div class="flex justify-end gap-4">
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
