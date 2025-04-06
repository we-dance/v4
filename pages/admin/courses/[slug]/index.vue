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

const loadCourse = async () => {
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

await loadCourse()

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  subheader: z.string().optional(),
  coverUrl: z.string().optional(),
  modules: z.array(z.object({})).optional(),
  resources: z.array(z.object({})).optional(),
  offers: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1),
      price: z.number().min(0),
      currency: z.string().min(1),
      duration: z.string().min(1),
    })
  ),
  deletedOfferIds: z.array(z.string()).optional(),
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
const save = async (values: any) => {
  try {
    await $client.courses.update.mutate({
      slug: route.params.slug as string,
      ...values,
    })
    toast.success('Course updated successfully')
    await loadCourse()
  } catch (error) {
    toast.error((error as Error).message)
  }
}

const onSubmit = form.handleSubmit(save)
</script>

<template>
  <div class="container py-6 space-y-6">
    <div class="flex items-center gap-4">
      <h1 class="text-3xl font-bold">Course Details</h1>
    </div>

    <Card v-if="loading">
      <div class="text-center py-12">
        <p>Loading course...</p>
      </div>
    </Card>

    <div v-else-if="course" class="space-y-8">
      <CourseEditor v-model="course" @submit="onSubmit" />
      <CourseModulesEditor v-model="course" @load="loadCourse" />
      <CourseResourcesEditor v-model="course" @load="loadCourse" />
      <CourseOffersEditor v-model="course" @save="save" />
    </div>

    <Card v-else>
      <div class="flex justify-center items-center p-8 text-muted-foreground">
        Course not found
      </div>
    </Card>
  </div>
</template>
