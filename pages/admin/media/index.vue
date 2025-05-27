<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['sidebase-auth'],
})

const { $client } = useNuxtApp()

const searchQuery = ref('')
const { data, isLoading, isError, error } = useQuery<Array<any>>({
  queryKey: ['media.videos', searchQuery],
  queryFn: () => $client.media.videos.query({ query: searchQuery.value }),
  refetchInterval: 1000,
  retry: false,
})

const videos = computed(() => data.value ?? [])
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
    <SidebarTrigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 h-4" />
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Manage Media</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </header>

  <ErrorMessage v-if="isError" :message="error?.message" />
  <Loader v-else-if="isLoading" />
  <div v-else class="container py-6 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <VideoUploader />
      <MuxVideoEditor v-for="video in videos" :key="video.id" :video="video" />
    </div>
  </div>
</template>
