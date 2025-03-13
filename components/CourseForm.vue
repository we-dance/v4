<script setup lang="ts">
interface Props {
  mode: 'create' | 'edit'
  course?: {
    id: string
    title: string
    description: string
    price: number
    instructor: string
    category: string
    materials: Array<{
      type: 'video' | 'document'
      url: string
      title: string
    }>
  }
}

const props = defineProps<Props>()
const dialog = useDialog()

const form = ref({
  title: props.course?.title ?? '',
  description: props.course?.description ?? '',
  price: props.course?.price ?? 0,
  instructor: props.course?.instructor ?? '',
  category: props.course?.category ?? '',
  materials: props.course?.materials ?? [],
})

const isUploading = ref(false)

async function onSubmit(event: Event) {
  event.preventDefault()

  try {
    if (props.mode === 'create') {
      // TODO: Implement course creation API call
      console.log('Creating course:', form.value)
    } else {
      // TODO: Implement course update API call
      console.log('Updating course:', form.value)
    }

    dialog.close()
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

    form.value.materials.push({
      type: file.type.includes('video') ? 'video' : 'document',
      url: 'temporary-url', // This should be replaced with the actual uploaded file URL
      title: file.name,
    })
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

<template>
  <div class="space-y-6">
    <DialogHeader>
      <DialogTitle>{{
        mode === 'create' ? 'Create Course' : 'Edit Course'
      }}</DialogTitle>
      <DialogDescription>
        Fill in the course details below. Click save when you're done.
      </DialogDescription>
    </DialogHeader>

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

      <DialogFooter>
        <Button type="button" variant="ghost" @click="dialog.close()">
          Cancel
        </Button>
        <Button type="submit" :disabled="isUploading">
          {{ mode === 'create' ? 'Create Course' : 'Save Changes' }}
        </Button>
      </DialogFooter>
    </form>
  </div>
</template>
