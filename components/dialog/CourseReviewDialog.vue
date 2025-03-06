<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Input } from '~/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog'

const props = defineProps<{
  courseName: string;
  onSubmit: (review: { 
    rating: number; 
    comment: string;
    reviewerName: string;
  }) => void;
}>()

const rating = ref(5)
const comment = ref('')
const reviewerName = ref('')

const handleSubmit = () => {
  props.onSubmit({
    rating: rating.value,
    comment: comment.value,
    reviewerName: reviewerName.value || 'Anonymous User',
  })
  
  // Закрываем диалог
  const dialog = useDialog()
  dialog.close()
}
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Оставить отзыв</DialogTitle>
      <DialogDescription>
        Поделитесь своими впечатлениями о курсе "{{ courseName }}"
      </DialogDescription>
    </DialogHeader>

    <div class="space-y-4">
      <!-- Имя пользователя -->
      <div class="space-y-2">
        <label for="reviewer-name" class="text-sm font-medium">Ваше имя</label>
        <Input
          id="reviewer-name"
          v-model="reviewerName"
          placeholder="Введите ваше имя"
        />
      </div>
      
      <!-- Рейтинг -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Рейтинг</label>
        <div class="flex items-center gap-1">
          <button
            v-for="i in 5"
            :key="i"
            type="button"
            class="focus:outline-none"
            @click="rating = i"
          >
            <Icon
              :name="i <= rating ? 'ph:star-fill' : 'ph:star'"
              class="w-6 h-6"
              :class="i <= rating ? 'text-warning' : 'text-muted-foreground'"
            />
          </button>
        </div>
      </div>

      <!-- Текст отзыва -->
      <div class="space-y-2">
        <label for="review" class="text-sm font-medium">Ваш отзыв</label>
        <Textarea
          id="review"
          v-model="comment"
          placeholder="Поделитесь своими впечатлениями..."
          rows="4"
        />
      </div>
    </div>

    <DialogFooter>
      <Button
        type="button"
        variant="outline"
        @click="useDialog().close()"
      >
        Отмена
      </Button>
      <Button type="button" @click="handleSubmit">Отправить</Button>
    </DialogFooter>
  </DialogContent>
</template>
