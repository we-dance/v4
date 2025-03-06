<template>
  <div class="container py-6 space-y-6">
    <div class="flex items-center gap-4">
      <Button variant="ghost" asChild>
        <NuxtLink to="/admin/courses">
          <Icon name="chevron-left" class="w-4 h-4 mr-2" />
          Back
        </NuxtLink>
      </Button>
      <h1 class="text-3xl font-bold">Create Course</h1>
    </div>

    <Card class="max-w-2xl">
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
        <CardDescription>
          Fill in the course details below. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="space-y-4">
          <div class="space-y-2">
            <Label for="title">Title</Label>
            <Input id="title" v-model="form.title" required />
          </div>

          <div class="space-y-2">
            <Label for="description">Description</Label>
            <Textarea id="description" v-model="form.description" required />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="price">Price</Label>
              <Input
                id="price"
                v-model="form.price"
                type="number"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div class="space-y-2">
              <Label for="category">Category</Label>
              <Select v-model="form.category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dance">Dance</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="instructor">Instructor</Label>
            <Input id="instructor" v-model="form.instructor" required />
          </div>

          <div class="space-y-2">
            <Label>Course Materials</Label>
            <div class="border rounded-lg p-4 space-y-4">
              <div v-if="form.materials.length" class="space-y-2">
                <div
                  v-for="(material, index) in form.materials"
                  :key="index"
                  class="flex items-center justify-between p-2 bg-muted rounded"
                >
                  <div class="flex items-center gap-2">
                    <Icon
                      :name="material.type === 'video' ? 'video' : 'file'"
                      class="w-4 h-4"
                    />
                    <span>{{ material.title }}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    @click="removeMaterial(index)"
                  >
                    <Icon name="trash" class="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <Input
                  type="file"
                  accept="video/*,.pdf,.doc,.docx"
                  @change="handleFileUpload"
                  :disabled="isUploading"
                />
                <div v-if="isUploading" class="animate-spin">
                  <Icon name="loader" class="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-4">
            <Button type="button" variant="ghost" asChild>
              <NuxtLink to="/admin/courses">Cancel</NuxtLink>
            </Button>
            <Button type="submit" :disabled="isUploading">
              Create Course
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})

interface Material {
  type: 'video' | 'document'
  url: string
  title: string
}

interface CourseForm {
  title: string
  description: string
  price: number
  instructor: string
  category: string
  materials: Material[]
}

const form = ref<CourseForm>({
  title: '',
  description: '',
  price: 0,
  instructor: '',
  category: '',
  materials: [],
})

const isUploading = ref(false)
const router = useRouter()

async function onSubmit(event: Event) {
  event.preventDefault()

  try {
    // TODO: Implement course creation API call
    console.log('Creating course:', form.value)

    // Navigate back to courses list
    router.push('/admin/courses')
  } catch (error) {
    console.error('Error saving course:', error)
  }
}

async function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  isUploading.value = true

  try {
    // TODO: Implement file upload logic
    const file = input.files[0]
    console.log('Uploading file:', file)

    const material: Material = {
      type: file.type.includes('video') ? 'video' : 'document',
      url: 'temporary-url', // This should be replaced with the actual uploaded file URL
      title: file.name,
    }
    form.value.materials.push(material)
  } catch (error) {
    console.error('Error uploading file:', error)
  } finally {
    isUploading.value = false
  }
}

function removeMaterial(index: number) {
  form.value.materials.splice(index, 1)
}
</script>
