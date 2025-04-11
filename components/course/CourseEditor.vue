<script setup lang="ts">
import type { Course } from '@prisma/client'

const { course } = defineProps<{
  course: Course
}>()

const emit = defineEmits(['load'])
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
    <div class="flex-1" />
    <Button variant="ghost" as-child>
      <NuxtLink :to="`/courses/${course?.slug}`">
        <Icon name="lucide:eye" class="w-4 h-4" />
        Preview
      </NuxtLink>
    </Button>
  </header>

  <ResizablePanelGroup direction="horizontal" class="h-full items-stretch">
    <ResizablePanel :default-size="165" :min-size="20">
      <div class="space-y-4 p-4">
        <AdminBlock title="Basic Information">
          <CourseAboutEditor :course="course" @load="emit('load')" />
        </AdminBlock>
        <AdminBlock title="Modules">
          <CourseModulesEditor :course="course" @load="emit('load')" />
        </AdminBlock>
        <AdminBlock title="Resources">
          <CourseResourcesEditor :course="course" @load="emit('load')" />
        </AdminBlock>
        <AdminBlock title="Pricing">
          <CourseOffersEditor :course="course" @load="emit('load')" />
        </AdminBlock>
      </div>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="655">
      <CourseView :course="course" />
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
