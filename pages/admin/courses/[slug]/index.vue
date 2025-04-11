<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'

definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
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
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem class="hidden md:block">
          <BreadcrumbLink as-child>
            <NuxtLink to="/admin/courses"> Manage Courses </NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator class="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ course?.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </header>

  <ResizablePanelGroup direction="horizontal" class="h-full items-stretch">
    <ResizablePanel :default-size="165">
      <div class="space-y-4 p-4">
        <AdminBlock title="Basic Information">
          <CourseEditor v-model="course" @submit="onSubmit" />
        </AdminBlock>
        <AdminBlock title="Modules">
          <CourseModulesEditor v-model="course" @load="loadCourse" />
        </AdminBlock>
        <AdminBlock title="Resources">
          <CourseResourcesEditor v-model="course" @load="loadCourse" />
        </AdminBlock>
        <AdminBlock title="Pricing">
          <CourseOffersEditor v-model="course" @load="loadCourse" />
        </AdminBlock>
      </div>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="655">
      <CourseView :course="course" />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
