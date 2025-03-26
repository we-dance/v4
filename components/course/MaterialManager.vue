<script setup lang="ts">
import { ref } from 'vue'
import type { CourseMaterial } from '~/schemas/courseMaterial'
import { toast } from 'vue-sonner'

const props = defineProps<{
  modelValue: CourseMaterial[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', materials: CourseMaterial[]): void
}>()

const editingMaterialId = ref<string | null>(null)

const getFileIcon = (fileType: string) => {
  if (fileType.includes('pdf')) return 'i-heroicons-document-text'
  if (fileType.includes('doc')) return 'i-heroicons-document'
  if (fileType.includes('xls')) return 'i-heroicons-table-cells'
  if (fileType.includes('image')) return 'i-heroicons-photo'
  return 'i-heroicons-document'
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const handleMaterialUpload = (material: CourseMaterial) => {
  emit('update:modelValue', [...props.modelValue, material])
  toast.success('Material uploaded successfully')
}

const handleMaterialDelete = (materialId: string) => {
  emit('update:modelValue', props.modelValue.filter(m => m.id !== materialId))
  toast.success('Material deleted successfully')
}

const updateMaterial = (materialId: string, updates: Partial<CourseMaterial>) => {
  const updatedMaterials = props.modelValue.map(material => 
    material.id === materialId 
      ? { ...material, ...updates, updatedAt: new Date() }
      : material
  )
  emit('update:modelValue', updatedMaterials)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-lg font-semibold">Supplementary Materials</h2>
      <p class="text-sm text-muted-foreground mt-1">
        Provide students with additional resources like worksheets, summaries, or reference guides
      </p>
    </div>

    <!-- Upload Section -->
    <MaterialUploader
      @upload-complete="handleMaterialUpload"
      @upload-error="(error: Error) => toast.error(error.message)"
    />

    <!-- Materials List -->
    <div v-if="modelValue.length > 0" class="space-y-2">
      <Card v-for="material in modelValue" :key="material.id" class="group">
        <CardContent class="p-4">
          <div class="flex items-center gap-4">
            <!-- File Icon -->
            <Icon :name="getFileIcon(material.fileType)" class="h-8 w-8 text-muted-foreground" />

            <!-- File Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <input
                  v-if="editingMaterialId === material.id"
                  v-model="material.name"
                  class="flex-1 text-sm font-medium bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-1"
                  @blur="updateMaterial(material.id, { name: material.name }); editingMaterialId = null"
                  @keyup.enter="updateMaterial(material.id, { name: material.name }); editingMaterialId = null"
                />
                <h3
                  v-else
                  class="text-sm font-medium cursor-pointer hover:text-primary transition-colors"
                  @click="editingMaterialId = material.id"
                >
                  {{ material.name }}
                </h3>
              </div>
              <div class="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{{ formatFileSize(material.fileSize) }}</span>
                <span>•</span>
                <time :datetime="material.updatedAt.toISOString()">
                  {{ new Date(material.updatedAt).toLocaleDateString() }}
                </time>
              </div>
            </div>

            <!-- Actions -->
            <Button
              variant="ghost"
              size="icon"
              class="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              @click="handleMaterialDelete(material.id)"
            >
              <Icon name="heroicons:trash" class="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center p-8 border-2 border-dashed rounded-lg border-muted-foreground/25"
    >
      <Icon name="heroicons:document" class="h-12 w-12 mx-auto text-muted-foreground" />
      <h3 class="mt-4 text-sm font-semibold">No Materials Yet</h3>
      <p class="mt-2 text-sm text-muted-foreground">
        Add supplementary materials to enhance your course
      </p>
    </div>
  </div>
</template> 