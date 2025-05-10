<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
const { session } = useAppAuth()
const { $client } = useNuxtApp()
import { postTypes, postSchema, type Post } from '~/schemas/postSchema'
const emit = defineEmits(['load', 'cancel'])
import { toast } from 'vue-sonner'

const { post } = defineProps({
  post: {
    type: Object as PropType<Post>,
    default: () => ({
      summary: '',
      type: 'post',
      style: null,
      city: null,
    }),
  },
})

const initialValues = {
  ...post,
  city: session?.value?.profile?.city,
}

const validationSchema = toTypedSchema(postSchema)

const form = useForm({
  initialValues,
  validationSchema,
})

const savePost = async (values: any) => {
  const promise = $client.posts.create.mutate({
    ...values,
  })

  toast.promise(promise, {
    loading: 'Publishing post...',
    success: 'Post published successfully',
    error: 'Error publishing post',
  })

  promise.then(() => {
    emit('load')
    form.resetForm()
  })
}

const submit = form.handleSubmit(savePost)
</script>

<template>
  <form
    class="flex flex-col gap-4 border shadow-sm border-border p-4 rounded-lg"
    @submit="submit"
  >
    <div class="flex items-start gap-3">
      <Avatar
        :profile="session?.profile"
        class="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary transition-all"
      />
      <div class="flex-1">
        <div
          class="font-medium text-foreground hover:text-primary transition-colors"
        >
          {{ session?.profile?.name }}
        </div>
        <div class="flex items-center gap-2 text-sm">
          <FormField name="style" v-slot="{ componentField }">
            <CommunityInput
              v-bind="componentField"
              variant="outline"
              size="skinny"
              class="w-auto text-xs"
            />
          </FormField>

          <FormField name="city" v-slot="{ componentField }">
            <CityInput
              v-bind="componentField"
              variant="outline"
              size="skinny"
              class="w-auto text-xs"
              placeholder="Global"
            />
          </FormField>
        </div>
      </div>
      <Combobox v-model="post.type">
        <ComboboxAnchor as-child>
          <ComboboxTrigger as-child>
            <Button variant="secondary" class="w-auto text-sm">
              {{ postTypes.find((t) => t.value === post.type)?.label }}
              <Icon name="ph:caret-down" class="w-4 h-4" />
            </Button>
          </ComboboxTrigger>
        </ComboboxAnchor>

        <ComboboxList>
          <ComboboxGroup>
            <ComboboxItem
              v-for="postType in postTypes"
              :key="postType.value"
              :value="postType.value"
              class="flex flex-col items-start px-4 py-2 gap-0 group"
            >
              <p>{{ postType.label }}</p>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
    </div>
    <FormField v-slot="{ componentField }" name="summary">
      <FormItem>
        <Textarea
          v-bind="componentField"
          placeholder="Say something. You can also @mention people."
          class="resize-none text-base"
        />
      </FormItem>
    </FormField>
    <div class="flex justify-start">
      <Button size="icon" variant="ghost">
        <Icon name="ph:image-square-bold" class="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Icon name="ph:link-simple-bold" class="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Icon name="ph:chart-bar-horizontal" class="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Icon name="ph:at" class="w-4 h-4" />
      </Button>
      <div class="flex-1"></div>
      <div class="flex items-center gap-2">
        <Button v-if="post.id" variant="secondary" @click="emit('cancel')"
          >Cancel</Button
        >
        <Button v-if="post.id" variant="primary" type="submit">Save</Button>
        <Button v-else variant="primary" type="submit">Publish</Button>
      </div>
    </div>
  </form>
</template>
